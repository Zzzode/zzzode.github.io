/**
 * Figure lightbox for post diagrams.
 * Clicking a substantial inline SVG or a prose image inside an article
 * opens it enlarged in a frosted overlay (Esc / scrim click to close).
 * Progressive enhancement: figures remain plain content without JS.
 */

export {};

const MIN_SVG_SIZE = 200;

interface Lightbox {
  scrim: HTMLElement;
  panel: HTMLElement;
  close: () => void;
}

let active: Lightbox | null = null;

function eligible(target: Element | null): Element | null {
  if (!target) return null;
  const article = target.closest('[data-article]');
  if (!article) return null;

  const img = target.closest('img');
  if (img && article.contains(img) && img.closest('.prose, .article-prose')) {
    return img;
  }
  const svg = target.closest('svg');
  if (svg && article.contains(svg)) {
    const rect = svg.getBoundingClientRect();
    if (rect.width >= MIN_SVG_SIZE) return svg;
  }
  return null;
}

function closeLightbox(): void {
  if (!active) return;
  const current = active;
  active = null;
  document.documentElement.classList.remove('cmdk-lock');
  current.scrim.classList.remove('is-in');
  current.panel.classList.remove('is-in');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finish = () => current.scrim.remove();
  if (reduce) finish();
  else window.setTimeout(finish, 180);
}

function openLightbox(source: Element): void {
  if (active) closeLightbox();

  const scrim = document.createElement('div');
  scrim.className = 'lb-scrim';
  const panel = document.createElement('div');
  panel.className = 'lb-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', source.getAttribute('aria-label') ?? source.tagName);

  const clone = source.cloneNode(true) as Element;
  clone.classList.add('lb-figure');
  clone.removeAttribute('style');
  if (clone.tagName.toLowerCase() === 'svg') {
    clone.setAttribute('width', '');
    clone.setAttribute('height', '');
  }
  panel.appendChild(clone);
  document.body.appendChild(scrim);
  scrim.appendChild(panel);
  document.documentElement.classList.add('cmdk-lock');

  active = { scrim, panel, close: closeLightbox };
  requestAnimationFrame(() => {
    scrim.classList.add('is-in');
    panel.classList.add('is-in');
  });
}

function onClick(event: MouseEvent): void {
  if (active) {
    if (event.target instanceof Element && event.target.closest('.lb-scrim') && !event.target.closest('.lb-panel')) {
      event.preventDefault();
      closeLightbox();
    }
    return;
  }
  const figure = eligible(event.target as Element | null);
  if (figure) {
    event.preventDefault();
    openLightbox(figure);
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && active) {
    event.preventDefault();
    closeLightbox();
  }
}

function initFigureLightbox(): void {
  document.documentElement.classList.toggle('js-lightbox', !!document.querySelector('[data-article]'));
  if (!document.querySelector('[data-article]')) closeLightbox();
}

document.addEventListener('astro:page-load', initFigureLightbox);
document.addEventListener('click', onClick, true);
document.addEventListener('keydown', onKeydown);
