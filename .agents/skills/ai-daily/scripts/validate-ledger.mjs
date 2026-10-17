#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dailyLedgerSchema } from '../../../../src/lib/daily-ledger.ts';
import { postSchema } from '../../../../src/lib/post-schema.ts';

const timeKey = (time) => time.precision === 'interval' ? [time.precision, time.earliest, time.latest] : [time.precision, time.value, time.timeZone ?? null];
const repo = fileURLToPath(new URL('../../../../', import.meta.url));
export function validatePublication(ledger, content) {
  const run = dailyLedgerSchema.parse(ledger);
  const parts = content.split(/^---\s*$/m);
  if (parts.length < 3) throw new Error('Missing article front matter');
  // Daily authoring uses JSON front matter (valid YAML), avoiding a second parser dependency.
  const post = postSchema.parse(JSON.parse(parts[1]));
  const daily = post.daily;
  if (post.channel !== 'daily' || !daily) throw new Error('Expected a daily article');
  if (daily.issueDate !== run.issueDate || daily.windowStart !== run.windowStart || daily.cutoff !== run.cutoff) throw new Error('Article and ledger windows differ');
  if (daily.evidenceRun !== `docs/daily/runs/${run.issueDate}.json`) throw new Error('Article must identify its canonical evidence run');
  if (!run.article.sha256 || createHash('sha256').update(content).digest('hex') !== run.article.sha256) throw new Error('Article differs from the reviewed hash');
  if (run.article.originalDate && (post.date.getTime() !== Date.parse(run.article.originalDate) || !post.updated)) throw new Error('Correction must preserve original publication date and set updated');
  for (const [items, selected] of [[daily.items, run.article.includedCandidateIds], [daily.pending ?? [], run.article.watchCandidateIds]]) {
    if (items.length !== selected.length || items.some((item, i) => item.candidateId !== selected[i])) throw new Error('Article order/selection must match the audited candidate ids');
    for (const item of items) {
      const candidate = run.candidates.find((candidate) => candidate.id === item.candidateId);
      const sources = run.sources.filter((source) => candidate.sourceIds.includes(source.id));
      for (const url of item.sourceUrls) {
        const cited = post.sources.find((source) => source.url === url);
        const publication = cited.publication ?? { precision: 'instant', value: cited.publishedAt };
        if (!sources.some((source) => source.url === url && source.access === 'fetched' && source.publication && JSON.stringify(timeKey(source.publication)) === JSON.stringify(timeKey(publication)) && source.retrievedAt === cited.retrievedAt)) throw new Error(`Article source time/access differs from evidence: ${url}`);
      }
      const event = item.eventEvidence ?? { precision: 'instant', value: item.eventTime };
      if (event.precision !== candidate.eventTime.precision || (event.precision === 'interval' ? event.earliest !== candidate.eventTime.earliest || event.latest !== candidate.eventTime.latest : event.value !== candidate.eventTime.value || (event.precision === 'date' && event.timeZone !== candidate.eventTime.timeZone))) throw new Error(`Article event time differs from evidence: ${item.candidateId}`);
      if (item.releaseStatus !== candidate.releaseStatus) throw new Error(`Article must preserve release status: ${item.candidateId}`);
      if (item.category !== candidate.category) throw new Error(`Article topic differs from candidate: ${item.candidateId}`);
    }
  }
  return run;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Usage: node .agents/skills/ai-daily/scripts/validate-ledger.mjs <run.json> [article.mdx]');
    const run = JSON.parse(readFileSync(resolve(process.argv[2]), 'utf8'));
    const article = process.argv[3] ? resolve(process.argv[3]) : resolve(repo, `src/content/posts/zh/${run.issueDate}-ai-daily.mdx`);
    const checked = validatePublication(run, readFileSync(article, 'utf8'));
    console.log(`Daily evidence structure PASS: ${checked.candidates.length} candidates; ${checked.review.verdict}. This does not prove exhaustive coverage or source truth.`);
  } catch (error) { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }
}
