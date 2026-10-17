/** Build explicit fixtures in an isolated checkout. Never write fixtures into src/content here. */
import { cp, mkdtemp, readFile, writeFile, symlink, stat, readdir, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { dailyFixture, fixtureMdx } from '../tests/fixtures/daily.mjs';
const source = fileURLToPath(new URL('../', import.meta.url));
const root = await mkdtemp(path.join(tmpdir(), 'ai-daily-review-'));
await cp(source, root, {recursive:true, filter: file => !['.git','node_modules','dist','.astro'].includes(path.relative(source, file).split(path.sep)[0])});
await symlink(path.join(source, 'node_modules'), path.join(root, 'node_modules'), 'dir');
const zh = path.join(root, 'src/content/posts/zh');
const en = path.join(root, 'src/content/posts/en');
// Model a controlled calendar: real daily issues must not change the fixture's latest/page counts.
// Only remove copies in the isolated checkout; the source repository remains untouched.
for (const folder of [zh, en]) {
  for (const name of await readdir(folder)) {
    if (!/\.mdx?$/.test(name)) continue;
    const file = path.join(folder, name);
    const frontmatter = (await readFile(file, 'utf8')).split(/^---\s*$/m)[1] ?? '';
    if (/^(?:channel:\s*['"]?daily['"]?\s*$|\s*"channel"\s*:\s*"daily")/m.test(frontmatter)) await unlink(file);
  }
}
for (let i = 1; i <= 16; i++) {
  const day = `2000-01-${String(i).padStart(2,'0')}`;
  const fixture = dailyFixture(day);
  if (i === 16) {
    const eventEvidence = { precision: 'date', value: day, basis: 'TEST FIXTURE date only', sourceUrls: fixture.daily.items[0].sourceUrls };
    fixture.daily.pending = [{ ...fixture.daily.items[0], title: 'TEST FIXTURE date-only preview', eventEvidence, releaseStatus: 'preview', uncertainty: 'TEST FIXTURE boundary uncertainty' }];
    delete fixture.daily.pending[0].eventTime;
    fixture.updated = '2000-02-02T00:00:00Z';
    fixture.daily.correction = 'TEST FIXTURE visible correction';
  }
  if (i === 1) fixture.date = '2000-02-01T10:00:00+08:00'; // A late backfill must not replace the latest issue.
  await writeFile(path.join(zh, `${day}-ai-daily.mdx`), fixtureMdx(fixture));
}
await writeFile(path.join(zh, 'private-fixture.md'), '---\ntitle: FIXTURE PRIVATE\ndate: 2000-01-01\ndraft: true\ntags: [secret-fixture]\n---\nprivateonlytoken');
await writeFile(path.join(zh, 'future-fixture.md'), '---\ntitle: FIXTURE FUTURE\ndate: 2999-01-01\ntags: [future-fixture]\n---\nfutureonlytoken');
const hiddenDaily = dailyFixture('2999-01-01');
await writeFile(path.join(zh, '2999-01-01-ai-daily.mdx'), fixtureMdx(hiddenDaily));
const draftDaily = {...dailyFixture('2000-01-17'), draft: true};
await writeFile(path.join(zh, '2000-01-17-ai-daily.mdx'), fixtureMdx(draftDaily));
// A private translation must not enable a public language toggle.
await writeFile(path.join(en, '2000-01-16-ai-daily.mdx'), fixtureMdx({...dailyFixture(), draft: true}));
execFileSync('npm', ['run','build'], {cwd:root, env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},stdio:'pipe'});
const read = route => readFile(path.join(root,'dist',route),'utf8');
const home = await read('index.html');
const archive = await read('daily/index.html');
const page2 = await read('daily/page/2/index.html');
const article = await read('posts/2000-01-16-ai-daily/index.html');
const feed = await read('rss.xml');
const sitemap = await read('sitemap-0.xml');
assert.match(home, /2000-01-16-ai-daily/);
assert.doesNotMatch(home, /2000-01-15-ai-daily/);
assert.match(home, /2026-10-16-deepseek-dsec-sandbox/);
const old = await read('posts/2026-10-16-deepseek-dsec-sandbox/index.html');
assert.doesNotMatch(old, /32KK|90%%|67.8%%|57%%/);
assert.match(old, /data-final="32K"/);
assert.match(archive, /2000-01-16-ai-daily/);
assert.doesNotMatch(archive, /href="\/posts\/2000-01-02-ai-daily/);
assert.match(page2, /2000-01-02-ai-daily/);
assert.match(page2, /2000-01-01-ai-daily/);
assert.match(archive, /rel="next"/);
assert.match(archive, /href="\/en\/daily\/"/);
assert.match(page2, /rel="prev"/);
assert.match(article, /daily-overview/);
assert.match(article, /href="\/daily\/" aria-current="page"/);
assert.match(article, /daily-item-1/);
assert.match(article, /daily-pending-1/);
assert.match(article, /日期已知，窗口待核/);
assert.match(article, /TEST FIXTURE visible correction/);
assert.match(article, /TEST FIXTURE date-only preview/);
assert.match(article, /来源未标时区/);
assert.match(article, /仅日期/);
assert.match(article, /example.test\/fixture/);
assert.match(article, /aria-disabled="true"/);
assert.match(article, /href="\/posts\/2000-01-15-ai-daily\/"/);
assert.doesNotMatch(article, /href="\/posts\/2000-01-01-ai-daily\/"/);
assert.match(feed, /2000-01-16-ai-daily/);
assert.match(sitemap, /daily\/page\/2/);
for (const route of ['index.html','posts/index.html','daily/index.html','rss.xml','sitemap-0.xml','posts/tags/index.html']) {
  const text = await read(route);
  assert.doesNotMatch(text, /FIXTURE PRIVATE|FIXTURE FUTURE|private-fixture|future-fixture|2999-01-01-ai-daily|2000-01-17-ai-daily/);
}
for (const route of ['posts/private-fixture/index.html','posts/future-fixture/index.html','posts/2999-01-01-ai-daily/index.html','en/posts/2000-01-16-ai-daily/index.html','posts/tags/secret-fixture/index.html']) {
  await assert.rejects(stat(path.join(root,'dist',route)));
}
assert.doesNotMatch(await read('en/daily/index.html'), /2000-01-16-ai-daily/);
for (const route of ['index.html','daily/index.html','daily/page/2/index.html','en/daily/index.html']) assert.doesNotMatch(await read(route), /<script/);
console.log(`Daily integration assertions passed. Isolated preview checkout: ${root}`);
await writeFile('/tmp/ai-daily-review-root', root);
