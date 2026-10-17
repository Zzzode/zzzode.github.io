/** Date formatting for the two site locales. */

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** zh: "2026年9月22日"; en: "September 22, 2026". */
export function formatDate(date: Date, lang: 'zh' | 'en'): string {
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

/** Daily timestamps always show their editorial timezone, independent of the build host. */
export function formatDailyTime(timestamp: string, lang: 'zh' | 'en'): string {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-GB', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(new Date(timestamp)) + ' UTC+8';
}
