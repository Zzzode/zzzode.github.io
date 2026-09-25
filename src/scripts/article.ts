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
  label: string;
  level: number;
  index: string;
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
  // The SVG lens is only applied on engines that accept url() in
  // backdrop-filter; elsewhere the CSS keeps the plain blur fallback.
  if (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('backdrop-filter', 'url(#article-liquid-glass)')
  ) {
    document.documentElement.classList.add('supports-glass-lens');
  }
  let chapter = 0;
  const headings = Array.from(
    article.querySelectorAll<HTMLElement>('h2[id], h3[id], section[id], [data-toc-anchor]')
  )
    .map((el) => {
      const heading =
        el.tagName === 'H2' || el.tagName === 'H3'
          ? (el as HTMLElement)
          : (el.querySelector<HTMLElement>('h2, h3') ?? null);
      if (!heading) return null;
      const level = heading.tagName === 'H3' ? 3 : 2;
      if (level === 2) chapter += 1;
      const text = heading.textContent?.trim() ?? '';
      const label = heading.getAttribute('data-toc-label')?.trim() || text;
      // Prefer the authored pill number so rail and page can never desync;
      // a plain heading without it falls back to DOM order.
      const authoredIndex = heading.getAttribute('data-toc-index')?.trim() ?? '';
      return {
        id: el.id || heading.id,
        text,
        label,
        level,
        index: level === 2 ? authoredIndex || String(chapter).padStart(2, '0') : '',
      } satisfies TocItem;
    })
    .filter((x): x is TocItem => x !== null && Boolean(x.id));

  if (tocHost && headings.length >= 2) {
    const zh = document.documentElement.lang.toLowerCase().startsWith('zh');
    // The caption lives OUTSIDE the masked scroll area, so it never fades
    // or scrolls away with the rows.
    const titleP = document.createElement('p');
    titleP.className = 'toc-title';
    titleP.textContent = zh ? '本页内容' : 'ON THIS PAGE';
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', zh ? '本页目录' : 'On this page');
    nav.className = 'toc-nav';
    // Show the chapter-number column only when section heads carry index pills,
    // so the two numbering systems always appear together.
    if (article.querySelector('.section-index')) nav.classList.add('toc-numbered');

    const ul = document.createElement('ul');
    // Build nodes (never innerHTML): author-controlled titles flow through
    // textContent/title, so <, >, & and quotes can't become markup.
    headings.forEach((h) => {
      const li = document.createElement('li');
      li.className = `toc-l${h.level}`;
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.dataset.target = h.id;
      if (h.index) a.dataset.index = h.index;
      const label = document.createElement('span');
      label.className = 'toc-label';
      label.textContent = h.label;
      a.appendChild(label);
      // Tooltip on explicit short labels, and on h3 rows that may ellipsize.
      if (h.label !== h.text || (nav.classList.contains('toc-numbered') && h.level === 3)) {
        a.title = h.text;
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    tocHost.append(titleP, nav);

    const linkFor = new Map<string, HTMLAnchorElement>();
    nav.querySelectorAll<HTMLAnchorElement>('a[data-target]').forEach((a) =>
      linkFor.set(a.dataset.target ?? '', a)
    );

    // Keep the spy-active row visible inside the rail by writing the rail's
    // own scrollTop only — never scrollIntoView, which would scroll the page.
    const PAD_TOP = 10;
    const PAD_BOTTOM = 40;
    const revealInNav = (el: Element) => {
      const nr = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      if (nr.height === 0) return; // rail hidden (narrow viewport)
      let next = nav.scrollTop;
      if (r.top < nr.top + PAD_TOP) next += r.top - (nr.top + PAD_TOP);
      else if (r.bottom > nr.bottom - PAD_BOTTOM) next += r.bottom - (nr.bottom - PAD_BOTTOM);
      const max = nav.scrollHeight - nav.clientHeight;
      nav.scrollTop = Math.max(0, Math.min(max, next));
    };
    const mark = (a?: HTMLAnchorElement | null) => {
      if (!a) return;
      linkFor.forEach((l) => {
        l.classList.remove('is-active');
        l.removeAttribute('aria-current');
      });
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'true');
      // While keyboard focus is moving through the rows (:focus-visible),
      // never yank the rail; a mouse click leaves focus without that state,
      // so spy-follow keeps working after clicking a link.
      const keyboardFocus =
        document.activeElement instanceof Element &&
        document.activeElement.matches(':focus-visible');
      if (!(nav.contains(document.activeElement) && keyboardFocus)) revealInNav(a);
    };

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) mark(linkFor.get(entry.target.id));
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) spy.observe(el);
    });

    // A click (or keyboard Enter) jumps to a chapter that may already sit
    // inside the spy band, so the observer might not refire — mark now.
    nav.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[data-target]');
      if (a) mark(linkFor.get(a.dataset.target ?? ''));
    });
    // Back/forward fragment changes likewise.
    window.addEventListener('hashchange', () => {
      if (!location.hash) return;
      let id = location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // malformed percent escape — use the raw fragment
      }
      mark(linkFor.get(id));
    });

    // Re-clamp when Tab lands on a row the UA parked inside a fade band.
    nav.addEventListener('focusin', (e) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a');
      if (a) revealInNav(a);
    });

    // When the rail appears at the wide breakpoint, re-reveal the active
    // row (rects were zero while display:none, so its clamp never ran).
    const wideMq = window.matchMedia('(min-width: 1600px)');
    wideMq.addEventListener?.('change', (ev: MediaQueryListEvent) => {
      if (!ev.matches) return;
      const current = nav.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
      if (current) revealInNav(current);
    });

    // Deep links load with the active state and aria-current already set.
    if (location.hash) {
      let id = location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // malformed percent escape — fall through with the raw fragment
      }
      mark(linkFor.get(id));
    }
  }
}

init();
