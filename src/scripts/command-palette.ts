/**
 * Global command palette — ⌘K / Ctrl+K from any page.
 *
 * Progressive enhancement: trigger elements are ordinary links to /search/,
 * so without JS the site behaves exactly as before. The palette lazily
 * loads the static Pagefind bundle (built into /pagefind/), scopes results
 * to the current locale, and merges them with static navigation commands.
 *
 * Zero dependencies. All listeners are attached once on `document` (event
 * delegation), so the module survives Astro View Transitions; destroy()
 * removes them and the injected DOM.
 */

export {};

interface PaletteStrings {
  placeholder: string;
  commands: string;
  results: string;
  empty: string;
  loading: string;
  unavailable: string;
  hint: string;
  toSearch: string;
}

interface PaletteCommand {
  title: string;
  href: string;
  subtitle?: string;
}

interface PaletteConfig {
  locale: string;
  pagefindBase: string;
  strings: PaletteStrings;
  commands: PaletteCommand[];
  recent: PaletteCommand[];
}

interface PaletteItem {
  title: string;
  href: string;
  excerpt?: string;
  kind: 'command' | 'result' | 'recent';
}

interface PagefindResult {
  data: () => Promise<{
    url: string;
    excerpt: string;
    plain_excerpt?: string;
    meta?: Record<string, string>;
  }>;
}

interface Pagefind {
  init: (opts?: { path?: string }) => Promise<void>;
  search: (
    query: string,
    opts?: { filters?: Record<string, string> }
  ) => Promise<{ results: PagefindResult[] }>;
}

declare global {
  interface Window {
    __cmdkPalette?: CommandPalette;
  }
}

const CONFIG_SELECTOR = 'script[data-command-config]';

