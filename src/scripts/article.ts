/**
 * Progressive-enhancement layer for article pages only.
 * Zero dependencies. Everything here is decorative — if JS does not run,
 * all content is already visible. Users preferring reduced motion get the
 * reading-progress bar and TOC scroll-spy (information) but no motion.
 */

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function init() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const article = document.querySelector<HTMLElement>('[data-article]');
  if (!article) return;

  /* ---------- reading progress bar ---------- */
  const bar = document.createElement('div');
  bar.setAttribute('data-progress', '');
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* ---------- reveal on scroll (motion only) ---------- */
  if (!reduceMotion) {
    document.documentElement.classList.add('motion-ok');
    const revealables = () =>
      article.querySelectorAll<HTMLElement>('.reveal, .article-prose, .prose img');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealables().forEach((el) => {
      el.classList.add('reveal-pending');
      io.observe(el);
    });
  }

  /* ---------- table of contents with scroll-spy ---------- */
  const tocHost = document.querySelector<HTMLElement>('[data-toc]');
  const headings = Array.from(
    article.querySelectorAll<HTMLElement>('h2[id], h3[id], section[id], [data-toc-anchor]')
  )
    .map((el) => {
      const heading =
        el.tagName === 'H2' || el.tagName === 'H3'
          ? (el as HTMLElement)
          : (el.querySelector<HTMLElement>('h2, h3') ?? null);
      if (!heading) return null;
      return {
        id: el.id || heading.id,
        text: heading.textContent?.trim() ?? '',
        level: heading.tagName === 'H3' ? 3 : 2,
      } satisfies TocItem;
    })
    .filter((x): x is TocItem => x !== null && Boolean(x.id));

  if (tocHost && headings.length >= 2) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'On this page');
    nav.className = 'toc-nav';
    nav.innerHTML =
      '<p class="toc-title">ON THIS PAGE</p>' +
      '<ul>' +
      headings
        .map(
          (h) =>
            `<li class="toc-l${h.level}"><a href="#${h.id}" data-target="${h.id}">${h.text}</a></li>`
        )
        .join('') +
      '</ul>';
    tocHost.appendChild(nav);

    const linkFor = new Map<string, HTMLAnchorElement>();
    nav.querySelectorAll<HTMLAnchorElement>('a[data-target]').forEach((a) =>
      linkFor.set(a.dataset.target ?? '', a)
    );

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            linkFor.forEach((a) => a.classList.remove('is-active'));
            const active = linkFor.get(entry.target.id);
            active?.classList.add('is-active');
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) spy.observe(el);
    });

    if (reduceMotion) {
      nav.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', (e) => {
          e.preventDefault();
          document
            .getElementById((a as HTMLAnchorElement).dataset.target ?? '')
            ?.scrollIntoView();
        })
      );
    }
  }
}

init();
