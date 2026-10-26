'use strict';

// One immutable object per lead: concurrent submissions never overwrite a shared array.
const blob = require('@vercel/blob');
const PREFIX = 'insales/v1/';
const authOptions = () => ({ storeId: process.env.VERCEL_ENV === 'preview' ? process.env.PREVIEW_BLOB_STORE_ID : process.env.BLOB_STORE_ID });
const options = { access: 'private', addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 0 };

function ready() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || (authOptions().storeId && process.env.VERCEL_OIDC_TOKEN));
}
async function read(path) {
  const result = await blob.get(PREFIX + path, { ...authOptions(), access: 'private', useCache: false });
  if (!result) return null;
  if (result.statusCode !== 200) throw new Error('StorageReadFailed');
  return { value: JSON.parse(await new Response(result.stream).text()), etag: result.blob.etag };
}
async function create(path, value) {
  return blob.put(PREFIX + path, JSON.stringify(value), { ...options, ...authOptions() });
}
async function remove(path) { await blob.del(PREFIX + path, authOptions()); }
async function listLeads() {
  const rows = [];
  let cursor;
  do {
    const page = await blob.list({ ...authOptions(), prefix: PREFIX + 'leads/', cursor, limit: 250 });
    for (let i = 0; i < page.blobs.length; i += 12) {
      const batch = await Promise.all(page.blobs.slice(i, i + 12).map(async (b) => {
        const result = await read(b.pathname.slice(PREFIX.length));
        return result?.value;
      }));
      rows.push(...batch.filter(Boolean));
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

// Atomic fixed-window counters shared by all Functions. Fail closed on conflicts
// or storage failure rather than falling back to a process-local counter.
async function consume(key, limit, windowMs, now = Date.now()) {
  const path = 'limits/' + key + '.json';
  const old = await read(path);
  const current = old?.value;
  const active = current && current.resetAt > now;
  const state = active ? current : { count: 0, resetAt: now + windowMs };
  if (state.count >= limit) return { allowed: false, retryAfter: Math.max(1, Math.ceil((state.resetAt - now) / 1000)) };
  try {
    await blob.put(PREFIX + path, JSON.stringify({ count: state.count + 1, resetAt: state.resetAt }), {
      ...options, ...authOptions(),
      ...(old ? { allowOverwrite: true, ifMatch: old.etag } : {}),
    });
    return { allowed: true };
  } catch (err) {
    if (err instanceof blob.BlobPreconditionFailedError || (err instanceof blob.BlobError && /already exists/i.test(err.message))) {
      return { allowed: false, retryAfter: 2 };
    }
    throw err;
  }
}
module.exports = { ready, read, create, remove, listLeads, consume };
