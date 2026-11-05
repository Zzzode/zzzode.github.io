/**
 * /posts topic filter — segmented control that filters the entry list in
 * place with a sliding active indicator. Progressive enhancement: the
 * control ships hidden and is revealed only by this script, so no-JS gets
 * the complete list with no dead buttons.
 *
 * DOM contract (SSR renders everything):
 *   [data-post-filter]            container
 *     [data-filter-track]         relative button row
 *       [data-filter-indicator]   sliding pill
 *       button[data-filter-key]   "all" or a topic key (aria-pressed)
 *   [data-filter-list]            the <ul> of entries
 *     li[data-topic="…"]          entries; missing attribute = ungrouped
 *   [data-filter-count]           visible-count label (data-unit template)
 */

function initPostFilter(): void {
  const root = document.querySelector<HTMLElement>('[data-post-filter]');
  if (!root) return;

  const track = root.querySelector<HTMLElement>('[data-filter-track]');
  const indicator = root.querySelector<HTMLElement>('[data-filter-indicator]');
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter-key]'));
  const list = document.querySelector<HTMLElement>('[data-filter-list]');
  const count = document.querySelector<HTMLElement>('[data-filter-count]');
  if (!track || !indicator || buttons.length === 0 || !list) return;

  const items = Array.from(list.querySelectorAll<HTMLElement>('li[data-topic]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-filter');

  // Reveal the enhanced control.
  root.hidden = false;

  const total = items.length;
  let current = 'all';

  const formatCount = (n: number): string => {
    const unit = count?.dataset.unit ?? '';
    return `${n} ${unit}`.trim();
  };

  const moveIndicator = (button: HTMLElement): void => {
    const trackRect = track.getBoundingClientRect();
    const rect = button.getBoundingClientRect();
    indicator.hidden = false;
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${Math.round(rect.left - trackRect.left)}px)`;
  };

  const apply = (key: string, animate: boolean): void => {
    current = key;
    let visible = 0;

    items.forEach((item, i) => {
      const show = key === 'all' || item.dataset.topic === key;
      if (show) {
        visible += 1;
        item.dataset.state = 'show';
        item.style.transitionDelay = animate && !reduceMotion ? `${Math.min(i, 8) * 28}ms` : '0ms';
      } else {
        item.dataset.state = 'hide';
        item.style.transitionDelay = '0ms';
      }
    });

    list.classList.toggle('is-engaged', animate);
    buttons.forEach((button) => {
      const active = button.dataset.filterKey === key;
      button.setAttribute('aria-pressed', String(active));
      if (active) moveIndicator(button);
    });
    if (count) count.textContent = formatCount(key === 'all' ? total : visible);
  };

  track.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-filter-key]');
    if (!button || button.dataset.filterKey === current) return;
    apply(button.dataset.filterKey ?? 'all', true);
  });

  // Keep the indicator aligned across fonts loading, resize, and View
  // Transition re-layouts.
  const activeButton = () =>
    buttons.find((b) => b.dataset.filterKey === current) ?? buttons[0];

  const ro = new ResizeObserver(() => moveIndicator(activeButton()));
  ro.observe(track);
  if (document.fonts) void document.fonts.ready.then(() => moveIndicator(activeButton()));

  apply('all', false);
  if (reduceMotion) indicator.style.transition = 'none';
}

document.addEventListener('astro:page-load', initPostFilter);
