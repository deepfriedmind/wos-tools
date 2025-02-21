/**
 * Converts a pixel value to a rem value based on a given base font size.
 * Can be used in `<script>`, `<style>` and `<template>` blocks without an import.
 * @param pixels - The pixel value to convert to rem.
 * @param [base] - The base font size to use for the conversion.
 * @returns The converted value as a string with "rem" appended.
 * @example Convert 16px to rem: `rem(16)` => `'1rem'` (assuming a base of 16)
 * @example Convert 16px to rem with a base of 10: `rem(16, 10)` => `'1.6rem'`
 * @example Convert 0px to rem: `rem(0)` => `'0'`
 */
export default function rem(pixels: number | string, base: number | string = 16): string {
  const pixelNumber = Math.floor(Number(pixels) * 2) / 2 // round to nearest half pixel
  const baseNumber = Number(base)

  if (Number.isNaN(pixelNumber)) {
    throw new TypeError(
      `rem.ts: The pixels argument must be a number. Got "${pixelNumber}"`,
    )
  }

  if (!Number.isSafeInteger(baseNumber)) {
    throw new TypeError(
      `rem.ts: The base argument must be a safe integer. Got "${baseNumber}"`,
    )
  }

  if (baseNumber === 0) {
    throw new Error('rem.ts: The base argument must not be zero')
  }

  if (pixelNumber === 0) {
    return '0'
  }

  return `${pixelNumber / baseNumber}rem`
}
