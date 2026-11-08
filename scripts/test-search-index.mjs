/** Verify the built Pagefind index against the Chinese segmentation regression. */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve('dist/pagefind');
const server = createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '');
    const file = path.resolve(root, name);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error('Invalid path');
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': file.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream' });
    res.end(bytes);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
// Pagefind selects its query tokenizer from the page language.
// Node has no document, so expose the same language as the Chinese search page.
globalThis.document = { currentScript: null, querySelector: (selector) => selector === 'html' ? { getAttribute: () => 'zh-CN' } : null };
let pagefind;
try {
  pagefind = await import(pathToFileURL(path.join(root, 'pagefind.js')).href);
  await pagefind.options({ basePath: `http://127.0.0.1:${address.port}/` });
  await pagefind.init();
  for (const term of ['软银', 'ABB', '机器人', 'WorkOS']) {
    const response = await pagefind.search(term, { filters: { locale: 'zh' } });
    const results = await Promise.all(response.results.map((result) => result.data()));
    assert.ok(results.some((result) => result.url === '/posts/2026-11-08-ai-daily/'), `${term} must find the November 8 issue`);
    assert.ok(results.every((result) => !result.url.startsWith('/en/')), `${term} must respect the Chinese locale filter`);
  }
  const english = await pagefind.search('软银', { filters: { locale: 'en' } });
  assert.equal(english.results.length, 0, 'Chinese daily must not leak into English results');
  console.log('Pagefind search regression passed.');
} finally {
  if (pagefind) await pagefind.destroy();
  delete globalThis.document;
  await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
}
