import { z } from 'zod';

const timestamp = z.iso.datetime({ offset: true });
export const dailyCategories = ['products', 'business', 'research', 'governance', 'agents'] as const;
const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  publishedAt: timestamp.optional(),
  retrievedAt: timestamp.optional(),
});
const issueDate = z.iso.date();
const dailySchema = z.object({
  issueDate,
  timeZone: z.literal('Asia/Shanghai'),
  windowStart: timestamp,
  cutoff: timestamp,
  // Array order is editorial importance, never a fabricated numeric score.
  items: z.array(z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.enum(dailyCategories),
    eventTime: timestamp,
    sourceUrls: z.array(z.url()).min(1),
  })).min(1),
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
  const start = Date.parse(daily.windowStart);
  const cutoff = Date.parse(daily.cutoff);
  if (start >= cutoff || cutoff > post.date.getTime()) fail('Require windowStart < cutoff <= publication date');
  const shanghaiDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(cutoff));
  if (shanghaiDate !== daily.issueDate) fail('issueDate must equal the cutoff date in Asia/Shanghai');
  const sources = new Map((post.sources ?? []).map((source) => [source.url, source]));
  if (sources.size !== post.sources?.length) fail('Source URLs must be unique');
  for (const item of daily.items) {
    const event = Date.parse(item.eventTime);
    if (event <= start || event > cutoff) fail(`Item outside the (windowStart, cutoff] window: ${item.title}`);
    if (new Set(item.sourceUrls).size !== item.sourceUrls.length) fail('An item must not repeat a source URL');
    for (const url of item.sourceUrls) {
      const source = sources.get(url);
      if (!source?.publishedAt || !source.retrievedAt) fail(`Daily source needs publishedAt and retrievedAt: ${url}`);
      else if (Date.parse(source.publishedAt) > cutoff || Date.parse(source.retrievedAt) < Date.parse(source.publishedAt)) fail(`Invalid source timestamps: ${url}`);
    }
  }
});
export type DailyMetadata = z.infer<typeof dailySchema>;
export type PostSource = z.infer<typeof sourceSchema>;
