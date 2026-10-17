import { test } from 'node:test';
import assert from 'node:assert/strict';
import { postSchema } from '../src/lib/post-schema.ts';
import { isPublicPost, newestFirst, dailyNewestFirst, dailySlug, validateDailyIdentities, archivePageNumbers, archiveSlice } from '../src/lib/post-policy.ts';
import { dailyFixture } from './fixtures/daily.mjs';

const parsed = () => postSchema.parse(dailyFixture());
test('daily is an explicit channel; old distilled articles remain writing', () => {
  assert.equal(postSchema.parse({title: 'Legacy', date: '2000-01-01', kind: 'distilled'}).channel, 'writing');
  assert.equal(parsed().channel, 'daily');
});
test('every daily item needs a resolvable source and reporting window', () => {
  for (const mutate of [
    d => delete d.daily,
    d => d.daily.items[0].sourceUrls = [],
    d => d.daily.items[0].sourceUrls = ['https://example.test/missing'],
    d => delete d.sources[0].retrievedAt,
    d => d.sources[0].publishedAt = '2000-01-17T12:00:00+08:00',
    d => d.daily.items[0].eventTime = '2000-01-15T23:59:00+08:00',
    d => d.daily.windowStart = d.daily.cutoff,
    d => d.date = '2000-01-16T09:00:00+08:00',
    d => d.daily.issueDate = '2000-02-30',
    d => d.channel = 'writing',
  ]) {
    const data = dailyFixture(); mutate(data); assert.equal(postSchema.safeParse(data).success, false);
  }
});
test('issue date is Beijing calendar date at a UTC midnight boundary', () => {
  const data = dailyFixture('2000-01-17');
  data.daily.windowStart = '2000-01-16T15:00:00Z';
  data.daily.cutoff = '2000-01-16T16:30:00Z';
  data.daily.items[0].eventTime = '2000-01-16T16:00:00Z';
  data.sources[0].publishedAt = '2000-01-16T16:00:00Z';
  assert.equal(postSchema.safeParse(data).success, true);
  data.daily.issueDate = '2000-01-16';
  assert.equal(postSchema.safeParse(data).success, false);
});
test('drafts and future posts stay private, including exact cutoff boundary', () => {
  const now = new Date('2000-01-16T02:00:00Z');
  const post = {id: 'zh/2000-01-16-ai-daily', data: parsed()};
  assert.equal(isPublicPost(post, now), true);
  assert.equal(isPublicPost({...post, data: {...post.data, draft: true}}, now), false);
  assert.equal(isPublicPost({...post, data: {...post.data, date: new Date(now.getTime() + 1)}}, now), false);
});
test('reruns must use the same locale/date identity and stable ordering', () => {
  const entry = {id: `zh/${dailySlug('2000-01-16')}`, data: parsed()};
  validateDailyIdentities([entry]);
  assert.throws(() => validateDailyIdentities([entry, entry]));
  assert.throws(() => validateDailyIdentities([{...entry, id: entry.id + '-copy'}]));
  assert.deepEqual([{...entry, id:'zh/b'}, {...entry, id:'zh/a'}].sort(newestFirst).map(e => e.id), ['zh/a','zh/b']);
});
test('archive includes empty state and every issue across bounded pages', () => {
  assert.deepEqual(archivePageNumbers(0), [1]);
  assert.deepEqual(archivePageNumbers(14), [1]);
  assert.deepEqual(archivePageNumbers(16), [1, 2]);
  const issues = Array.from({length: 16}, (_, i) => i);
  assert.deepEqual(archivePageNumbers(issues.length).flatMap(page => archiveSlice(issues, page)), issues);
});

test('latest issue and daily adjacency follow issue date even for late backfills', () => {
  const newest = {id:'zh/2000-01-16-ai-daily', data: parsed()};
  const backfill = {id:'zh/2000-01-01-ai-daily', data: {...parsed(), date:new Date('2000-02-01'), daily:{issueDate:'2000-01-01'}}};
  assert.equal([backfill, newest].sort(dailyNewestFirst)[0], newest);
});

test('stat labels keep exactly one unit and preserve existing formatted signs', async () => {
  const { formatStatValue } = await import('../src/lib/stat-value.ts');
  assert.equal(formatStatValue('32K', '', 'K'), '32K');
  assert.equal(formatStatValue('90%', '', '%'), '90%');
  assert.equal(formatStatValue('67.8%', '', '%'), '67.8%');
  assert.equal(formatStatValue('3.47', '$', 'M'), '$3.47M');
  assert.equal(formatStatValue('+3.82%', '', '%'), '+3.82%');
});
