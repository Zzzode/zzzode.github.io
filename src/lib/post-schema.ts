import { z } from 'zod';
import { evidenceRange, instantEvidence, newsTimestamp, timeEvidenceSchema, windowRelation } from './news-evidence.ts';

const timestamp = newsTimestamp;
export const dailyCategories = ['products', 'business', 'research', 'governance', 'agents'] as const;
const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  publishedAt: timestamp.optional(),
  publication: timeEvidenceSchema.optional(),
  retrievedAt: timestamp.optional(),
});
const issueDate = z.iso.date();
const itemShape = {
  title: z.string().min(1), summary: z.string().min(1), category: z.enum(dailyCategories),
  eventTime: timestamp.optional(), eventEvidence: timeEvidenceSchema.optional(),
  sourceUrls: z.array(z.url()).min(1),
  candidateId: z.string().min(1).optional(),
  releaseStatus: z.enum(['released', 'preview', 'beta', 'announced', 'research']).optional(),
};
const dailySchema = z.object({
  issueDate,
  timeZone: z.literal('Asia/Shanghai'),
  windowStart: timestamp,
  cutoff: timestamp,
  // Array order is editorial importance, never a fabricated numeric score.
  items: z.array(z.object(itemShape)).min(1),
  pending: z.array(z.object({ ...itemShape, uncertainty: z.string().min(1) })).optional(),
  evidenceRun: z.string().regex(/^docs\/daily\/runs\/\d{4}-\d{2}-\d{2}\.json$/).optional(),
  correction: z.string().min(1).optional(),
});

export const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  kind: z.enum(['note', 'distilled']).default('note'),
  channel: z.enum(['writing', 'daily']).default('writing'),
  sources: z.array(sourceSchema).optional(),
  daily: dailySchema.optional(),
}).superRefine((post, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: 'custom', message });
  if (post.channel !== 'daily') {
    if (post.daily) fail('daily metadata requires channel: daily');
    return;
  }
  if (!post.daily || post.kind !== 'distilled' || !post.excerpt?.trim()) {
    fail('Daily issues require daily metadata, kind: distilled and an excerpt');
    return;
  }
  const daily = post.daily;
  if (daily.correction && !post.updated) fail('A visible correction requires updated');
  if (post.updated && post.updated < post.date) fail('Daily update cannot precede original publication');
  const start = Date.parse(daily.windowStart);
  const cutoff = Date.parse(daily.cutoff);
  if (start >= cutoff || cutoff > post.date.getTime()) fail('Require windowStart < cutoff <= publication date');
  const shanghaiDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(cutoff));
  if (shanghaiDate !== daily.issueDate) fail('issueDate must equal the cutoff date in Asia/Shanghai');
  const sources = new Map((post.sources ?? []).map((source) => [source.url, source]));
  if (sources.size !== post.sources?.length) fail('Source URLs must be unique');
  const items = [...daily.items.map((item) => ({ item, pending: false })), ...(daily.pending ?? []).map((item) => ({ item, pending: true }))];
  const candidateIds = items.map(({ item }) => item.candidateId).filter(Boolean);
  if (new Set(candidateIds).size !== candidateIds.length) fail('A candidate may appear only once');
  for (const { item, pending } of items) {
    if (Boolean(item.eventTime) === Boolean(item.eventEvidence)) fail(`Supply exactly one event time representation: ${item.title}`);
    const event = item.eventEvidence ?? (item.eventTime ? instantEvidence(item.eventTime, item.sourceUrls[0]) : undefined);
    if (event) {
      const relation = windowRelation(event, daily.windowStart, daily.cutoff);
      if (relation !== (pending ? 'overlap' : 'inside')) fail(`Event must be ${pending ? 'explicitly uncertain across the boundary' : 'inside the window'}: ${item.title}`);
      for (const url of event.sourceUrls) if (!item.sourceUrls.includes(url)) fail(`Event time evidence must be cited by the item: ${url}`);
    }
    if (new Set(item.sourceUrls).size !== item.sourceUrls.length) fail('An item must not repeat a source URL');
    for (const url of item.sourceUrls) {
      const source = sources.get(url);
      if (!source?.retrievedAt || Boolean(source.publishedAt) === Boolean(source.publication)) fail(`Daily source needs one publication evidence and retrievedAt: ${url}`);
      else {
        const publication = source.publication ?? instantEvidence(source.publishedAt!, url);
        const range = evidenceRange(publication);
        if (range.earliest > cutoff || Date.parse(source.retrievedAt) < range.earliest) fail(`Invalid source timing: ${url}`);
        if (Date.parse(source.retrievedAt) > (post.updated ?? post.date).getTime()) fail(`Source retrieval must precede publication/update: ${url}`);
      }
    }
  }
});
export type DailyMetadata = z.infer<typeof dailySchema>;
export type PostSource = z.infer<typeof sourceSchema>;
