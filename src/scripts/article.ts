/**
 * Progressive-enhancement layer for article pages only.
 * Zero dependencies. Everything here is decorative — if JS does not run,
 * all content is already visible. Users preferring reduced motion get the
 * reading-progress bar, TOC scroll-spy but no entrance animation, parallax, or count-up.
 */

type TocItem = {
  id: string;
  text: string;
  label: string;
  level: number;
  index: string;
};

/**
 * Progressive-enhancement layer for article pages only.
 * Zero dependencies. Everything here is decorative — if JS does not run,
 * all content is already visible. Users preferring reduced motion get the
 * reading-progress bar, TOC scroll-spy but no entrance animation, parallax,
 * or count-up.
 *
 * Re-entrant: ClientRouter swaps the document without reloading, and Astro
 * dedupes this bundle across post pages, so init() is driven by
 * astro:page-load and every registration is reverted by the returned
 * teardown before the next page initializes.
 */

type Teardown = () => void;

function init(): Teardown | undefined {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const article = document.querySelector<HTMLElement>('[data-article]');
  if (!article) return undefined;

  // Cleanup registry — every listener/observer/node created below is
  // reverted here so a second post reached via View Transition starts clean.
  const controller = new AbortController();
  const { signal } = controller;
  const observers: IntersectionObserver[] = [];
  const appended: HTMLElement[] = [];
  const addedClasses: [Element, string][] = [];
  const addClass = (el: Element, cls: string): void => {
    el.classList.add(cls);
    addedClasses.push([el, cls]);
  };

  /* ---------- reading progress bar ---------- */
  const bar = document.createElement('div');
  bar.setAttribute('data-progress', '');
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  appended.push(bar);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true, signal });
  window.addEventListener('resize', updateProgress, { signal });
  updateProgress();

  /* ---------- hero entrance ---------- */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero && !reduceMotion) {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('hero-play')));
  }

  /* ---------- reveal on scroll (motion only) ---------- */
  if (!reduceMotion) {
    addClass(document.documentElement, 'motion-ok');
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
      // threshold 0 (not a percentage): a section taller than the viewport
      // can never expose 8% of itself inside the viewport, so a ratio
      // threshold would leave it permanently invisible. The -8% bottom
      // rootMargin already keeps reveals from firing too early.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );
    revealables().forEach((el) => {
      el.classList.add('reveal-pending');
      io.observe(el);
    });
    observers.push(io);
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
        else el.textContent = el.dataset.final ?? fmt(el, target);
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
    observers.push(cio);
  }

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
      { passive: true, signal }
    );
  }

  /* ---------- table of contents with scroll-spy ---------- */
  const tocHost = document.querySelector<HTMLElement>('[data-toc]');
  // Defensive: a same-document re-init (initial astro:page-load racing the
  // module-eval boot) must never stack a second TOC into a persistent host.
  tocHost?.replaceChildren();
  // The SVG lens is only applied on engines that accept url() in
  // backdrop-filter; elsewhere the CSS keeps the plain blur fallback.
  if (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('backdrop-filter', 'url(#article-liquid-glass)')
  ) {
    addClass(document.documentElement, 'supports-glass-lens');
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
    // Rail header = the article's own title, fixed outside the scroll area:
    // it keeps the reader oriented in the document ("which article am I in")
    // while the rows answer "where in it". A click returns to the top.
    const articleTitle =
      article.querySelector<HTMLElement>('h1')?.textContent?.trim() ?? '';
    const header = document.createElement('div');
    header.className = 'toc-head';
    if (articleTitle) {
      const back = document.createElement('a');
      back.className = 'toc-head-title';
      back.href = '#';
      back.textContent = articleTitle;
      back.title = zh ? '回到开头' : 'Back to top';
      back.setAttribute('aria-label', zh ? `${articleTitle}，回到开头` : `${articleTitle}, back to top`);
      header.appendChild(back);
    }
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
    tocHost.append(header, nav);

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

    // Back-to-top via the title: no hash in the URL, clear the active row.
    // While scrolling back, ignore the spy so intermediate chapters don't
    // re-activate; re-arm once the viewport actually reaches the top band.
    let suppressSpy = false;
    const rearmAtTop = () => {
      if (!suppressSpy) return;
      if (window.scrollY <= window.innerHeight * 0.2) suppressSpy = false;
      else requestAnimationFrame(rearmAtTop);
    };
    header.querySelector('.toc-head-title')?.addEventListener('click', (e) => {
      e.preventDefault();
      suppressSpy = true;
      linkFor.forEach((l) => {
        l.classList.remove('is-active');
        l.removeAttribute('aria-current');
      });
      nav.scrollTop = 0;
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      rearmAtTop();
    }, { signal });

    const spy = new IntersectionObserver(
      (entries) => {
        if (suppressSpy) return;
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
    observers.push(spy);

    // A click (or keyboard Enter) jumps to a chapter that may already sit
    // inside the spy band, so the observer might not refire — mark now.
    nav.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[data-target]');
      if (a) mark(linkFor.get(a.dataset.target ?? ''));
    }, { signal });
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
    }, { signal });

    // Re-clamp when Tab lands on a row the UA parked inside a fade band.
    nav.addEventListener('focusin', (e) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a');
      if (a) revealInNav(a);
    }, { signal });

    // When the rail appears at the wide breakpoint, re-reveal the active
    // row (rects were zero while display:none, so its clamp never ran).
    const wideMq = window.matchMedia('(min-width: 1600px)');
    wideMq.addEventListener?.('change', (ev: MediaQueryListEvent) => {
      if (!ev.matches) return;
      const current = nav.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
      if (current) revealInNav(current);
    }, { signal } as AddEventListenerOptions);

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

  return () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    appended.forEach((el) => el.remove());
    addedClasses.forEach(([el, cls]) => el.classList.remove(cls));
  };
}

/* ClientRouter keeps this module alive across page swaps but replaces the
   DOM, so (re)initialize on every astro:page-load after tearing down the
   previous article's listeners, observers, and injected nodes. */
let teardown: Teardown | undefined;
const boot = (): void => {
  teardown?.();
  teardown = init();
};
// Module-eval boot covers the initial document (the router's first
// astro:page-load can already have dispatched by now); subsequent
// events reinitialize after View Transition DOM swaps. boot() is
// idempotent — every init() first runs the previous teardown.
boot();
document.addEventListener('astro:page-load', boot);
