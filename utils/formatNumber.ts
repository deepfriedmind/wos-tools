/**
 * Formats a number with locale-aware grouping separators.
 * @param value The number to format.
 * @returns The formatted number as a string.
 */
export default function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value)
}
