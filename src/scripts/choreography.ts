/**
 * Framework-page choreography — scroll-linked entrances and count-up
 * figures for marketing/list pages (home, …). Progressive enhancement:
 * without this script, or with prefers-reduced-motion, everything renders
 * at its final server state. The `js-reveal` class gates all hidden
 * initial states, so content is never stuck invisible if JS fails.
 *
 * Markup contract:
 *   [data-reveal]            one block that fades/rises into view
 *   [data-reveal-stagger]    direct children cascade inside one parent
 *   [data-count]             integer text content counted up on enter
 *                            (server-rendered final value stays the fallback)
 */

interface CountTarget {
  el: HTMLElement;
  target: number;
  final: string;
}

function initChoreography(): void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches) return;

  const root = document.documentElement;
  root.classList.add('js-reveal');

  /* ---------- scroll reveals ---------- */
  const revealTargets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]')
  );

  if (revealTargets.length > 0) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---------- count-up figures ---------- */
  const counters: CountTarget[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-count]')
  ).map((el) => ({
    el,
    target: Number(el.dataset.count ?? 0),
    final: el.textContent ?? el.dataset.count ?? '0',
  }));

  if (counters.length > 0) {
    const runCounter = ({ el, target, final }: CountTarget): void => {
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number): void => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      requestAnimationFrame(tick);
    };

    const cio = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const hit = counters.find((c) => c.el === entry.target);
          if (hit) {
            runCounter(hit);
            cio.unobserve(hit.el);
          }
        }
      },
      { threshold: 0.4 }
    );
    counters.forEach(({ el }) => cio.observe(el));
  }
}

// astro:page-load fires on initial load and after every View Transition;
// the bundled module persists across transitions, so bind once here.
document.addEventListener('astro:page-load', initChoreography);
