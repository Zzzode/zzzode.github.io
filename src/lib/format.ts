/** "2026年9月22日" */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/** ISO date for <time datetime> */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
