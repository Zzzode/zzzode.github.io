import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { t } from '../i18n/ui';
import type { Entry } from './entries';
import { formatDate } from './format';

export type SectionName = 'publications' | 'talks' | 'teaching' | 'posts';

/** Entry ids are "<locale>/<slug>", e.g. "en/2026-09-22-hello". */
export function localeOfId(id: string): Lang {
  return id.startsWith('en/') ? 'en' : 'zh';
}

/** Strip the locale folder, e.g. "zh/2026-09-22-hello" -> "2026-09-22-hello". */
export function slugOfId(id: string): string {
  return id.replace(/^(zh|en)\//, '');
}

/** Entries of one collection for one locale, newest date/term first. */
export async function getLocalized<C extends SectionName>(name: C, lang: Lang) {
  const entries = await getCollection(name, (entry) => localeOfId(entry.id) === lang);
  return [...entries].sort((a, b) => {
    if (name === 'teaching') {
      // teaching.date is a free-form term; fall back to file id ordering
      return b.id.localeCompare(a.id);
    }
    return (
      (b.data as { date: Date }).date.getTime() - (a.data as { date: Date }).date.getTime()
    );
  });
}

/** Find a post's translation pair by shared slug (same filename under zh/ and en/). */
export async function findCounterpart<C extends SectionName>(
  name: C,
  entry: CollectionEntry<C>,
): Promise<CollectionEntry<C> | undefined> {
  const targetLang: Lang = localeOfId(entry.id) === 'zh' ? 'en' : 'zh';
  const slug = slugOfId(entry.id);
  const all = await getCollection(name);
  return all.find((other) => localeOfId(other.id) === targetLang && slugOfId(other.id) === slug);
}

/** URL of a collection entry in the given locale. */
export function entryUrl(name: SectionName, id: string, lang: Lang): string {
  const slug = slugOfId(id);
  const prefix = lang === 'en' ? '/en' : '';
  return name === 'posts' ? `${prefix}/posts/${slug}/` : `${prefix}/${name}/`;
}

function talkMeta(data: CollectionEntry<'talks'>['data'], lang: Lang): string {
  return [
    t(lang, `talk.${data.type}`),
    data.venue,
    data.location,
    String(data.date.getFullYear()),
  ]
    .filter(Boolean)
    .join(' · ');
}

/** Map a localized collection into the view model consumed by EntryList. */
export async function getEntries(name: SectionName, lang: Lang): Promise<Entry[]> {
  const items = await getLocalized(name, lang);

  return items.map((item) => {
    const prefix = lang === 'en' ? '/en' : '';

    if (name === 'publications') {
      const d = item.data as CollectionEntry<'publications'>['data'];
      const href =
        d.paperurl ?? (d.doi ? `https://doi.org/${d.doi}` : d.pdf ? d.pdf : undefined);
      return {
        title: d.title,
        meta: `${d.venue} · ${d.date.getFullYear()}`,
        excerpt: d.excerpt,
        href,
        external: href !== undefined && href !== d.pdf,
      };
    }

    if (name === 'talks') {
      const d = item.data as CollectionEntry<'talks'>['data'];
      return {
        title: d.title,
        meta: talkMeta(d, lang),
        excerpt: d.excerpt,
        href: d.url,
        external: true,
      };
    }

    if (name === 'teaching') {
      const d = item.data as CollectionEntry<'teaching'>['data'];
      return {
        title: d.title,
        meta: [d.role, d.venue, d.date].filter(Boolean).join(' · '),
        excerpt: d.excerpt,
      };
    }

    const d = item.data as CollectionEntry<'posts'>['data'];
    return {
      title: d.title,
      meta: formatDate(d.date, lang),
      excerpt: d.excerpt,
      tags: d.tags,
      href: `${prefix}/posts/${slugOfId(item.id)}/`,
    };
  });
}
