/**
 * Progressive-enhancement layer for article pages only.
 * Zero dependencies. Everything here is decorative — if JS does not run,
 * all content is already visible. Users preferring reduced motion get the
 * reading-progress bar, TOC scroll-spy and ScrollStory state cues
 * (information) but no entrance animation, parallax, or count-up.
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

  /* ---------- hero entrance ---------- */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero && !reduceMotion) {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('hero-play')));
  }

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

  /* ---------- headline stat count-up (motion only) ---------- */
  // Scoped to Stat cells: any other [data-count] (e.g. a structural
  // attribute) must never have its textContent replaced by the count-up.
  const counters = Array.from(
    article.querySelectorAll<HTMLElement>('.stat-num [data-count]')
  );
  if (!reduceMotion && counters.length > 0) {
    const fmt = (el: HTMLElement, v: number) => {
      const d = Number(el.dataset.decimals ?? 0);
      const n = v.toLocaleString('en-US', {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });
      return `${el.dataset.prefix ?? ''}${n}${el.dataset.suffix ?? ''}`;
    };

    const runCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.count ?? 0);
      const start = performance.now();
      const dur = 1300;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(el, target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(el, target);
      };
      requestAnimationFrame(tick);
    };

    const cio = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runCounter(entry.target as HTMLElement);
            cio.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- ScrollStory: pinned visual stage ---------- */
  article.querySelectorAll<HTMLElement>('[data-scrollstory]').forEach((story) => {
    const visual = story.querySelector<HTMLElement>('[data-ss-visual]');
    const visualCol = story.querySelector<HTMLElement>('.ss-visual-col');
    const panels = Array.from(
      story.querySelectorAll<HTMLElement>('[data-story-step]')
    );
    const frames = visual
      ? Array.from(visual.querySelectorAll<HTMLElement>('[data-ss-node]'))
      : [];
    if (frames.length === 0 || panels.length === 0) return;

    story.dataset.ready = 'true';

    // On narrow screens relocate each frame into its own panel so visuals
    // and text interleave in document order; on wide screens the frames
    // return to the pinned stage where only the active one is visible.
    const mq = window.matchMedia('(max-width: 899px)');
    const relocate = (mobile: boolean) => {
      frames.forEach((frame, i) => {
        if (mobile) panels[i]?.prepend(frame);
        else visual?.append(frame);
      });
      if (visualCol) visualCol.hidden = mobile;
    };
    relocate(mq.matches);
    mq.addEventListener?.('change', (e: MediaQueryListEvent) => relocate(e.matches));

    const setActive = (index: number) => {
      story.dataset.active = String(index);
      frames.forEach((frame, i) => {
        frame.classList.toggle('is-active', i === index);
        frame.classList.toggle('is-done', i < index);
      });
      panels.forEach((panel, i) =>
        panel.classList.toggle('is-active', i === index)
      );
    };
    setActive(0);

    const sio = new IntersectionObserver(
      (entries) => {
        let best: { i: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.storyStep);
            if (!best || entry.intersectionRatio > best.ratio) best = { i, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActive(best.i);
      },
      { threshold: [0, 0.1, 0.25], rootMargin: '-45% 0px -45% 0px' }
    );
    panels.forEach((panel) => sio.observe(panel));
  });

  /* ---------- hero parallax (motion only, rAF-throttled) ---------- */
  const heroVisual = article.querySelector<HTMLElement>('[data-hero-visual]');
  if (heroVisual && !reduceMotion) {
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = Math.min(window.scrollY, 480);
      heroVisual.style.setProperty('--hero-py', `${Math.round(y * 0.07)}px`);
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(apply);
        }
      },
      { passive: true }
    );
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
