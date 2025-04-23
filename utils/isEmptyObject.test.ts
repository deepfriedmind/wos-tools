import { describe, expect, it } from 'vitest'

import isEmptyObject from '~/utils/isEmptyObject'

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('should return false for an object with own properties', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false)
    expect(isEmptyObject({ key: 'value' })).toBe(false)
  })

  it('should throw error for an object with inherited properties but no own properties', () => {
    const parent: Record<string, unknown> = { inherited: 'value' }
    const child = Object.create(parent) as Record<string, unknown>
    expect(() => isEmptyObject(child)).toThrow(Error)
    expect(() => isEmptyObject(child)).toThrow('isEmptyObject.ts: Expected a plain object, got object')
  })

  it('should return true for an object with only a symbol property (symbols are not enumerable by for...in)', () => {
    const sym = Symbol('a')
    expect(isEmptyObject({ [sym]: 'value' })).toBe(true)
  })

  it('should throw error for null input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(null)).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(null)).toThrow('isEmptyObject.ts: Expected a plain object, got null')
  })

  it('should throw error for undefined input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(undefined)).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(undefined)).toThrow('isEmptyObject.ts: Expected a plain object, got undefined')
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject()).toThrow('isEmptyObject.ts: Expected a plain object, got undefined')
  })

  it('should throw error for string input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject('string')).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject('string')).toThrow('isEmptyObject.ts: Expected a plain object, got string')
  })

  it('should throw error for number input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(123)).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(123)).toThrow('isEmptyObject.ts: Expected a plain object, got number')
  })

  it('should throw error for boolean input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(true)).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(true)).toThrow('isEmptyObject.ts: Expected a plain object, got boolean')
  })

  it('should throw error for function input', () => {
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(() => {})).toThrow(Error)
    // @ts-expect-error Testing invalid input
    expect(() => isEmptyObject(() => {})).toThrow('isEmptyObject.ts: Expected a plain object, got function')
  })
})
