/**
 * This serves two purposes:
 *
 * 1. Removes all extraneous whitespace from a template literal string, including newlines.
 * Used as a tagged template literal. This is useful, e.g., when writing Tailwind CSS classes as
 * strings in `<script>` blocks, to be able to have them on multiple lines without them appearing
 * as such in the final output.
 *
 * 2. Using a tagged template literal rather than a regular one makes it work via custom regex with
 *  Tailwind CSS IntelliSense for VSCode (configured in `.vscode/settings.json` under `tailwindCSS.experimental.classRegex`).
 *
 * Not to be confused with `twJoin()` and `twMerge()` from the `tailwind-merge` package.
 * @param strings Template literal strings array
 * @param values Interpolated values
 * @returns String with all extraneous whitespace removed
 * @example
 * ```ts
 * tw`
 *   class1
 *   class2
 *   ${someVar}
 * `
 * // => 'class1 class2 someValue'
 * ```
 */
export default function tw(strings: TemplateStringsArray, ...values: unknown[]): string {
  if (!Array.isArray(strings) || !('raw' in strings)) {
    throw new TypeError(
      `tw.ts: Expected template literal, got ${typeof strings}`,
    )
  }

  const parts = Array.from({ length: strings.length * 2 - 1 })
  let index = 0

  for (const [index_, string] of strings.entries()) {
    parts[index++] = string

    if (index_ < values.length) {
      parts[index++] = String(values[index_] ?? '')
    }
  }

  const result = parts.join('')

  if (!result.trim())
    return ''

  return result.replaceAll(/\s+/g, ' ').trim()
}
