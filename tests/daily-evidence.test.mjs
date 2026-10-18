import { test } from 'node:test';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { dailyLedgerSchema } from '../src/lib/daily-ledger.ts';
import { postSchema } from '../src/lib/post-schema.ts';
import { evidenceRange, timeEvidenceSchema, windowRelation } from '../src/lib/news-evidence.ts';
import { validatePublication } from '../.agents/skills/ai-daily/scripts/validate-ledger.mjs';
import { evidenceFixture, historicalFunding } from './fixtures/daily-evidence.mjs';
import { fixtureMdx } from './fixtures/daily.mjs';

const date = (value, timeZone) => ({ precision: 'date', value, ...(timeZone ? { timeZone } : {}), basis: 'TEST FIXTURE observed date', sourceUrls: ['https://example.test/fixture'] });
test('historical financing belongs to its original window and is not recycled in the next issue', () => {
  assert.equal(windowRelation(historicalFunding.time, '2026-10-16T02:00:00Z', '2026-10-17T02:00:00Z'), 'inside');
  assert.equal(windowRelation(historicalFunding.time, '2026-10-17T02:00:00Z', '2026-10-18T02:00:00Z'), 'outside');
});
test('date precision uses actual civil-day bounds, unknown zones and daylight saving', () => {
  const utc = evidenceRange(date('2026-10-16', 'UTC'));
  assert.deepEqual(utc, { earliest: Date.parse('2026-10-16T00:00:00Z'), latest: Date.parse('2026-10-16T23:59:59.999Z') });
  assert.equal(evidenceRange(date('2026-11-01', 'America/New_York')).latest - evidenceRange(date('2026-11-01', 'America/New_York')).earliest + 1, 25 * 3_600_000);
  assert.equal(evidenceRange(date('2026-10-16')).latest - evidenceRange(date('2026-10-16')).earliest + 1, 50 * 3_600_000);
  assert.equal(timeEvidenceSchema.safeParse(date('2026-02-30')).success, false);
  assert.equal(timeEvidenceSchema.safeParse(date('2026-10-16', 'Guessed/Zone')).success, false);
});
test('date-only important announcements can be confirmed in a larger window or visibly pending at a boundary', () => {
  assert.equal(windowRelation(date('2026-10-16', 'UTC'), '2026-10-15T02:00:00Z', '2026-10-17T02:00:00Z'), 'inside');
  assert.equal(windowRelation(date('2026-10-16'), '2026-10-16T02:00:00Z', '2026-10-17T02:00:00Z'), 'overlap');
  const { post } = evidenceFixture();
  const item = { ...post.daily.items[0], eventEvidence: date('2000-01-16'), uncertainty: 'TEST FIXTURE date crosses cutoff' };
  delete item.eventTime; delete item.candidateId;
  post.daily.pending = [item];
  post.sources[0].publication = date('2000-01-16'); delete post.sources[0].publishedAt;
  assert.equal(postSchema.safeParse(post).success, true);
  post.daily.items = [item]; delete post.daily.pending;
  assert.equal(postSchema.safeParse(post).success, false);
});
test('important previews and unfamiliar studios pass without a fixed company or news count', () => {
  const { run, content } = evidenceFixture();
  assert.doesNotThrow(() => validatePublication(run, content));
  run.candidates[0].entity = 'Another previously unseen solo developer';
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  run.candidates[0].releaseStatus = 'beta';
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
});
test('access failure and uncovered checks cannot masquerade as genuine no-update evidence', () => {
  const { run } = evidenceFixture();
  run.sources[0].access = 'access_failed';
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  const fresh = evidenceFixture().run;
  fresh.coverage[1].status = 'uncovered';
  assert.equal(dailyLedgerSchema.safeParse(fresh).success, false);
  const checked = evidenceFixture().run;
  checked.checks[1].status = 'uncovered';
  assert.equal(dailyLedgerSchema.safeParse(checked).success, false);
});
test('independent coverage audit must include rejected candidates and its own supplementary discovery', () => {
  const { run } = evidenceFixture();
  run.candidates.push({ ...run.candidates[0], id: 'old', eventTime: { ...run.candidates[0].eventTime, value: '1999-12-01T00:00:00Z' }, decision: 'exclude', reasonCode: 'outside_window', reason: 'Historical material only' });
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  run.review.candidateIds.push('old');
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  run.review.queryIds = ['q'];
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
});
test('time uncertainty cannot be relabelled as an outside-window exclusion', () => {
  const { run } = evidenceFixture();
  run.candidates[0].eventTime = date('2000-01-16');
  run.candidates[0].decision = 'exclude'; run.candidates[0].reasonCode = 'outside_window'; run.article.includedCandidateIds = [];
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  run.candidates[0].decision = 'watch'; run.candidates[0].reasonCode = 'time_uncertain'; run.article.watchCandidateIds = ['c'];
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
});
test('partial topics need disclosed reviewer limits; open blocking findings prevent publication', () => {
  const { run } = evidenceFixture();
  run.coverage[1].status = 'partial';
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  run.review.verdict = 'pass_with_limits';
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  run.review.findings = [{ detail: 'TEST FIXTURE missed event', severity: 'blocking', resolution: 'open' }];
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
});
test('publication is bound to the reviewed bytes, candidate order, maturity and original correction date', () => {
  const { run, post, content } = evidenceFixture();
  assert.throws(() => validatePublication(run, content + '\nchanged'), /reviewed hash/);
  run.article.originalDate = post.date;
  assert.doesNotThrow(() => validatePublication(run, content));
  run.article.originalDate = '1999-01-01T00:00:00Z';
  assert.throws(() => validatePublication(run, content), /preserve original/);
  assert.ok(fixtureMdx(post).includes('TEST FIXTURE'));
});

