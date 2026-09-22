import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { t } from '../i18n/ui';
import { localeOfId, slugOfId } from './content';

export async function buildFeed(context: APIContext, lang: Lang) {
  const all = await getCollection('posts', ({ data }) => !data.draft);
  const posts = all
    .filter((entry) => localeOfId(entry.id) === lang)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const prefix = lang === 'en' ? '/en' : '';

  return rss({
    title: 'Zzzode',
    description: t(lang, 'post.rssDescription'),
    site: context.site ?? 'https://zzzode.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt ?? '',
      link: `${prefix}/posts/${slugOfId(post.id)}/`,
    })),
    customData: `<language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>`,
  });
}
