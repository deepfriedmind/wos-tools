/* eslint-disable unicorn/no-null */
import { describe, expect, it } from 'vitest'

import isEmpty from '~/utils/isEmpty'

describe('isEmpty', () => {
  it('should return true for an empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('should return false for an object with own properties', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
  })

  it('should return true for an object with inherited properties but no own properties', () => {
    const parent: Record<string, unknown> = { inherited: 'value' }
    const child = Object.create(parent) as Record<string, unknown>
    expect(isEmpty(child)).toBe(true)
  })

  it('should return true for an object with only a symbol property (symbols are not enumerable by for...in)', () => {
    const sym = Symbol('a')
    expect(isEmpty({ [sym]: 'value' })).toBe(true)
  })

  it('should throw TypeError for null input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(null)).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(null)).toThrow('isEmpty.ts: Expected object, got null')
  })

  it('should throw TypeError for undefined input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty()).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty()).toThrow('isEmpty.ts: Expected object, got undefined')
  })

  it('should throw TypeError for string input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty('string')).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty('string')).toThrow('isEmpty.ts: Expected object, got string')
  })

  it('should throw TypeError for number input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(123)).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(123)).toThrow('isEmpty.ts: Expected object, got number')
  })

  it('should throw TypeError for boolean input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(true)).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(true)).toThrow('isEmpty.ts: Expected object, got boolean')
  })

  it('should throw TypeError for function input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(() => {})).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => isEmpty(() => {})).toThrow('isEmpty.ts: Expected object, got function')
  })

  it('should handle arrays (which are objects)', () => {
    // Empty arrays have no enumerable properties (like indices), only non-enumerable 'length'.
    // Therefore, isEmpty returns true for an empty array.
    // @ts-expect-error Testing array input against object type
    expect(isEmpty([])).toBe(true) // No enumerable properties
    // @ts-expect-error Testing array input against object type
    expect(isEmpty([1, 2])).toBe(false) // Has index properties '0', '1' and 'length'
  })
})
