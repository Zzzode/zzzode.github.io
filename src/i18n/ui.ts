/**
 * Site i18n.
 *
 * - `zh` is the default locale and is served from the site root.
 * - `en` is served from the `/en` prefix (see the i18n config in astro.config.mjs).
 * - UI strings live ONLY in this file. Components/pages call `t(lang, key)`.
 * - Content entries live in `src/content/<collection>/{zh,en}/`; a file with
 *   the same name in both folders is a translation pair.
 */

export const languages = {
  zh: '中文',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';
export const otherLang: Record<Lang, Lang> = { zh: 'en', en: 'zh' };

/** Derive the locale from a URL pathname (anything not under /en is zh). */
export function getLangFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

/** Pathname of the same page in the other locale. */
export function switchLocalePath(pathname: string, lang: Lang): string {
  if (lang === 'zh') {
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

const dict = {
  zh: {
    'site.description': 'Zzzode 的个人网站：论文、演讲、教学与文章。',

    'nav.publications': '论文',
    'nav.talks': '演讲',
    'nav.teaching': '教学',
    'nav.posts': '文章',
    'nav.cv': 'CV',
    'nav.menu': '打开菜单',

    'home.eyebrow': '研究 · 工程 · 笔记',
    'home.title': '工程、研究与笔记。',
    'home.lead': '这里是 Zzzode 的博客：技术实践、研究笔记，以及偶尔的演讲与教学。',
    'home.viewWriting': '浏览全部文章',
    'home.viewCv': '查看 CV',
    'home.latest': '最新文章',
    'home.allWriting': '全部文章',
    'home.read': '阅读文章',
    'home.more': '更多内容',
    'home.latest.empty': '还没有文章。第一篇很快就会出现在这里。',

    'section.publications': '论文',
    'section.publications.eyebrow': 'PUBLICATIONS',
    'section.publications.lead': '研究论文与出版物，按时间倒序排列。',
    'section.publications.empty': '还没有内容，新的论文会出现在这里。',
    'section.talks': '演讲',
    'section.talks.eyebrow': 'TALKS',
    'section.talks.lead': '在会议、社区与内部场合的演讲和教程，按时间倒序排列。',
    'section.talks.empty': '还没有内容，新的演讲会出现在这里。',
    'section.teaching': '教学',
    'section.teaching.eyebrow': 'TEACHING',
    'section.teaching.lead': '课程、助教与教学相关经历。',
    'section.teaching.empty': '还没有内容，新的教学经历会出现在这里。',
    'section.posts': '文章',
    'section.posts.eyebrow': 'WRITING',
    'section.posts.lead': '技术文章、研究笔记与工程实践。',
    'section.posts.empty': '还没有内容，新的文章会出现在这里。',

    'card.item': '项内容',
    'card.items': '项内容',
    'card.none': '暂无内容',

    'talk.keynote': '主旨演讲',
    'talk.talk': '演讲',
    'talk.tutorial': '教程',
    'talk.poster': '海报',

    'post.rssDescription': 'Zzzode 的技术文章与笔记。',

    'cv.eyebrow': 'CURRICULUM VITAE',
    'cv.intro': '联系方式与详细履历待补充。',
    'cv.education': '教育经历',
    'cv.experience': '工作经历',
    'cv.teaching': '教学',
    'cv.service': '学术服务',
    'cv.placeholder': '待补充。',

    'error.eyebrow': '404',
    'error.title': '页面不存在',
    'error.body': '你访问的页面可能已被移动或删除。',
    'error.back': '返回首页',

    'footer.github': 'GitHub',
    'footer.rss': 'RSS',
    'footer.built': '由 Astro 构建',
  },
  en: {
    'site.description': "Zzzode's personal website: publications, talks, teaching and writing.",

    'nav.publications': 'Publications',
    'nav.talks': 'Talks',
    'nav.teaching': 'Teaching',
    'nav.posts': 'Writing',
    'nav.cv': 'CV',
    'nav.menu': 'Open menu',

    'home.eyebrow': 'RESEARCH · ENGINEERING · NOTES',
    'home.title': 'Engineering, research, notes.',
    'home.lead':
      "Zzzode's blog — engineering practice, research notes, and the occasional talk or course.",
    'home.viewWriting': 'Browse all writing',
    'home.viewCv': 'View CV',
    'home.latest': 'Latest writing',
    'home.allWriting': 'All writing',
    'home.read': 'Read post',
    'home.more': 'More',
    'home.latest.empty': 'No posts yet — the first one is on its way.',

    'section.publications': 'Publications',
    'section.publications.eyebrow': 'PUBLICATIONS',
    'section.publications.lead': 'Research papers and publications, newest first.',
    'section.publications.empty': 'Nothing here yet — new publications will appear on this page.',
    'section.talks': 'Talks',
    'section.talks.eyebrow': 'TALKS',
    'section.talks.lead': 'Conference, community and internal talks and tutorials, newest first.',
    'section.talks.empty': 'Nothing here yet — new talks will appear on this page.',
    'section.teaching': 'Teaching',
    'section.teaching.eyebrow': 'TEACHING',
    'section.teaching.lead': 'Courses, teaching assistantships and related experience.',
    'section.teaching.empty': 'Nothing here yet — teaching experience will appear on this page.',
    'section.posts': 'Writing',
    'section.posts.eyebrow': 'WRITING',
    'section.posts.lead': 'Technical articles, research notes and engineering practice.',
    'section.posts.empty': 'Nothing here yet — new posts will appear on this page.',

    'card.item': 'item',
    'card.items': 'items',
    'card.none': 'Nothing yet',

    'talk.keynote': 'Keynote',
    'talk.talk': 'Talk',
    'talk.tutorial': 'Tutorial',
    'talk.poster': 'Poster',

    'post.rssDescription': 'Technical articles and notes by Zzzode.',

    'cv.eyebrow': 'CURRICULUM VITAE',
    'cv.intro': 'Contact details and full CV to be added.',
    'cv.education': 'Education',
    'cv.experience': 'Experience',
    'cv.teaching': 'Teaching',
    'cv.service': 'Academic service',
    'cv.placeholder': 'To be added.',

    'error.eyebrow': '404',
    'error.title': 'Page not found',
    'error.body': 'The page you were looking for may have been moved or deleted.',
    'error.back': 'Back to home',

    'footer.github': 'GitHub',
    'footer.rss': 'RSS',
    'footer.built': 'Built with Astro',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type MessageKey = keyof (typeof dict)['zh'];

export function t(lang: Lang, key: MessageKey | string): string {
  const table = dict[lang] as Record<string, string>;
  const fallback = dict[defaultLang] as Record<string, string>;
  return table[key] ?? fallback[key] ?? key;
}
