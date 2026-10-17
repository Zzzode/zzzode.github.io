/** Shared by every public post surface; filtering at build time also protects search/sitemap. */
export interface PostRecord {
  id: string;
  data: { date: Date; draft: boolean; channel?: 'writing' | 'daily'; daily?: { issueDate: string } };
}

export function isPublicPost(post: PostRecord, now = new Date()): boolean {
  return !post.data.draft && post.data.date.getTime() <= now.getTime();
}

export function newestFirst(a: PostRecord, b: PostRecord): number {
  return b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id);
}

export function isDaily(post: PostRecord): boolean {
  return post.data.channel === 'daily';
}

export function dailyNewestFirst(a: PostRecord, b: PostRecord): number {
  return (b.data.daily?.issueDate ?? '').localeCompare(a.data.daily?.issueDate ?? '') || newestFirst(a, b);
}

export function dailySlug(issueDate: string): string {
  return `${issueDate}-ai-daily`;
}

/** Drafts count too: a rerun must update its existing issue, never create a second one. */
export function validateDailyIdentities(posts: PostRecord[]): void {
  const seen = new Set<string>();
  for (const post of posts.filter(isDaily)) {
    const issueDate = post.data.daily?.issueDate;
    const locale = post.id.split('/')[0];
    const key = `${locale}/${issueDate}`;
    if (!issueDate || post.id !== `${locale}/${dailySlug(issueDate)}` || seen.has(key)) {
      throw new Error(`Invalid or duplicate daily issue identity: ${post.id}`);
    }
    seen.add(key);
  }
}

export const DAILY_PAGE_SIZE = 14;
export function archivePageNumbers(count: number): number[] {
  return Array.from({ length: Math.max(1, Math.ceil(count / DAILY_PAGE_SIZE)) }, (_, i) => i + 1);
}
export function archiveSlice<T>(entries: T[], page: number): T[] {
  return entries.slice((page - 1) * DAILY_PAGE_SIZE, page * DAILY_PAGE_SIZE);
}
