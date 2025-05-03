import { describe, expect, it } from 'vitest'

import formatNumber from '~/utils/formatNumber'

describe('formatNumber utility function', () => {
  // --- Standard Formatting ---
  it('should format numbers with locale-aware grouping separators by default', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1_000_000)).toBe('1,000,000')
    expect(formatNumber(1_234_567.89)).toBe('1,234,567.89')
  })

  // --- Compact Formatting ---
  it('should format numbers in compact notation when compact=true with default 2 decimals', () => {
    expect(formatNumber(1000, true)).toBe('1K')
    expect(formatNumber(1500, true)).toBe('1.5K')
    expect(formatNumber(1_000_000, true)).toBe('1M')
    expect(formatNumber(1_500_000, true)).toBe('1.5M')
    expect(formatNumber(1_000_000_000, true)).toBe('1B')
    expect(formatNumber(1_500_000_000, true)).toBe('1.5B')
  })

  it('should format numbers in compact notation with custom decimal places', () => {
    expect(formatNumber(1000, true, 0)).toBe('1K')
    expect(formatNumber(1500, true, 1)).toBe('1.5K')
    expect(formatNumber(1234, true, 3)).toBe('1.234K')
    expect(formatNumber(1_000_000, true, 0)).toBe('1M')
    expect(formatNumber(1_500_000, true, 1)).toBe('1.5M')
    expect(formatNumber(1_234_567, true, 3)).toBe('1.235M')
  })

  // --- Edge Cases ---
  it('should handle zero correctly in both formats', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(0, true)).toBe('0')
    expect(formatNumber(0, true, 3)).toBe('0')
  })

  it('should throw an error when trying to format non-finite values', () => {
    expect(() => formatNumber(Number.NaN)).toThrow('formatNumber.ts: The supplied value is not a number. Got NaN (number).')
    expect(() => formatNumber(Number.POSITIVE_INFINITY)).toThrow('formatNumber.ts: The supplied value is not a number. Got Infinity (number).')
    expect(() => formatNumber(Number.NEGATIVE_INFINITY)).toThrow('formatNumber.ts: The supplied value is not a number. Got -Infinity (number).')
    expect(() => formatNumber(Number.NaN, true)).toThrow('formatNumber.ts: The supplied value is not a number. Got NaN (number).')
    expect(() => formatNumber(Number.POSITIVE_INFINITY, true)).toThrow('formatNumber.ts: The supplied value is not a number. Got Infinity (number).')
    expect(() => formatNumber(Number.NEGATIVE_INFINITY, true, 3)).toThrow('formatNumber.ts: The supplied value is not a number. Got -Infinity (number).')
  })

  it('should throw an error when trying to format non-number types', () => {
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber('123')).toThrow('formatNumber.ts: The supplied value is not a number. Got 123 (string).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber(true)).toThrow('formatNumber.ts: The supplied value is not a number. Got true (boolean).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber(false)).toThrow('formatNumber.ts: The supplied value is not a number. Got false (boolean).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber(null)).toThrow('formatNumber.ts: The supplied value is not a number. Got null (object).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber(undefined)).toThrow('formatNumber.ts: The supplied value is not a number. Got undefined (undefined).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber({})).toThrow('formatNumber.ts: The supplied value is not a number. Got [object Object] (object).')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber([])).toThrow('formatNumber.ts: The supplied value is not a number. Got  (object).')
    // @ts-expect-error Testing invalid input
    // For functions, just check that it contains the right message prefix and type
    expect(() => formatNumber(() => {})).toThrow('formatNumber.ts: The supplied value is not a number. Got ')
    // @ts-expect-error Testing invalid input
    expect(() => formatNumber(() => {})).toThrow('(function).')
  })

  it('should handle negative numbers correctly in both formats', () => {
    expect(formatNumber(-1000)).toBe('-1,000')
    expect(formatNumber(-1000, true)).toBe('-1K')
    expect(formatNumber(-1000, true, 0)).toBe('-1K')
    expect(formatNumber(-1_000_000)).toBe('-1,000,000')
    expect(formatNumber(-1_000_000, true)).toBe('-1M')
    expect(formatNumber(-1_000_000, true, 1)).toBe('-1M')
  })

  it('should handle small numbers correctly in compact format', () => {
    expect(formatNumber(1, true)).toBe('1')
    expect(formatNumber(10, true)).toBe('10')
    expect(formatNumber(100, true)).toBe('100')
    expect(formatNumber(999, true)).toBe('999')
    expect(formatNumber(1, true, 0)).toBe('1')
    expect(formatNumber(10, true, 0)).toBe('10')
    expect(formatNumber(100, true, 0)).toBe('100')
    expect(formatNumber(999, true, 0)).toBe('999')
  })

  it('should handle decimal numbers correctly in compact format', () => {
    expect(formatNumber(1234.56, true)).toBe('1.23K')
    expect(formatNumber(1_234_567.89, true)).toBe('1.23M')
    expect(formatNumber(1234.56, true, 1)).toBe('1.2K')
    expect(formatNumber(1_234_567.89, true, 1)).toBe('1.2M')
    expect(formatNumber(1234.56, true, 3)).toBe('1.235K')
    expect(formatNumber(1_234_567.89, true, 3)).toBe('1.235M')
  })

  it('should hide decimal places when they are all zeros', () => {
    expect(formatNumber(1000, true)).toBe('1K')
    expect(formatNumber(2000, true)).toBe('2K')
    expect(formatNumber(1_000_000, true)).toBe('1M')
    expect(formatNumber(2_000_000, true)).toBe('2M')
    expect(formatNumber(1_000_000_000, true)).toBe('1B')
    expect(formatNumber(2_000_000_000, true)).toBe('2B')

    // With custom decimal places
    expect(formatNumber(1000, true, 3)).toBe('1K')
    expect(formatNumber(1_000_000, true, 4)).toBe('1M')

    // With non-zero decimals
    expect(formatNumber(1500, true)).toBe('1.5K')
    expect(formatNumber(1500, true, 3)).toBe('1.5K')
    expect(formatNumber(1500, true, 1)).toBe('1.5K')
  })
})
