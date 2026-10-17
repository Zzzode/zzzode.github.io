import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { Lang } from '../i18n/ui';
import { t } from '../i18n/ui';
import { getLocalized, slugOfId } from './content';

export async function buildFeed(context: APIContext, lang: Lang) {
  const posts = await getLocalized('posts', lang);

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
