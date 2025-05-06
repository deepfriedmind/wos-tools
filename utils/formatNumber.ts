/**
 * Formats a number with locale-aware grouping separators.
 * @param value The number to format.
 * @param compact Whether to use compact notation (e.g., 10K, 10M, 10B). Defaults to false.
 * @param decimals Number of decimal places to show in compact mode. Defaults to 2.
 * @returns The formatted number as a string.
 * @throws Error if the value is not a number.
 */
export default function formatNumber(value: number, compact = false, decimals = 2) {
  useInvariant(Number.isFinite(value), `formatNumber.ts: The supplied value is not a number. Got ${value} (${typeof value}).`)

  if (value === 0)
    return '0'

  if (compact) {
    return new Intl.NumberFormat(undefined, {
      compactDisplay: 'short',
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0, // avoid displaying trailing zeros while still showing significant decimal digits
      notation: 'compact',
    }).format(value)
  }

  return new Intl.NumberFormat().format(value)
}
