import { describe, expect, it } from 'vitest'

import tw from './tw'

describe('tw', () => {
  it('removes extraneous whitespace from template literal', () => {
    const result = tw`
      class1
      class2
      class3
    `

    expect(result).toBe('class1 class2 class3')
  })

  it('handles single line input', () => {
    const result = tw`class1 class2 class3`
    expect(result).toBe('class1 class2 class3')
  })

  it('trims leading and trailing whitespace', () => {
    const result = tw`  class1 class2  `
    expect(result).toBe('class1 class2')
  })

  it('collapses multiple spaces into single space', () => {
    const result = tw`class1    class2     class3`
    expect(result).toBe('class1 class2 class3')
  })

  it('throws TypeError when not used as template literal', () => {
    // @ts-expect-error Testing invalid input
    expect(() => tw('invalid')).toThrow(TypeError)
    // @ts-expect-error Testing invalid input
    expect(() => tw('invalid')).toThrow('tw.ts: Expected template literal, got string')
  })

  it('handles empty string', () => {
    const result = tw``
    expect(result).toBe('')
  })

  it('handles whitespace-only string', () => {
    const result = tw`   \n   \t   `
    expect(result).toBe('')
  })

  it('handles interpolated values', () => {
    const value1 = 'dynamic1'
    const value2 = 'dynamic2'
    const result = tw`class1 ${value1} class2 ${value2}`
    expect(result).toBe('class1 dynamic1 class2 dynamic2')
  })

  it('handles interpolated values with surrounding whitespace', () => {
    const value = 'dynamic'
    const result = tw`
      class1
      ${value}
      class2
    `

    expect(result).toBe('class1 dynamic class2')
  })

  it('handles null/undefined interpolated values', () => {
    // eslint-disable-next-line unicorn/no-null
    const value1 = null
    const value2 = undefined
    const result = tw`class1 ${value1} class2 ${value2} class3`
    expect(result).toBe('class1 class2 class3')
  })

  it('handles number interpolated values', () => {
    const value = 42
    const result = tw`class1 ${value} class2`
    expect(result).toBe('class1 42 class2')
  })

  it('handles object interpolated values', () => {
    const value = { toString: () => 'custom' }
    const result = tw`class1 ${value} class2`
    expect(result).toBe('class1 custom class2')
  })
})
