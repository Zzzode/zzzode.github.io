/**
 * Copy-to-clipboard buttons for post code blocks.
 * Progressive enhancement: a quiet chip is injected into each Shiki
 * <pre data-language>; without JS or clipboard permission the code is
 * fully untouched. Zero dependencies; bound through astro:page-load so
 * re-injection runs after View Transition swaps.
 */

export {};

const COPY = document.documentElement.lang.startsWith('zh') ? '复制' : 'Copy';
const COPIED = document.documentElement.lang.startsWith('zh') ? '已复制' : 'Copied';
const COPY_LABEL = document.documentElement.lang.startsWith('zh')
  ? '复制代码'
  : 'Copy code';
const COPIED_LABEL = document.documentElement.lang.startsWith('zh')
  ? '已复制到剪贴板'
  : 'Copied to clipboard';

const RESET_AFTER = 1800;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Legacy file:// / non-permission environments.
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      // Sole legacy path for non-secure contexts that lack the async API.
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

function enhanceBlock(pre: HTMLElement): void {
  if (pre.dataset.copyReady === 'true') return;
  pre.dataset.copyReady = 'true';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'code-copy';
  button.setAttribute('aria-label', COPY_LABEL);
  button.textContent = COPY;

  const flash = (ok: boolean): void => {
    button.classList.toggle('is-done', ok);
    button.textContent = ok ? COPIED : COPY;
    button.setAttribute('aria-label', ok ? COPIED_LABEL : COPY_LABEL);
    window.setTimeout(() => {
      button.classList.remove('is-done');
      button.textContent = COPY;
      button.setAttribute('aria-label', COPY_LABEL);
    }, RESET_AFTER);
  };

  button.addEventListener('click', () => {
    void copyText(pre.innerText).then(flash);
  });

  pre.appendChild(button);
}

function initCodeCopy(): void {
  document
    .querySelectorAll<HTMLElement>('pre.astro-code[data-language]')
    .forEach(enhanceBlock);
}

document.addEventListener('astro:page-load', initCodeCopy);
