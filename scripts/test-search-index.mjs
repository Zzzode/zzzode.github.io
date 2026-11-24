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
// Node has no document, so expose the matching html[lang] attribute per pass.
let htmlLang = 'zh-CN';
globalThis.document = {
  currentScript: null,
  querySelector: (selector) =>
    selector === 'html' ? { getAttribute: () => htmlLang } : null,
};
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

  // Verify Chinese /projects/ indexing, sub-result anchors, and ignored chrome.
  for (const [term, anchor, title] of [
    ['Persona', '/projects/#persona', 'Persona'],
    ['ZOM', '/projects/#zom', 'ZOM'],
  ]) {
    const response = await pagefind.search(term, { filters: { locale: 'zh' } });
    const results = await Promise.all(response.results.map((result) => result.data()));
    assert.ok(results.every((result) => !result.url.startsWith('/en/')), `${term} must respect the Chinese locale filter`);
    const projects = results.find((result) => result.url === '/projects/');
    assert.ok(projects, `${term} must find /projects/`);
    assert.ok(
      (projects.sub_results ?? []).some((sub) => sub.url === anchor && sub.title === title),
      `${term} must expose sub-result anchor ${anchor}`
    );
    if (term === 'Persona') {
      assert.ok(
        !(projects.sub_results ?? []).some((sub) => sub.url === '/projects/#zom'),
        'Persona query must not falsely attribute nwverse/persona metadata to ZOM'
      );
    }
  }
  const ignoredChrome = await pagefind.search('更多仓库在 GitHub', { filters: { locale: 'zh' } });
  const ignoredResults = await Promise.all(ignoredChrome.results.map((result) => result.data()));
  assert.ok(
    ignoredResults.every((result) => result.url !== '/projects/'),
    'Ignored projects chrome must not match /projects/'
  );

  // Switch tokenizer language to English and verify /en/projects/.
  await pagefind.destroy();
  htmlLang = 'en';
  await pagefind.options({ basePath: `http://127.0.0.1:${address.port}/` });
  await pagefind.init();
  const enProjectsRes = await pagefind.search('Persona', { filters: { locale: 'en' } });
  const enProjectsData = await Promise.all(enProjectsRes.results.map((result) => result.data()));
  assert.ok(enProjectsData.every((result) => result.url.startsWith('/en/')), 'English search must stay under /en/');
  const enProjects = enProjectsData.find((result) => result.url === '/en/projects/');
  assert.ok(enProjects, 'Persona must find /en/projects/');
  assert.ok(
    (enProjects.sub_results ?? []).some((sub) => sub.url === '/en/projects/#persona' && sub.title === 'Persona'),
    'English Persona search must expose sub-result anchor /en/projects/#persona'
  );

  console.log('Pagefind search regression passed.');
} finally {
  if (pagefind) await pagefind.destroy();
  delete globalThis.document;
  await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
}
