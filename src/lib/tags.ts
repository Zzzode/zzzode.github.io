import type { Lang } from '../i18n/ui';
import { getLocalized, getWritingPosts, slugOfId } from './content';
import type { Entry } from './entries';
import { formatDate } from './format';

/** Count writing tags by default. Include Daily tags when generating legacy tag routes. */
export async function getTags(lang: Lang, { includeDaily = false } = {}): Promise<{ tag: string; count: number }[]> {
  const posts = includeDaily ? await getLocalized('posts', lang) : await getWritingPosts(lang);
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));
}

/** Entries carrying one tag in one locale, newest first. */
export async function getEntriesByTag(lang: Lang, tag: string): Promise<Entry[]> {
  const prefix = lang === 'en' ? '/en' : '';
  const posts = await getWritingPosts(lang);
  return posts
    .filter((post) => post.data.tags.includes(tag))
    .map((post) => ({
      title: post.data.title,
      dateValue: post.data.date,
      meta: formatDate(post.data.date, lang),
      excerpt: post.data.excerpt,
      tags: post.data.tags,
      href: `${prefix}/posts/${slugOfId(post.id)}/`,
    }));
}
