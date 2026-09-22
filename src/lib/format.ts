/** Date formatting for the two site locales. */

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** zh: "2026年9月22日"; en: "September 22, 2026". */
export function formatDate(date: Date, lang: 'zh' | 'en'): string {
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
