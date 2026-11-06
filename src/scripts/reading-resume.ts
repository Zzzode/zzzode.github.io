/**
 * Reading resume for post pages.
 * Persists each post's scroll progress in localStorage; when the reader
 * returns past 5% (and below 95%), a quiet glass capsule offers to jump
 * back. Completing an article clears its record. No persistence when
 * storage is unavailable.
 */

export {};

const STORE_KEY = 'z-reading-positions-v1';
const SHOW_AFTER_PCT = 5;
const COMPLETE_AT_PCT = 95;
const MIN_PX = 240;

interface Position {
  pct: number;
  y: number;
  updated: number;
}
type Store = Record<string, Position>;

let capsule: HTMLElement | null = null;
let ticking = false;

const isZh = (): boolean => document.documentElement.lang.startsWith('zh');
const labels = {
  continue: (pct: number) => (isZh() ? `继续阅读 · ${pct}%` : `Resume · ${pct}%`),
  dismiss: isZh() ? '关闭' : 'Dismiss',
};

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  try {
    // Keep at most 30 entries, newest first.
    const entries = Object.entries(store).sort((a, b) => b[1].updated - a[1].updated).slice(0, 30);
    localStorage.setItem(STORE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    /* storage blocked — silently no-op */
  }
}

function progress(): number | null {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max < MIN_PX) return null;
  return Math.round(Math.min(100, Math.max(0, (window.scrollY / max) * 100)));
}

function removeCapsule(): void {
  capsule?.remove();
  capsule = null;
}

function showCapsule(position: Position): void {
  removeCapsule();
  const el = document.createElement('div');
  el.className = 'resume-capsule';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'resume-go';
  button.textContent = labels.continue(position.pct);
  button.addEventListener('click', () => {
    window.scrollTo({ top: position.y, behavior: 'smooth' });
    removeCapsule();
  });

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'resume-x';
  close.setAttribute('aria-label', labels.dismiss);
  close.textContent = '×';
  close.addEventListener('click', () => {
    const store = readStore();
    delete store[location.pathname];
    writeStore(store);
    removeCapsule();
  });

  el.append(button, close);
  document.body.appendChild(el);
  capsule = el;
  requestAnimationFrame(() => el.classList.add('is-in'));
}

function onScroll(): void {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const pct = progress();
    if (pct === null) return;
    if (pct >= COMPLETE_AT_PCT) {
      const store = readStore();
      if (store[location.pathname]) {
        delete store[location.pathname];
        writeStore(store);
      }
      return;
    }
    if (pct <= SHOW_AFTER_PCT) return;
    const store = readStore();
    const prev = store[location.pathname];
    // Avoid churn near the saved value.
    if (prev && Math.abs(prev.pct - pct) < 2) return;
    store[location.pathname] = { pct, y: Math.round(window.scrollY), updated: Date.now() };
    writeStore(store);
  });
}

function initResume(): void {
  removeCapsule();
  if (!document.querySelector('[data-article]') || window.location.hash) return;

  window.setTimeout(() => {
    const saved = readStore()[location.pathname];
    if (saved && saved.pct > SHOW_AFTER_PCT && saved.pct < COMPLETE_AT_PCT && window.scrollY < 120) {
      showCapsule(saved);
    }
  }, 700);
}

// Bound once; the handler no-ops off article pages by checking the marker.
window.addEventListener('scroll', () => {
  if (!document.querySelector('[data-article]')) return;
  onScroll();
}, { passive: true });
document.addEventListener('astro:page-load', initResume);
