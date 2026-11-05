/**
 * Hover preview cards for internal post links inside articles.
 * On hover/focus (fine pointers), a small glass card shows the target
 * post's title, date, and excerpt from the build-time link index embedded
 * on post pages. Dismissible on leave, scroll, or Esc.
 */

export {};

interface LinkMeta {
  title: string;
  date: string;
  excerpt: string;
}

const OPEN_DELAY = 300;
const CLOSE_DELAY = 180;

let card: HTMLElement | null = null;
let index: Record<string, LinkMeta> = {};
let openTimer = 0;
let closeTimer = 0;
let currentLink: HTMLAnchorElement | null = null;

function readIndex(): void {
  const node = document.querySelector<HTMLScriptElement>('script[data-link-index]');
  if (!node?.textContent) {
    index = {};
    return;
  }
  try {
    index = JSON.parse(node.textContent) as Record<string, LinkMeta>;
  } catch {
    index = {};
  }
}

function isPreviewable(link: HTMLAnchorElement): boolean {
  if (link.dataset.noPreview !== undefined) return false;
  if (link.querySelector('img, svg')) return false;
  const article = link.closest('[data-article]');
  return !!article && link.pathname in index;
}

function clearTimers(): void {
  window.clearTimeout(openTimer);
  window.clearTimeout(closeTimer);
}

function hideCard(): void {
  if (!card) return;
  card.classList.remove('is-in');
  const old = card;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => old.remove(), reduce ? 0 : 160);
  card = null;
  currentLink = null;
}

function position(link: HTMLAnchorElement): void {
  if (!card) return;
  const rect = link.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const margin = 12;
  let left = rect.left + rect.width / 2 - cardRect.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - cardRect.width - margin));
  let top = rect.bottom + 8;
  if (top + cardRect.height > window.innerHeight - margin) {
    top = rect.top - cardRect.height - 8;
  }
  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(Math.max(margin, top))}px`;
}

function showCard(link: HTMLAnchorElement): void {
  const meta = index[link.pathname];
  if (!meta) return;
  if (card && currentLink === link) return;
  hideCard();
  currentLink = link;

  const el = document.createElement('a');
  el.className = 'lp-card';
  el.href = link.pathname + link.search + link.hash;
  const date = document.createElement('p');
  date.className = 'lp-date';
  date.textContent = meta.date;
  const title = document.createElement('p');
  title.className = 'lp-title';
  title.textContent = meta.title;
  el.append(date, title);
  if (meta.excerpt) {
    const excerpt = document.createElement('p');
    excerpt.className = 'lp-excerpt';
    excerpt.textContent = meta.excerpt;
    el.appendChild(excerpt);
  }
  el.addEventListener('mouseenter', () => window.clearTimeout(closeTimer));
  el.addEventListener('mouseleave', scheduleClose);
  document.body.appendChild(el);
  card = el;
  position(link);
  requestAnimationFrame(() => el.classList.add('is-in'));
}

function scheduleOpen(link: HTMLAnchorElement): void {
  clearTimers();
  openTimer = window.setTimeout(() => showCard(link), OPEN_DELAY);
}

function scheduleClose(): void {
  clearTimers();
  closeTimer = window.setTimeout(hideCard, CLOSE_DELAY);
}

function onOver(event: MouseEvent): void {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const link = (event.target as Element | null)?.closest?.('a');
  if (link instanceof HTMLAnchorElement && isPreviewable(link)) {
    scheduleOpen(link);
  }
}

function onOut(event: MouseEvent): void {
  const related = event.relatedTarget as Element | null;
  if (related instanceof Element && (card?.contains(related) || currentLink?.contains(related))) return;
  if (currentLink) scheduleClose();
}

function onFocusIn(event: FocusEvent): void {
  const link = event.target;
  if (link instanceof HTMLAnchorElement && isPreviewable(link)) {
    clearTimers();
    showCard(link);
  }
}

function initLinkPreview(): void {
  readIndex();
  if (!document.querySelector('script[data-link-index]')) hideCard();
}

document.addEventListener('astro:page-load', initLinkPreview);
document.addEventListener('mouseover', onOver);
document.addEventListener('mouseout', onOut);
document.addEventListener('focusin', onFocusIn);
document.addEventListener('focusout', () => {
  window.setTimeout(() => {
    if (!card?.matches(':focus-within')) hideCard();
  }, 0);
});
document.addEventListener('scroll', hideCard, { passive: true });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideCard();
});
