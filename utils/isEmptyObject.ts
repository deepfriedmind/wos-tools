/**
 * Checks if an object has no own enumerable properties.
 *
 * @param object - The object to check for properties
 * @returns `true` if the object has no own enumerable properties, `false` otherwise
 * @throws {Error} If the provided value is not a plain object or is undefined
 * @example
 * ```ts
 * isEmptyObject({}) // => true
 * isEmptyObject({ key: 'value' }) // => false
 * ```
 */
export default function isEmptyObject(object: Record<string, unknown>) {
  useInvariant(useIsPlainObject(object), `isEmptyObject.ts: Expected a plain object, got ${object === null ? 'null' : typeof object}`)

  for (const property in object) {
    if (Object.hasOwn(object, property)) {
      return false
    }
  }

  return true
}
