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
 * @param strings Template literal
 * @returns String with all extraneous whitespace removed
 * @example
 * ```ts
 * tw`
 *   class1
 *   class2
 *   class3
 * `
 * // => 'class1 class2 class3'
 * ```
 */
export default function tw(strings: TemplateStringsArray): string {
  if (!Array.isArray(strings) || typeof strings[0] !== 'string') {
    throw new TypeError(
      `tw.ts: Expected template literal, got ${typeof strings}`,
    )
  }

  return String.raw(strings).replaceAll(/\s+/g, ' ').trim()
}

const lol = tw`text-center text-lg font-bold shadow-sm`
const lol2 = twJoin('text-center text-lg font-bold shadow-sm')
