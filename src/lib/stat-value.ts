/** Accept legacy numeric-only values and already formatted labels without duplicating units. */
export function formatStatValue(value: string, prefix = '', suffix = ''): string {
  return `${value.startsWith(prefix) ? '' : prefix}${value}${value.endsWith(suffix) ? '' : suffix}`;
}