test('article source retrieval and publication precision must match fetched evidence', () => {
  const { run, post } = evidenceFixture();
  post.sources[0].retrievedAt = '2000-01-16T02:21:00Z';
  const content = fixtureMdx(post);
  run.article.sha256 = createHash('sha256').update(content).digest('hex');
  assert.throws(() => validatePublication(run, content), /source time\/access differs/);
});

test('a correction cannot move its update before original publication', () => {
  const { post } = evidenceFixture();
  post.updated = '1999-01-01T00:00:00Z';
  assert.equal(postSchema.safeParse(post).success, false);
});

test('attributed fetched media reporting can publish without an official announcement', () => {
  const { run } = evidenceFixture();
  run.sources[0].publisherKind = 'secondary';
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  run.candidates[0].reportedEvidence = { sourceIds: ['s'], attribution: 'TEST FIXTURE attributed newsroom report; reprints share one origin.', limitations: 'TEST FIXTURE proposal reported by one original; not independently confirmed or enacted.' };
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  run.candidates[0].reportedEvidence.attribution = '';
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
});

test('media path rejects snippets, community repetition and uncited reporting', () => {
  for (const change of ['snippet', 'community', 'uncited', 'undated', 'after-cutoff']) {
    const { run } = evidenceFixture();
    run.sources[0].publisherKind = 'secondary';
    run.candidates[0].reportedEvidence = { sourceIds: ['s'], attribution: 'TEST FIXTURE original reporting chain', limitations: 'TEST FIXTURE no independent corroboration' };
    if (change === 'snippet') run.sources[0].access = 'search_only';
    if (change === 'community') run.sources[0].publisherKind = 'community';
    if (change === 'uncited') { run.sources.push({ ...run.sources[0], id: 'uncited' }); run.candidates[0].reportedEvidence.sourceIds = ['uncited']; }
    if (change === 'undated') delete run.sources[0].publication;
    if (change === 'after-cutoff') run.sources[0].publication = { ...run.sources[0].publication, value: '2000-01-17T00:00:00Z' };
    assert.equal(dailyLedgerSchema.safeParse(run).success, false, change);
  }
});

test('reported news still obeys time boundaries and preserves prior candidate assessments', () => {
  const { run } = evidenceFixture();
  run.sources[0].publisherKind = 'secondary';
  const c = run.candidates[0];
  c.reportedEvidence = { sourceIds: ['s'], attribution: 'TEST FIXTURE new disclosure about prior work', limitations: 'TEST FIXTURE disclosure time is not first operation time' };
  c.priorAssessments = [{ snapshotAt: '2000-01-16T02:25:00Z', decision: 'pending', reasonCode: 'insufficient_evidence', reason: 'TEST FIXTURE previous source gate', queryIds: ['q'], sourceIds: ['s'] }];
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  c.eventTime = date('2000-01-16');
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
  c.decision = 'watch'; c.reasonCode = 'time_uncertain'; run.article.includedCandidateIds = []; run.article.watchCandidateIds = ['c'];
  assert.equal(dailyLedgerSchema.safeParse(run).success, true);
  c.priorAssessments[0].sourceIds = ['lost-source'];
  assert.equal(dailyLedgerSchema.safeParse(run).success, false);
});
