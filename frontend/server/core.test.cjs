'use strict';
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const records = new Map();
let revision = 0, unavailable = false;
class BlobError extends Error {}
class BlobPreconditionFailedError extends BlobError {}
const fakeBlob = {
  BlobError, BlobPreconditionFailedError,
  get: async (path, options) => {
    assert.equal(options.access, 'private');
    assert.equal(options.useCache, false);
    if (unavailable) throw new Error('Unavailable');
    const item = records.get(path);
    return item ? { statusCode: 200, stream: new Response(item.body).body, blob: { etag: item.etag } } : null;
  },
  put: async (path, text, options) => {
    assert.equal(options.access, 'private');
    assert.equal(options.addRandomSuffix, false);
    if (unavailable) throw new Error('Unavailable');
    const current = records.get(path);
    if (options.ifMatch && current?.etag !== options.ifMatch) throw new BlobPreconditionFailedError();
    if (current && !options.allowOverwrite) throw new BlobError('Blob already exists');
    const row = { body: text, etag: String(++revision) };
    records.set(path, row);
    return row;
  },
  del: async (path) => { if (unavailable) throw new Error('Unavailable'); records.delete(path); },
  list: async ({ prefix, cursor }) => {
    const entries = [...records.keys()].filter(p => p.startsWith(prefix)).sort();
    const i = Number(cursor || 0), blobs = entries.slice(i, i + 2).map(pathname => ({ pathname }));
    return { blobs, hasMore: i + 2 < entries.length, cursor: String(i + 2) };
  },
};
// Replace the remote adapter only. Production validation, sessions, counters,
// persistence verification and pagination all execute unchanged.
require.cache[require.resolve('@vercel/blob')] = { id: require.resolve('@vercel/blob'), filename: require.resolve('@vercel/blob'), loaded: true, exports: fakeBlob };
const api = require('./core');
const storage = require('./storage.cjs');
const password = crypto.randomBytes(24).toString('base64url');
const salt = crypto.randomBytes(16);
const hash = 'scrypt$' + salt.toString('hex') + '$' + crypto.scryptSync(password, salt, 64).toString('hex');
const valid = { name: 'TESTE INSALES', email: 'teste@example.invalid', phone: '(41) 90000-0000', company: 'TESTE SINTÉTICO', revenue: 'Até R$ 50 mil/mês', service: 'SEO + GEO', message: 'Teste descartável', source: '/fale-conosco?utm_source=qa' };
let ip = 0;
function req(method = 'GET', input, extra = {}) {
  return { method, headers: { host: 'test.invalid', origin: 'https://test.invalid', 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.' + ++ip, ...extra }, query: {}, body: input };
}
async function call(handler, request) {
  const response = { code: 0, headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(n) { this.code = n; return this; }, json(data) { this.data = data; return this; } };
  await handler(request, response);
  return response;
}
async function login() {
  const response = await call(api.login, req('POST', { email: 'admin@example.invalid', password }));
  assert.equal(response.code, 200);
  return response.headers['Set-Cookie'].split(';')[0];
}
beforeEach(() => {
  records.clear(); unavailable = false;
  process.env.BLOB_STORE_ID = 'store_test';
  process.env.VERCEL_OIDC_TOKEN = 'synthetic';
  process.env.ADMIN_EMAIL = 'admin@example.invalid';
  process.env.ADMIN_PASSWORD_HASH = hash;
  process.env.SESSION_SECRET = crypto.randomBytes(32).toString('hex');
  delete process.env.VERCEL_ENV;
});
test('contact is persisted privately before success and all fields survive', async () => {
  const result = await call(api.postLead, req('POST', valid));
  assert.equal(result.code, 201);
  assert.equal(JSON.parse(records.get('insales/v1/leads/' + result.data.id + '.json').body).source, valid.source);
  const cookie = await login();
  const rows = await call(api.listLeads, req('GET', null, { cookie }));
  assert.equal(rows.code, 200); assert.equal(rows.data.length, 1);
  for (const [key, value] of Object.entries(valid)) assert.equal(rows.data[0][key], value);
  assert.match(rows.headers['Cache-Control'], /no-store/);
});
test('storage outage or missing storage never acknowledges a lead', async () => {
  delete process.env.BLOB_STORE_ID;
  assert.equal((await call(api.postLead, req('POST', valid))).code, 503);
  process.env.BLOB_STORE_ID = 'store_test'; unavailable = true;
  assert.equal((await call(api.postLead, req('POST', valid))).code, 503);
  assert.equal(records.size, 0);
});
test('public list and deletion are blocked without leaking records', async () => {
  assert.equal((await call(api.listLeads, req())).code, 401);
  const request = req('DELETE'); request.query.id = crypto.randomUUID();
  assert.equal((await call(api.deleteLead, request)).code, 401);
});
test('payload, methods, honeypot, phone and origin validation reject bad requests', async () => {
  assert.equal((await call(api.postLead, req('PUT', valid))).code, 405);
  assert.equal((await call(api.postLead, req('POST', valid, { origin: 'https://evil.invalid' }))).code, 403);
  assert.equal((await call(api.postLead, req('POST', valid, { origin: undefined }))).code, 403);
  assert.equal((await call(api.postLead, req('POST', valid, { 'sec-fetch-site': 'cross-site' }))).code, 403);
  assert.equal((await call(api.postLead, req('POST', valid, { 'content-type': 'text/plain' }))).code, 415);
  assert.equal((await call(api.postLead, req('POST', '{'))).code, 400);
  for (const input of [{ ...valid, email: 'invalid' }, { ...valid, phone: '123' }, { ...valid, website: 'spam' }, { ...valid, company: [] }, { ...valid, message: 'x'.repeat(2001) }]) assert.equal((await call(api.postLead, req('POST', input))).code, 422);
  assert.equal((await call(api.postLead, req('POST', { ...valid, message: 'x'.repeat(17000) }))).code, 413);
});
test('login is persistently throttled after five attempts', async () => {
  for (let i = 0; i < 5; i++) {
    const request = req('POST', { email: 'wrong@example.invalid', password: 'wrong' }, { 'x-vercel-forwarded-for': '198.51.100.1' });
    assert.equal((await call(api.login, request)).code, 401);
  }
  const result = await call(api.login, req('POST', { email: 'admin@example.invalid', password }, { 'x-vercel-forwarded-for': '198.51.100.1' }));
  assert.equal(result.code, 429); assert.ok(Number(result.headers['Retry-After']) > 0);
});
test('concurrent counters fail closed and reset after the window', async () => {
  const [a,b] = await Promise.all([storage.consume('same', 1, 10000, 0), storage.consume('same', 1, 10000, 0)]);
  assert.equal([a,b].filter(x => x.allowed).length, 1);
  assert.equal((await storage.consume('same', 1, 10000, 10001)).allowed, true);
});
test('cookie security, session persistence, deletion and logout revocation', async () => {
  const response = await call(api.login, req('POST', { email: 'admin@example.invalid', password }));
  assert.match(response.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Strict/);
  const cookie = response.headers['Set-Cookie'].split(';')[0];
  assert.equal((await call(api.me, req('GET', null, { cookie }))).code, 200);
  const created = await call(api.postLead, req('POST', valid));
  const request = req('DELETE', null, { cookie }); request.query.id = created.data.id;
  assert.equal((await call(api.deleteLead, request)).code, 200);
  assert.equal((await call(api.deleteLead, request)).code, 404);
  assert.equal((await call(api.logout, req('POST', null, { cookie }))).code, 200);
  assert.equal((await call(api.me, req('GET', null, { cookie }))).code, 401);
});
test('tampered, expired and password-rotated sessions are rejected', async () => {
  const cookie = await login();
  assert.equal((await call(api.me, req('GET', null, { cookie: cookie + 'x' }))).code, 401);
  process.env.ADMIN_PASSWORD_HASH = hash.replace(/.$/, hash.endsWith('0') ? '1' : '0');
  assert.equal((await call(api.me, req('GET', null, { cookie }))).code, 401);
  process.env.ADMIN_PASSWORD_HASH = hash;
  for (const [path, row] of records) if (path.includes('/sessions/')) records.set(path, { ...row, body: JSON.stringify({ ...JSON.parse(row.body), exp: 0 }) });
  assert.equal((await call(api.me, req('GET', null, { cookie }))).code, 401);
});
test('lead submissions have a shared rate limit independent of login', async () => {
  for (let i = 0; i < 8; i++) assert.equal((await call(api.postLead, req('POST', valid, { 'x-vercel-forwarded-for': '203.0.113.1' }))).code, 201);
  assert.equal((await call(api.postLead, req('POST', valid, { 'x-vercel-forwarded-for': '203.0.113.1' }))).code, 429);
});
test('pagination includes every record and returns newest first', async () => {
  for (let i = 0; i < 5; i++) await storage.create('leads/' + i + '.json', { id: String(i), created_at: new Date(i * 1000).toISOString() });
  const rows = await storage.listLeads();
  assert.deepEqual(rows.map(x => x.id), ['4', '3', '2', '1', '0']);
});
test('health checks access, missing admin stays 503, failed read stays 503', async () => {
  assert.equal((await call(api.health, req())).code, 200);
  delete process.env.ADMIN_PASSWORD_HASH;
  assert.equal((await call(api.health, req())).code, 503);
  unavailable = true;
  assert.equal((await call(api.health, req())).code, 503);
});
test('CSV neutralizes formulas and preserves separators, quotes and line breaks', () => {
  const fs = require('node:fs');
  const vm = require('node:vm');
  const source = fs.readFileSync(require('node:path').join(__dirname, '../src/pages/Admin.jsx'), 'utf8');
  const code = source.slice(source.indexOf('const toCsv ='), source.indexOf('const Leads ='));
  const toCsv = vm.runInNewContext(code + '; toCsv');
  const csv = toCsv([{ name: '=HYPERLINK("https://example.invalid")', email: 'a;b@example.invalid', phone: '+5541900000000', message: 'linha 1\nlinha "2"', source: '/teste' }]);
  assert.ok(csv.includes('"\'=HYPERLINK(""https://example.invalid"")"'));
  assert.ok(csv.includes('"a;b@example.invalid"'));
  assert.ok(csv.includes('"\'+5541900000000"'));
  assert.ok(csv.includes('"linha 1\nlinha ""2"""'));
  assert.ok(csv.includes('source'));
});
