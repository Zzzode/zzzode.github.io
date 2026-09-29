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
    'home.titleA': '工程、研究',
    'home.titleB': '与笔记。',
    'home.lead': '这里是 Zzzode 的博客：技术实践、研究笔记，以及偶尔的演讲与教学。',
    'home.viewWriting': '浏览全部文章',
    'home.viewAbout': '关于我',
    'home.viewCv': '查看 CV',
    'home.allWriting': '全部文章',
    'home.read': '阅读文章',
    'home.more': '更多内容',
    'home.latest.empty': '还没有文章。第一篇很快就会出现在这里。',
    'home.featured': '本期主打',
    'home.picks': '精选',
    'home.latest': '最新文章',
    'home.archive': '完整档案',
    'home.topics': '按主题读',
    'home.topics.sub': '四条阅读主线，从智能体基础设施到产业现场',
    'home.topic.unit': '篇',
    'home.meta.eyebrow': '档案',
    'home.meta.words': '篇深度文章',
    'home.meta.threads': '条主线',
    'home.meta.sources': '个公开一手来源',
    'home.meta.private': '无 Cookie，无追踪',
    'topic.agents': '智能体与基础设施',
    'topic.agents.desc': '智能体外壳、沙箱、训练与多智能体协作',
    'topic.models': '模型与训练',
    'topic.models.desc': '决策模型、强化学习与扩散语言模型',
    'topic.languages': '语言与编译器',
    'topic.languages.desc': '类型系统、序列化、查询系统与运行时',
    'topic.industry': '产业与现场',
    'topic.industry.desc': '供应链核实、出口政策与组织结构',

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
    'post.untranslated': '本文暂无英文版。',
    'post.minutes': '分钟阅读',
    'post.updated': '更新于 ',
    'post.adjacent': '上一篇 / 下一篇',
    'post.newer': '更新的一篇',
    'post.older': '更早的一篇',

    'tags.eyebrow': 'TAGS',
    'tags.title': '标签',
    'tags.lead': '按标签浏览全部文章。',
    'tags.count': '篇',
    'tags.back': '所有标签',
    'tags.empty': '这个标签下暂时没有文章。',
    'tags.none': '还没有标签。',
    'tags.browse': '按标签浏览',

    'nav.projects': '作品',
    'nav.about': '关于',
    'nav.search': '搜索',
    'section.projects': '作品集',
    'section.projects.eyebrow': 'PROJECTS',
    'section.projects.lead': '一个编译器工程师的工作台：语言、运行时，以及夹在两者之间的那层。',
    'section.projects.empty': '还没有项目，新的作品会出现在这里。',

    'search.eyebrow': 'SEARCH',
    'search.title': '搜索',
    'search.lead': '全文检索全部文章与项目，索引在本地完成，不经过任何服务器。',
    'search.placeholder': '搜索文章与项目…',
    'search.label': '搜索',
    'search.clear': '清除',
    'search.loadMore': '加载更多结果',
    'search.zero': '没有找到与 [SEARCH_TERM] 相关的内容',
    'search.one': '[SEARCH_TERM]：1 条结果',
    'search.many': '[SEARCH_TERM]：[COUNT] 条结果',
    'search.loading': '正在加载搜索索引…',
    'search.unavailable': '搜索索引暂不可用，请先运行 npm run build 与 pagefind 索引。',
    'search.archive': '浏览全部文章',

    'about.eyebrow': 'IDENTITY',
    'about.title': '关于',
    'about.statement': '用编译器的纪律，做语言、虚拟机，和智能体的运行时。',
    'about.subline': 'Zzzode —— 编译器工程师、虚拟机构建者。',
    'about.term.building': 'AHFL —— 面向可审计智能体工作流的类型化 DSL 与 C++23 编译器',
    'about.term.numbers': '8 个公开仓库 · 17 章语言规范 · 900+ 编译器测试',
    'about.exploring': '正在探索',
    'about.exploring.body': '编译器优化、程序语言理论与底层性能策略。',
    'about.talk': '聊聊',
    'about.talk.body': 'C++、WebAssembly、编程语言、编译器与虚拟机。',
    'about.beyond': '写代码之外',
    'about.beyond.body': '猫，和 Steam 上的 PC 游戏。',
    'about.github': 'GitHub',
    'about.wakatime': 'WakaTime',
    'about.steam': 'Steam',
    'about.more': '看文章',
    'about.more.projects': '看作品',

    'projects.selected': '精选项目',
    'projects.status.active': '进行中',
    'projects.status.archived': '已归档',
    'projects.status.experiment': '实验',
    'projects.source': '源码',
    'projects.allgithub': '更多仓库在 GitHub',
    'projects.site': '本网站本身也开源',
    'projects.site.stack': 'Astro · Tailwind CSS v4 · 框架页零 JavaScript',
    'projectgroup.languages': '语言与运行时',
    'projectgroup.decisions': '决策系统',
    'projectgroup.tools': '平台工具',

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
    'home.titleA': 'Engineering,',
    'home.titleB': ' research, notes.',
    'home.lead':
      "Zzzode's blog — engineering practice, research notes, and the occasional talk or course.",
    'home.viewWriting': 'Browse all writing',
    'home.viewAbout': 'About me',
    'home.viewCv': 'View CV',
    'home.allWriting': 'All writing',
    'home.read': 'Read post',
    'home.more': 'More',
    'home.latest.empty': 'No posts yet — the first one is on its way.',
    'home.featured': 'Featured',
    'home.picks': "Editor's picks",
    'home.latest': 'Latest',
    'home.archive': 'Full archive',
    'home.topics': 'Read by topic',
    'home.topics.sub': 'Four curated threads, from agent infrastructure to the field',
    'home.topic.unit': 'articles',
    'home.meta.eyebrow': 'The archive',
    'home.meta.words': 'long-form articles',
    'home.meta.threads': 'threads',
    'home.meta.sources': 'public primary sources',
    'home.meta.private': 'no cookies, no tracking',
    'topic.agents': 'Agents & infrastructure',
    'topic.agents.desc': 'Agent harnesses, sandboxes, training and multi-agent systems',
    'topic.models': 'Models & training',
    'topic.models.desc': 'Decision models, reinforcement learning and diffusion LMs',
    'topic.languages': 'Languages & compilers',
    'topic.languages.desc': 'Type systems, serialization, query systems and runtimes',
    'topic.industry': 'Industry & field notes',
    'topic.industry.desc': 'Supply-chain verification, export policy and org structure',

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
    'post.untranslated': 'No English version of this post yet.',
    'post.minutes': 'min read',
    'post.updated': 'Updated ',
    'post.adjacent': 'Previous / next post',
    'post.newer': 'Newer',
    'post.older': 'Older',

    'tags.eyebrow': 'TAGS',
    'tags.title': 'Tags',
    'tags.lead': 'Browse every post by tag.',
    'tags.count': 'posts',
    'tags.back': 'All tags',
    'tags.empty': 'Nothing filed under this tag yet.',
    'tags.none': 'No tags yet.',
    'tags.browse': 'Browse by tag',

    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.search': 'Search',
    'section.projects': 'Projects',
    'section.projects.eyebrow': 'PROJECTS',
    'section.projects.lead':
      "A compiler engineer's workbench: languages, runtimes, and the layer in between.",
    'section.projects.empty': 'Nothing here yet — new projects will appear on this page.',
    'search.eyebrow': 'SEARCH',
    'search.title': 'Search',
    'search.lead': 'Full-text search across every post and project. The index runs entirely in your browser.',
    'search.placeholder': 'Search posts and projects…',
    'search.label': 'Search',
    'search.clear': 'Clear',
    'search.loadMore': 'Load more results',
    'search.zero': 'No results for [SEARCH_TERM]',
    'search.one': '1 result for [SEARCH_TERM]',
    'search.many': '[COUNT] results for [SEARCH_TERM]',
    'search.loading': 'Loading the search index…',
    'search.unavailable': 'The search index is unavailable. Build the site and run the pagefind index step first.',
    'search.archive': 'Browse all posts',

    'about.eyebrow': 'IDENTITY',
    'about.title': 'About',
    'about.statement':
      'Languages, virtual machines, and the runtimes underneath agents — built with compiler discipline.',
    'about.subline': 'Zzzode — compiler engineer and virtual-machine builder.',
    'about.term.building':
      'AHFL — a typed DSL and C++23 compiler for auditable agent workflows',
    'about.term.numbers': '8 public repos · a 17-chapter language spec · 900+ compiler tests',
    'about.exploring': 'Exploring',
    'about.exploring.body': 'Compiler optimizations, programming-language theory and low-level performance strategy.',
    'about.talk': "Let's talk",
    'about.talk.body': 'C++, WebAssembly, programming languages, compilers and virtual machines.',
    'about.beyond': 'Beyond coding',
    'about.beyond.body': 'Cats and PC gaming on Steam.',
    'about.github': 'GitHub',
    'about.wakatime': 'WakaTime',
    'about.steam': 'Steam',
    'about.more': 'Read writing',
    'about.more.projects': 'See projects',

    'projects.selected': 'Selected work',
    'projects.status.active': 'Active',
    'projects.status.archived': 'Archived',
    'projects.status.experiment': 'Experiment',
    'projects.source': 'Source',
    'projects.allgithub': 'More repositories on GitHub',
    'projects.site': 'This website is open source too',
    'projects.site.stack': 'Astro · Tailwind CSS v4 · zero JavaScript on framework pages',
    'projectgroup.languages': 'Languages & runtimes',
    'projectgroup.decisions': 'Decision systems',
    'projectgroup.tools': 'Platform tools',

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
