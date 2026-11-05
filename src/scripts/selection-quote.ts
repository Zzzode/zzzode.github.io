/**
 * Selection quote chip on post pages.
 * Selecting article text (fine pointers only) surfaces a small glass
 * pill that copies the quote with its title and a heading-anchored URL.
 * Pure progressive enhancement; nothing runs outside [data-article].
 */

export {};

const MIN_LENGTH = 8;

const labels = {
  get copy() {
    return document.documentElement.lang.startsWith('zh') ? '复制引用' : 'Copy quote';
  },
  get done() {
    return document.documentElement.lang.startsWith('zh') ? '已复制' : 'Copied';
  },
};

let chip: HTMLButtonElement | null = null;
let timer = 0;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const exec = (document as unknown as {
        execCommand: (commandId: string) => boolean;
      }).execCommand;
      const ok = exec.call(document, 'copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function anchorOf(node: Node | null): string {
  let el = node instanceof Element ? node : node?.parentElement ?? null;
  while (el && el !== document.body) {
    if (el.id && el.closest('[data-article]')) return `#${el.id}`;
    el = el.parentElement;
  }
  return '';
}

function hideChip(): void {
  chip?.remove();
  chip = null;
}

function flash(button: HTMLButtonElement, ok: boolean): void {
  button.textContent = ok ? labels.done : labels.copy;
  button.classList.toggle('is-done', ok);
  window.clearTimeout(timer);
  timer = window.setTimeout(hideChip, 1400);
}

function showChip(rect: DOMRect, text: string, anchor: string): void {
  hideChip();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'quote-pop';
  button.textContent = labels.copy;

  button.addEventListener('mousedown', (event) => {
    // Keep the selection alive for the clipboard read.
    event.preventDefault();
  });
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const heading = document.querySelector<HTMLElement>('[data-article] h1')?.textContent?.trim();
    const title = (heading ?? document.title).replace(/\s*·\s*Zzzode$/, '');
    const quote = document.documentElement.lang.startsWith('zh')
      ? `「${text.trim()}」\n\n—— ${title}\n${window.location.origin}${window.location.pathname}${anchor}`
      : `"${text.trim()}"\n\n— ${title}\n${window.location.origin}${window.location.pathname}${anchor}`;
    flash(button, await copyText(quote));
  });

  document.body.appendChild(button);
  chip = button;

  const margin = 10;
  const chipRect = button.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - chipRect.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - chipRect.width - margin));
  let top = rect.top - chipRect.height - 8;
  if (top < margin) top = rect.bottom + 8;
  button.style.left = `${Math.round(left)}px`;
  button.style.top = `${Math.round(top)}px`;
  requestAnimationFrame(() => button.classList.add('is-in'));
}

function onSelectionEnd(): void {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    hideChip();
    return;
  }
  const text = selection.toString().trim();
  const range = selection.getRangeAt(0);
  const insideArticle = !!range.commonAncestorContainer.parentElement?.closest('[data-article]');
  if (!insideArticle || text.length < MIN_LENGTH) {
    hideChip();
    return;
  }
  showChip(range.getBoundingClientRect(), text, anchorOf(selection.anchorNode));
}

function initQuoteChip(): void {
  if (!document.querySelector('[data-article]')) hideChip();
}

document.addEventListener('astro:page-load', initQuoteChip);
document.addEventListener('mouseup', () => window.setTimeout(onSelectionEnd, 10));
document.addEventListener('keyup', (event) => {
  if (event.shiftKey || event.key.startsWith('Arrow')) onSelectionEnd();
});
document.addEventListener('scroll', hideChip, { passive: true });
document.addEventListener('mousedown', (event) => {
  if (chip && !chip.contains(event.target as Node)) hideChip();
});
