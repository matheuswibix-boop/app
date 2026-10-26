'use strict';

const crypto = require('node:crypto');
const { promisify } = require('node:util');
const storage = require('./storage.cjs');
const scrypt = promisify(crypto.scrypt);
const COOKIE = 'insales_admin';
const TTL = 12 * 60 * 60 * 1000;
const HASH = /^scrypt\$([a-f0-9]{32})\$([a-f0-9]{128})$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const FIELDS = { name: 120, email: 254, phone: 30, company: 120, revenue: 60, service: 80, message: 2000, source: 500 };

function send(res, status, data) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.status(status).json(data);
}
const error = (res, status, detail) => send(res, status, { detail });
function authReady() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.ADMIN_EMAIL || '') &&
    HASH.test(process.env.ADMIN_PASSWORD_HASH || '') && (process.env.SESSION_SECRET || '').length >= 32;
}
function hasStorage(res) {
  if (storage.ready()) return true;
  error(res, 503, 'Armazenamento indisponível. Contate-nos pelo WhatsApp.');
  return false;
}
function method(req, res, wanted) {
  if (req.method === wanted) return true;
  res.setHeader('Allow', wanted);
  error(res, 405, 'Método não permitido.');
  return false;
}
function origin(req, res) {
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    error(res, 403, 'Origem não autorizada.');
    return false;
  }
  try {
    const host = req.headers.host;
    if (req.headers.origin && new URL(req.headers.origin).host === host && new URL(req.headers.origin).protocol === 'https:') return true;
  } catch { /* Reject malformed origins. */ }
  error(res, 403, 'Origem não autorizada.');
  return false;
}
function body(req, res) {
  let value = req.body;
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
    error(res, 415, 'Envie os dados em JSON.');
    return null;
  }
  try {
    if (Buffer.byteLength(typeof value === 'string' ? value : JSON.stringify(value ?? '')) > 16000) {
      error(res, 413, 'Conteúdo muito grande.');
      return null;
    }
    if (typeof value === 'string') value = JSON.parse(value);
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('InvalidBody');
    return value;
  } catch {
    error(res, 400, 'Conteúdo inválido.');
    return null;
  }
}
const digest = (value) => crypto.createHmac('sha256', process.env.SESSION_SECRET || process.env.BLOB_STORE_ID || 'insales').update(value).digest('hex');
function equal(a, b) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
function token(req) {
  const match = (req.headers.cookie || '').match(/(?:^|;\s*)insales_admin=([a-zA-Z0-9_.-]+)/);
  return match?.[1];
}
const sign = (value) => crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('base64url');
const sessionPath = (id) => 'sessions/' + digest(id) + '.json';
async function session(req) {
  if (!authReady() || !storage.ready()) return null;
  const value = token(req);
  if (!value || value.length > 256) return null;
  const [id, signature, extra] = value.split('.');
  if (extra !== undefined || !/^[a-f0-9]{64}$/.test(id || '') || !signature || !equal(sign(id), signature)) return null;
  const entry = await storage.read(sessionPath(id));
  if (!entry || entry.value.exp <= Date.now() || entry.value.fingerprint !== digest(process.env.ADMIN_PASSWORD_HASH) || entry.value.email !== process.env.ADMIN_EMAIL.toLowerCase()) return null;
  return { ...entry.value, id };
}
async function admin(req, res) {
  const user = await session(req);
  if (!user) error(res, 401, 'Não autenticado.');
  return user;
}
async function limit(req, res, kind, max, windowMs) {
  // Vercel overwrites this trusted header; local tests supply a synthetic address.
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const result = await storage.consume(digest(kind + ':' + ip), max, windowMs);
  if (result.allowed) return true;
  res.setHeader('Retry-After', String(result.retryAfter));
  error(res, 429, 'Muitas tentativas. Aguarde antes de tentar novamente.');
  return false;
}
function validLead(input) {
  if (input.website) return null;
  const result = {};
  for (const [key, max] of Object.entries(FIELDS)) {
    const value = input[key] ?? '';
    if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) return null;
    result[key] = value.trim();
  }
  const digits = result.phone.replace(/\D/g, '');
  if (result.name.length < 2 || digits.length < 10 || digits.length > 15 || !/^[+\d\s().-]+$/.test(result.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) return null;
  if (result.source && !result.source.startsWith('/')) return null;
  return result;
}
async function postLead(req, res) {
  if (!method(req, res, 'POST') || !origin(req, res)) return;
  const input = body(req, res);
  if (!input) return;
  const lead = validLead(input);
  if (!lead) return error(res, 422, 'Confira nome, e-mail e WhatsApp com DDD.');
  if (!hasStorage(res) || !await limit(req, res, 'lead', 8, 60 * 60 * 1000)) return;
  const id = crypto.randomUUID();
  const doc = { id, created_at: new Date().toISOString(), ...lead };
  await storage.create('leads/' + id + '.json', doc);
  // Do not claim success without reading the persisted record back.
  const saved = await storage.read('leads/' + id + '.json');
  if (saved?.value.id !== id) throw new Error('StorageVerificationFailed');
  return send(res, 201, { ok: true, id });
}
async function listLeads(req, res) {
  if (!method(req, res, 'GET') || !await admin(req, res) || !hasStorage(res)) return;
  return send(res, 200, await storage.listLeads());
}
async function deleteLead(req, res) {
  if (!method(req, res, 'DELETE') || !origin(req, res) || !await admin(req, res) || !hasStorage(res)) return;
  const id = req.query.id;
  if (typeof id !== 'string' || !UUID.test(id)) return error(res, 400, 'ID inválido.');
  const path = 'leads/' + id + '.json';
  if (!await storage.read(path)) return error(res, 404, 'Lead não encontrado.');
  await storage.remove(path);
  return send(res, 200, { ok: true });
}
async function login(req, res) {
  if (!method(req, res, 'POST') || !origin(req, res)) return;
  const input = body(req, res);
  if (!input) return;
  if (!authReady()) return error(res, 503, 'Painel ainda não configurado.');
  if (!hasStorage(res) || !await limit(req, res, 'login', 5, 15 * 60 * 1000)) return;
  if (typeof input.email !== 'string' || typeof input.password !== 'string' || input.password.length > 256) return error(res, 401, 'E-mail ou senha incorretos.');
  const match = HASH.exec(process.env.ADMIN_PASSWORD_HASH);
  const candidate = await scrypt(input.password, Buffer.from(match[1], 'hex'), 64);
  if (!equal(input.email.trim().toLowerCase(), process.env.ADMIN_EMAIL.toLowerCase()) || !crypto.timingSafeEqual(candidate, Buffer.from(match[2], 'hex'))) return error(res, 401, 'E-mail ou senha incorretos.');
  const id = crypto.randomBytes(32).toString('hex');
  await storage.create(sessionPath(id), { email: process.env.ADMIN_EMAIL.toLowerCase(), exp: Date.now() + TTL, fingerprint: digest(process.env.ADMIN_PASSWORD_HASH) });
  res.setHeader('Set-Cookie', COOKIE + '=' + id + '.' + sign(id) + '; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=' + TTL / 1000);
  return send(res, 200, { email: process.env.ADMIN_EMAIL.toLowerCase(), name: 'Admin' });
}
async function logout(req, res) {
  if (!method(req, res, 'POST') || !origin(req, res)) return;
  const current = await session(req);
  if (current) await storage.remove(sessionPath(current.id));
  res.setHeader('Set-Cookie', COOKIE + '=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
  return send(res, 200, { ok: true });
}
async function me(req, res) {
  if (!method(req, res, 'GET')) return;
  const current = await admin(req, res);
  if (current) return send(res, 200, { email: current.email, name: 'Admin' });
}
async function health(req, res) {
  if (!method(req, res, 'GET')) return;
  const status = { service: 'insales-api', storage: storage.ready() ? 'configured' : 'missing', admin: authReady() ? 'configured' : 'missing' };
  if (storage.ready()) {
    // Real read permission check. Lead writes are tested independently, without
    // creating a record on every health probe.
    await storage.read('health.json');
    status.storage = 'connected';
  }
  return send(res, storage.ready() && authReady() ? 200 : 503, status);
}
function safe(handler) {
  return async (req, res) => {
    try { return await handler(req, res); }
    catch (err) {
      // Never log payloads, cookies, credentials, blob URLs or customer data.
      console.error('[INSALES API]', handler.name, err?.name || 'Error');
      return error(res, 503, 'Serviço temporariamente indisponível. Procure atendimento pelo WhatsApp.');
    }
  };
}
module.exports = Object.fromEntries(Object.entries({ postLead, listLeads, deleteLead, login, logout, me, health }).map(([name, handler]) => [name, safe(handler)]));
