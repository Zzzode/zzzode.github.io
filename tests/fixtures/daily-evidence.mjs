// Synthetic audit records. Historical news is regression input, never a production feed.
import { createHash } from 'node:crypto';
import { dailyFixture, fixtureMdx } from './daily.mjs';
const url = 'https://example.test/fixture';
export const historicalFunding = {
  title: 'RapidCanvas $29M Series B (historical regression material)',
  time: { precision: 'interval', earliest: '2026-10-16T13:00:00Z', latest: '2026-10-16T13:00:59.999Z', basis: 'Company release: 09:00 ET, October 16', sourceUrls: ['https://www.globenewswire.com/news-release/2026/10/16/3382607/0/en/rapidcanvas-raises-29m-series-b-to-bring-fortune-100-grade-ai-to-every-enterprise.html'] },
};
export function evidenceFixture() {
  const topics = ['products', 'business', 'research', 'governance', 'agents'];
  const event = { precision: 'instant', value: '2000-01-16T01:00:00+08:00', basis: 'TEST FIXTURE time', sourceUrls: [url] };
  const run = {
    version: 2, runId: 'TEST FIXTURE', author: 'fixture-author', issueDate: '2000-01-16',
    windowStart: '2000-01-16T00:00:00+08:00', cutoff: '2000-01-16T10:00:00+08:00',
    startedAt: '2000-01-16T02:00:00Z', completedAt: '2000-01-16T03:00:00Z',
    queries: [
      { id: 'q', actor: 'fixture-author', method: 'search', query: 'TEST FIXTURE discovery', executedAt: '2000-01-16T02:10:00Z', focus: [...topics, 'open-discovery'], language: 'fixture', resultUrls: [url], notes: 'Synthetic query, not executed news research.' },
      { id: 'review-q', actor: 'fixture-reviewer', method: 'search', query: 'TEST FIXTURE independent discovery', executedAt: '2000-01-16T02:30:00Z', focus: ['open-discovery'], language: 'fixture', resultUrls: [url], notes: 'Synthetic independent query.' },
    ],
    sources: [{ id: 's', title: 'TEST FIXTURE source', url, publisherKind: 'primary', access: 'fetched', retrievedAt: '2000-01-16T02:20:00Z', publication: event, evidence: 'Synthetic fixture content.' }],
    candidates: [{ id: 'c', title: 'TEST FIXTURE unknown independent studio preview', category: 'products', entity: 'Unlisted fixture studio', releaseStatus: 'preview', queryIds: ['q'], sourceIds: ['s'], eventTime: event, decision: 'include', reasonCode: 'selected', reason: 'TEST FIXTURE inclusion', importance: 'Synthetic significant capability, unrelated to company list.' }],
    checks: topics.map((category) => ({ id: category, target: `TEST FIXTURE ${category}`, category, status: category === 'products' ? 'candidate' : 'checked_no_update', checkedAt: '2000-01-16T02:20:00Z', queryIds: ['q'], sourceIds: ['s'], candidateIds: category === 'products' ? ['c'] : [], notes: 'Synthetic scoped check, not a real absence claim.' })),
    coverage: topics.map((category) => ({ category, status: 'reviewed', queryIds: ['q'], checkIds: [category], assessment: 'TEST FIXTURE bounded coverage assessment.' })),
    discovery: { queryIds: ['q'], assessment: 'TEST FIXTURE open discovery beyond seeds.' },
    review: { reviewer: 'fixture-reviewer', reviewedAt: '2000-01-16T02:50:00Z', candidateIds: ['c'], queryIds: ['review-q'], verdict: 'pass', report: 'TEST FIXTURE report', findings: [] },
    article: { slug: '2000-01-16-ai-daily', includedCandidateIds: ['c'], watchCandidateIds: [], limitations: 'TEST FIXTURE does not prove exhaustive coverage.' },
  };
  const post = dailyFixture();
  post.updated = '2000-01-16T03:00:00Z';
  post.sources[0].retrievedAt = run.sources[0].retrievedAt;
  post.daily.evidenceRun = 'docs/daily/runs/2000-01-16.json';
  Object.assign(post.daily.items[0], { category: 'products', candidateId: 'c', releaseStatus: 'preview' });
  const content = fixtureMdx(post);
  run.article.sha256 = createHash('sha256').update(content).digest('hex');
  return { run, post, content };
}