function readConfig(): PaletteConfig | null {
  const node = document.querySelector<HTMLScriptElement>(CONFIG_SELECTOR);
  if (!node?.textContent) return null;
  try {
    return JSON.parse(node.textContent) as PaletteConfig;
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  const template = document.createElement('template');
  template.innerHTML = html;
  return (template.content.textContent ?? '').replace(/\s+/g, ' ').trim();
}

class CommandPalette {
  private cfg: PaletteConfig;
  private scrim: HTMLElement;
  private panel: HTMLElement;
  private input: HTMLInputElement;
  private list: HTMLElement;
  private status: HTMLElement;
  private hint: HTMLElement;

  private isOpen = false;
  private items: PaletteItem[] = [];
  private active = 0;
  private query = '';
  private debounceId = 0;
  private searchSeq = 0;
  private pagefind: Pagefind | null = null;
  private pagefindLoading: Promise<Pagefind | null> | null = null;
  private reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(cfg: PaletteConfig) {
    this.cfg = cfg;

    this.scrim = document.createElement('div');
    this.scrim.className = 'cmdk-scrim';
    this.scrim.hidden = true;

    this.panel = document.createElement('div');
    this.panel.className = 'cmdk-panel';
    this.panel.setAttribute('role', 'dialog');
    this.panel.setAttribute('aria-modal', 'true');
    this.panel.setAttribute('aria-label', cfg.strings.placeholder);
    this.panel.hidden = true;

    this.input = document.createElement('input');
    this.input.className = 'cmdk-input';
    this.input.type = 'text';
    this.input.spellcheck = false;
    this.input.autocomplete = 'off';
    this.input.enterKeyHint = 'search';
    this.input.placeholder = cfg.strings.placeholder;
    this.input.setAttribute('aria-autocomplete', 'list');
    this.input.setAttribute('aria-controls', 'cmdk-list');
    this.input.setAttribute('aria-activedescendant', '');

    const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    searchIcon.classList.add('cmdk-icon');
    searchIcon.setAttribute('viewBox', '0 0 20 20');
    searchIcon.setAttribute('fill', 'none');
    searchIcon.setAttribute('stroke', 'currentColor');
    searchIcon.setAttribute('stroke-width', '1.6');
    searchIcon.setAttribute('stroke-linecap', 'round');
    searchIcon.innerHTML =
      '<circle cx="9" cy="9" r="6.2"></circle><line x1="13.6" y1="13.6" x2="17.5" y2="17.5"></line>';

    const field = document.createElement('div');
    field.className = 'cmdk-field';
    field.append(searchIcon, this.input);

    this.status = document.createElement('p');
    this.status.className = 'cmdk-status';

    this.hint = document.createElement('p');
    this.hint.className = 'cmdk-hint';
    this.hint.setAttribute('aria-hidden', 'true');
    const nav = navigator as Navigator & {
      userAgentData?: { platform?: string };
      platform?: string;
    };
    const platform = nav.userAgentData?.platform ?? nav.platform ?? navigator.userAgent;
    const mod = /mac|iphone|ipad/i.test(platform) ? '⌘' : 'Ctrl';
    this.hint.textContent = cfg.strings.hint.replace('{mod}', mod);

    this.list = document.createElement('div');
    this.list.className = 'cmdk-list';
    this.list.id = 'cmdk-list';
    this.list.setAttribute('role', 'listbox');

    this.panel.append(field, this.status, this.list, this.hint);
    document.body.append(this.scrim, this.panel);
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.scrim.hidden = false;
    this.panel.hidden = false;
    document.documentElement.classList.add('cmdk-lock');
    requestAnimationFrame(() => {
      this.scrim.classList.add('is-in');
      this.panel.classList.add('is-in');
    });
    this.query = '';
    this.input.value = '';
    this.renderCommands();
    window.setTimeout(() => this.input.focus(), this.reduceMotion ? 0 : 40);
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.scrim.classList.remove('is-in');
    this.panel.classList.remove('is-in');
    document.documentElement.classList.remove('cmdk-lock');
    const hide = () => {
      if (this.isOpen) return;
      this.scrim.hidden = true;
      this.panel.hidden = true;
    };
    if (this.reduceMotion) hide();
    else window.setTimeout(hide, 180);
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  /* ---------- data ---------- */

  private matchingCommands(query: string): PaletteItem[] {
    const q = query.trim().toLowerCase();
    return this.cfg.commands
      .filter((c) => !q || c.title.toLowerCase().includes(q))
      .map((c) => ({ ...c, kind: 'command' as const }));
  }

  private async loadPagefind(): Promise<Pagefind | null> {
    if (this.pagefind) return this.pagefind;
    if (!this.pagefindLoading) {
      this.pagefindLoading = new Promise<Pagefind | null>((resolve) => {
        // pagefindBase is an absolute site path (`/pagefind/`); Pagefind
        // emits the runtime module there during postbuild, so Vite must
        // leave the import speculator alone.
        const url = `${this.cfg.pagefindBase}pagefind.js`;
        import(/* @vite-ignore */ url)
          .then(async (mod: { default?: Pagefind } & Partial<Pagefind>) => {
            const candidate: Partial<Pagefind> | undefined = mod.default ?? mod;
            if (candidate && typeof candidate.search === 'function') {
              const pagefind = candidate as Pagefind;
              await pagefind.init({ path: this.cfg.pagefindBase });
              this.pagefind = pagefind;
              resolve(pagefind);
            } else {
              resolve(null);
            }
          })
          .catch(() => resolve(null));
      });
    }
    return this.pagefindLoading;
  }

  private async runSearch(rawQuery: string): Promise<void> {
    const seq = ++this.searchSeq;
    const query = rawQuery.trim();

    if (query.length === 0) {
      this.renderCommands();
      return;
    }

    this.status.textContent = this.cfg.strings.loading;
    this.status.hidden = false;
    this.items = [];
    this.active = 0;
    this.list.replaceChildren();

    let pagefind: Pagefind | null = null;
    try {
      pagefind = await this.loadPagefind();
    } catch {
      pagefind = null;
    }
    if (seq !== this.searchSeq) return;

    if (!pagefind) {
      this.items = [];
      this.render([], this.cfg.strings.unavailable);
      return;
    }

    let pagefindResults: PagefindResult[] = [];
    try {
      const response = await pagefind.search(query, { filters: { locale: this.cfg.locale } });
      pagefindResults = response.results.slice(0, 8);
    } catch {
      this.items = [];
      this.render([], this.cfg.strings.unavailable);
      return;
    }
    if (seq !== this.searchSeq) return;

    const posts: PaletteItem[] = [];
    for (const result of pagefindResults) {
      const data = await result.data();
      if (seq !== this.searchSeq) return;
      const title = data.meta?.title ?? stripHtml(data.excerpt).slice(0, 40);
      let excerpt = stripHtml(data.plain_excerpt ?? data.excerpt);
      // Pagefind bodies repeat the title right after meta prefixes; drop
      // its first occurrence when it sits inside the leading meta junk.
      const titleAt = excerpt.indexOf(title);
      if (titleAt >= 0 && titleAt < 40) {
        excerpt = excerpt.slice(titleAt + title.length);
      }
      excerpt = excerpt.replace(/^[\s.·｜|]+/, '');
      posts.push({
        title,
        href: data.url,
        excerpt: excerpt.slice(0, 110),
        kind: 'result',
      });
    }

    const commands = this.matchingCommands(query).slice(0, 3);
    const status = posts.length === 0 && commands.length === 0 ? this.cfg.strings.empty : '';
    this.render([...commands, ...posts], status);
  }

  /* ---------- rendering ---------- */

  private renderCommands(): void {
    const items: PaletteItem[] = [
      ...this.cfg.recent.map((c) => ({ ...c, kind: 'recent' as const })),
      ...this.cfg.commands.map((c) => ({ ...c, kind: 'command' as const })),
    ];
    this.items = items;
    this.render(this.items, '');
  }

  private render(items: PaletteItem[], status: string): void {
    this.items = items;
    this.active = 0;
    this.list.replaceChildren();

    if (items.length > 0) {
      const groups: Array<{ kind: PaletteItem['kind']; label: string }> = [
        { kind: 'recent', label: this.cfg.strings.results },
        { kind: 'command', label: this.cfg.strings.commands },
        { kind: 'result', label: this.cfg.strings.results },
      ];
      const seenLabels = new Set<string>();
      for (const group of groups) {
        const groupItems = items.filter((i) => i.kind === group.kind);
        if (groupItems.length === 0) continue;
        // recent and result share the "Articles" heading; render it once.
        if (group.kind !== 'command') {
          if (seenLabels.has(group.label)) continue;
          seenLabels.add(group.label);
        }
        const heading = document.createElement('p');
        heading.className = 'cmdk-group';
        heading.textContent = group.label;
        this.list.appendChild(heading);
        for (const item of groupItems) {
          this.list.appendChild(this.optionNode(item));
        }
      }
    }

    this.status.textContent = status;
    this.status.hidden = status.length === 0;
    this.syncActive();
  }

  private optionNode(item: PaletteItem): HTMLElement {
    const row = document.createElement('a');
    row.className = `cmdk-option cmdk-option--${item.kind}`;
    row.href = item.href;
    row.id = `cmdk-opt-${this.items.indexOf(item)}`;
    row.setAttribute('role', 'option');
    row.setAttribute('aria-selected', 'false');

    const title = document.createElement('span');
    title.className = 'cmdk-title';
    title.textContent = item.title;
    row.appendChild(title);

    if (item.excerpt) {
      const excerpt = document.createElement('span');
      excerpt.className = 'cmdk-excerpt';
      excerpt.textContent = item.excerpt;
      row.appendChild(excerpt);
    }

    row.addEventListener('mousemove', () => {
      const index = this.items.indexOf(item);
      if (index !== -1 && index !== this.active) {
        this.active = index;
        this.syncActive();
      }
    });
    return row;
  }

  private syncActive(): void {
    const optionNodes = Array.from(this.list.querySelectorAll<HTMLElement>('.cmdk-option'));
    optionNodes.forEach((node, i) => {
      const selected = i === this.active;
      node.setAttribute('aria-selected', String(selected));
      if (selected) {
        node.scrollIntoView({ block: 'nearest' });
        this.input.setAttribute('aria-activedescendant', node.id);
      }
    });
  }

  /* ---------- events ---------- */

  onKeydown = (event: KeyboardEvent): void => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.toggle();
      return;
    }
    if (event.key === '/' && !this.isOpen && !this.isEditable(document.activeElement)) {
      event.preventDefault();
      this.open();
      return;
    }
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.active = Math.min(this.items.length - 1, this.active + 1);
        this.syncActive();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.active = Math.max(0, this.active - 1);
        this.syncActive();
        break;
      case 'Enter': {
        event.preventDefault();
        const item = this.items[this.active];
        if (item) window.location.assign(item.href);
        break;
      }
      case 'Tab':
        event.preventDefault();
        this.active =
          event.shiftKey
            ? (this.active - 1 + this.items.length) % this.items.length
            : (this.active + 1) % this.items.length;
        this.syncActive();
        break;
    }
  };

  onInput = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target !== this.input) return;
    this.query = target.value;
    window.clearTimeout(this.debounceId);
    this.debounceId = window.setTimeout(() => void this.runSearch(this.query), 120);
  };

  onClick = (event: MouseEvent): void => {
    const target = event.target as Element | null;
    if (!target) return;
    if (target.closest('[data-command-open]')) {
      event.preventDefault();
      this.open();
    } else if (this.isOpen && target.closest('.cmdk-scrim')) {
      this.close();
    }
  };

  private isEditable(el: Element | null): boolean {
    return (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement ||
      (el instanceof HTMLElement && el.isContentEditable)
    );
  }

  start(): void {
    document.addEventListener('keydown', this.onKeydown);
    // Capture phase: beat ClientRouter's same-origin link interception,
    // which otherwise commits a view transition before the palette opens.
    document.addEventListener('click', this.onClick, true);
    this.input.addEventListener('input', this.onInput);
  }

  /**
   * ClientRouter swaps body children on navigation. The singleton's
   * listeners live on `document`, so only the injected nodes need to be
   * moved back into the new body; a mid-navigation palette is dismissed.
   */
  reattach(): void {
    if (!document.body.contains(this.panel)) {
      document.body.append(this.scrim, this.panel);
    }
    if (this.isOpen) {
      this.isOpen = false;
      this.scrim.classList.remove('is-in');
      this.panel.classList.remove('is-in');
      this.scrim.hidden = true;
      this.panel.hidden = true;
      this.input.value = '';
      this.query = '';
    }
    document.documentElement.classList.remove('cmdk-lock');
  }

  destroy(): void {
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('click', this.onClick, true);
    this.input.removeEventListener('input', this.onInput);
    window.clearTimeout(this.debounceId);
    this.scrim.remove();
    this.panel.remove();
    document.documentElement.classList.remove('cmdk-lock');
  }
}

function boot(): void {
  // The singleton persists across View Transitions; just reattach its nodes.
  if (window.__cmdkPalette) {
    window.__cmdkPalette.reattach();
    return;
  }
  const cfg = readConfig();
  if (!cfg) return;
  const palette = new CommandPalette(cfg);
  palette.start();
  window.__cmdkPalette = palette;
}

document.addEventListener('astro:page-load', boot);
