import { describe, expect, it } from 'vitest'

import rem from '~/utils/rem'

describe('rem utility function', () => {
  // --- Basic Conversions ---
  it('should convert pixels to rem with default base (16)', () => {
    expect(rem(16)).toBe('1rem')
    expect(rem(32)).toBe('2rem')
    expect(rem(8)).toBe('0.5rem')
    expect(rem(24)).toBe('1.5rem')
  })

  it('should convert pixels to rem with a custom base', () => {
    expect(rem(16, 10)).toBe('1.6rem')
    expect(rem(20, 10)).toBe('2rem')
    expect(rem(5, 10)).toBe('0.5rem')
    expect(rem(15, 10)).toBe('1.5rem')
  })

  // --- String Inputs ---
  it('should handle string inputs for pixels and base', () => {
    expect(rem('16')).toBe('1rem')
    expect(rem('32', '16')).toBe('2rem')
    expect(rem('16', '10')).toBe('1.6rem')
    expect(rem('8', 16)).toBe('0.5rem') // Mixed types
  })

  // --- Zero Pixel Value ---
  it('should return "0" for zero pixel input', () => {
    expect(rem(0)).toBe('0')
    expect(rem('0')).toBe('0')
    expect(rem(0, 10)).toBe('0')
    expect(rem('0', '10')).toBe('0')
  })

  // --- Rounding ---
  it('should round pixel values to the nearest half pixel before conversion', () => {
    expect(rem(16.2)).toBe('1rem') // Rounds down to 16
    expect(rem(16.4)).toBe('1rem') // Rounds down to 16
    expect(rem(16.5)).toBe('1.03125rem') // Stays 16.5 (16.5 / 16)
    expect(rem(16.7)).toBe('1.03125rem') // Rounds down to 16.5
    expect(rem(16.9)).toBe('1.03125rem') // Rounds down to 16.5
    expect(rem(17.1)).toBe('1.0625rem') // Rounds down to 17
  })

  // --- Error Handling ---
  it('should throw TypeError for invalid pixel input', () => {
    expect(() => rem('abc')).toThrow(TypeError)
    expect(() => rem('abc')).toThrow(
      'rem.ts: The pixels argument must be a number. Got "NaN"',
    )
    expect(() => rem(Number.NaN)).toThrow(TypeError) // Explicit NaN
  })

  it('should throw TypeError for invalid base input', () => {
    expect(() => rem(16, 'abc')).toThrow(TypeError)
    expect(() => rem(16, 'abc')).toThrow(
      'rem.ts: The base argument must be a safe integer. Got "NaN"',
    )
    expect(() => rem(16, Number.NaN)).toThrow(TypeError) // Explicit NaN base
  })

  it('should throw TypeError for non-safe-integer base input', () => {
    expect(() => rem(16, 1.2)).toThrow(TypeError)
    expect(() => rem(16, 1.2)).toThrow(
      'rem.ts: The base argument must be a safe integer. Got "1.2"',
    )
    expect(() => rem(16, Number.MAX_SAFE_INTEGER + 1)).toThrow(TypeError) // Above safe integer
  })

  it('should throw Error for zero base input', () => {
    expect(() => rem(16, 0)).toThrow(Error)
    expect(() => rem(16, 0)).toThrow('rem.ts: The base argument must not be zero')
    expect(() => rem(16, '0')).toThrow(Error)
    expect(() => rem(16, '0')).toThrow('rem.ts: The base argument must not be zero')
  })
})
