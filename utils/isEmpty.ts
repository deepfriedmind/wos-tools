/**
 * Checks if an object has no own enumerable properties.
 *
 * @param object - The object to check for properties
 * @returns `true` if the object has no own enumerable properties, `false` otherwise
 * @throws {TypeError} If the provided value is not an object type or is undefined
 * @example
 * ```ts
 * isEmpty({}) // => true
 * isEmpty({ key: 'value' }) // => false
 * ```
 */
export default function isEmpty(object: Record<string, unknown>) {
  if (typeof object !== 'object' || object === null || object === undefined) {
    const type = object === null ? 'null' : typeof object
    throw new TypeError(
      `isEmpty.ts: Expected object, got ${type}`,
    )
  }

  for (const property in object) {
    if (Object.hasOwn(object, property)) {
      return false
    }
  }

  return true
}
