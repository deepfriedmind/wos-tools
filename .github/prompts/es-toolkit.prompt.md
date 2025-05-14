Analyze this file and suggest instances where you can use `es-toolkit` (similar to `lodash`) functions instead of custom implementations.

Requirements:

- Check the documentation below for the functions/features you need to use.
- The function names are prefixed with `use` in this project, e.g. `useIsEqual` instead of `isEqual`.
- Do NOT add imports from es-toolkit, it's auto-imported by the framework.
- Do NOT use the following functions:
  - `useClone` (prefer spread syntax)
  - `useCloneDeep` when `structuredClone` is sufficient
  - `isNil`
  - `isNotNil`
  - `isNull`
- Do NOT use any functions that are NOT listed in the documentation below.
- Do NOT use `isEqual` for primitive values.
- The goal is to make the codebase more maintainable and readable, not to add unnecessary complexity.
- For each instance you suggest, provide a brief explanation of how the `es-toolkit` function could be preferable to a custom implementation.
- Do NOT point out instances where `es-toolkit` functions are already used or where changes are not needed.
- Do NOT suggest any functions that are NOT listed in the documentation below.
- Ask before implementing each unique function. If accepted; implement, fix potential errors, and run tests (if applicable) before continuing to the next function.
- Changes should be as small as possible, allowing for small commits that can be easily reverted if needed.
- Also check for potential usages of utility functions in the `utils` folder, e.g. [`isEmptyObject`](../../utils/isEmptyObject.ts) for checking if an object is empty.

# es-toolkit docs

> A modern JavaScript utility library that's 2-3 times faster and up to 97% smaller—a major upgrade to lodash.

## Array

- [at](../docs/es-toolkit/array/at.md): Retrieves elements from an array at the specified indices.
- [chunk](../docs/es-toolkit/array/chunk.md): Splits an array into smaller arrays of a specified length.
- [compact](../docs/es-toolkit/array/compact.md): Removes falsey values (`false`, `null`, `0`, `0n`, ``, `undefined`, `NaN`) from an array.
- [countBy](../docs/es-toolkit/array/countBy.md): Count the occurrences of each item in an array based on a `mapper` function.
- [difference](../docs/es-toolkit/array/difference.md): Computes the difference between two arrays.
- [differenceBy](../docs/es-toolkit/array/differenceBy.md): Computes the difference between two arrays after mapping their elements through a provided function.
- [differenceWith](../docs/es-toolkit/array/differenceWith.md): Computes the difference between two arrays based on a custom equality function.
- [drop](../docs/es-toolkit/array/drop.md): Removes a specified number of elements from the beginning of an array and returns the rest.
- [dropRight](../docs/es-toolkit/array/dropRight.md): Removes a specified number of elements from the end of an array and returns the rest.
- [dropRightWhile](../docs/es-toolkit/array/dropRightWhile.md): Removes elements from the end of an array until the predicate returns `false`.
- [dropWhile](../docs/es-toolkit/array/dropWhile.md): Removes elements from the beginning of an array until the predicate returns `false`.
- [fill](../docs/es-toolkit/array/fill.md): Fills elements of an array with a specified value from the start position up to, but not including, the end position.
- [flatMap](../docs/es-toolkit/array/flatMap.md): Map each element of a nested array to a given iteratee function, then flatten it to the desired depth.
- [flatMapDeep](../docs/es-toolkit/array/flatMapDeep.md): Map each element of a nested array to the given iteratee function, then unpack and flatten all depths.
- [flatten](../docs/es-toolkit/array/flatten.md): Flattens the nested array given as an argument to the desired depth.
- [flattenDeep](../docs/es-toolkit/array/flattenDeep.md): Flattens all depths of a nested array.
- [forEachRight](../docs/es-toolkit/array/forEachRight.md): Iterates over elements of `arr` from right to left and invokes `callback` for each element.
- [groupBy](../docs/es-toolkit/array/groupBy.md): Groups the elements of an array based on a provided key-generating function.
- [head](../docs/es-toolkit/array/head.md): Returns the first element of an array.
- [initial](../docs/es-toolkit/array/initial.md): Returns a new array containing all elements except the last one from the input array.
- [intersection](../docs/es-toolkit/array/intersection.md): Returns the intersection of two arrays.
- [intersectionBy](../docs/es-toolkit/array/intersectionBy.md): Returns the intersection of two arrays based on a mapping function.
- [intersectionWith](../docs/es-toolkit/array/intersectionWith.md): Returns the intersection of two arrays based on a custom equality function.
- [isSubset](../docs/es-toolkit/array/isSubset.md): Checks if the `subset` array is entirely contained within the `superset` array.
- [isSubsetWith](../docs/es-toolkit/array/isSubsetWith.md): Checks if the `subset` array is entirely contained within the `superset` array.
- [keyBy](../docs/es-toolkit/array/keyBy.md): Maps each element of an array based on a provided key-generating function.
- [last](../docs/es-toolkit/array/last.md): Returns the last element of an array.
- [maxBy](../docs/es-toolkit/array/maxBy.md): Finds the element in an array that has the maximum value when applying the `getValue` function to each element.
- [minBy](../docs/es-toolkit/array/minBy.md): Finds the element in an array that has the minimum value when applying the `getValue` function to each element.
- [orderBy](../docs/es-toolkit/array/orderBy.md): Sorts an array of objects based on the given `criteria` and their corresponding order directions.
- [partition](../docs/es-toolkit/array/partition.md): Splits an array into two groups based on a predicate function.
- [pull](../docs/es-toolkit/array/pull.md): Removes all specified values from an array.
- [pullAt](../docs/es-toolkit/array/pullAt.md): Removes elements from an array at specified indices and returns the removed elements.
- [remove](../docs/es-toolkit/array/remove.md): Removes elements from an array based on a predicate function.
- [sample](../docs/es-toolkit/array/sample.md): Returns a random element from an array.
- [sampleSize](../docs/es-toolkit/array/sampleSize.md): Returns a sample element array of a specified `size`.
- [shuffle](../docs/es-toolkit/array/shuffle.md): Randomizes the order of elements in an array using the Fisher-Yates algorithm.
- [sortBy](../docs/es-toolkit/array/sortBy.md): Sorts an array of objects based on the given `criteria`.
- [tail](../docs/es-toolkit/array/tail.md): Returns a new array with all elements except for the first.
- [take](../docs/es-toolkit/array/take.md): Returns a new array containing the first `count` elements from the input array `arr`.
- [takeRight](../docs/es-toolkit/array/takeRight.md): Returns a new array containing the last `count` elements from the input array `arr`.
- [takeRightWhile](../docs/es-toolkit/array/takeRightWhile.md): Takes elements from the end of the array while the predicate function returns `true`.
- [takeWhile](../docs/es-toolkit/array/takeWhile.md): Returns a new array containing the leading elements of the provided array
- [toFilled](../docs/es-toolkit/array/toFilled.md): Creates a new array filled with a specified value from the start position up to, but not including, the end position.
- [union](../docs/es-toolkit/array/union.md): Creates an array of unique values from all given arrays.
- [unionBy](../docs/es-toolkit/array/unionBy.md): Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.
- [unionWith](../docs/es-toolkit/array/unionWith.md): Creates an array of unique values from two given arrays based on a custom equality function.
- [uniq](../docs/es-toolkit/array/uniq.md): Creates a duplicate-free version of an array.
- [uniqBy](../docs/es-toolkit/array/uniqBy.md): Returns a new array containing only the unique elements from the original array, based on the values returned by the `mapper` function.
- [uniqWith](../docs/es-toolkit/array/uniqWith.md): Returns a new array containing only the unique elements from the original array, based on the values returned by the comparator function.
- [unzip](../docs/es-toolkit/array/unzip.md): Gathers elements in the same position in an internal array from a grouped array of elements and returns them as a new array.
- [unzipWith](../docs/es-toolkit/array/unzipWith.md): Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
- [windowed](../docs/es-toolkit/array/windowed.md): Creates an array of sub-arrays (windows) from the input array, each of the specified size.
- [without](../docs/es-toolkit/array/without.md): Creates an array that excludes all specified values.
- [xor](../docs/es-toolkit/array/xor.md): Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
- [xorBy](../docs/es-toolkit/array/xorBy.md): Computes the symmetric difference between two arrays using a custom mapping function.
- [xorWith](../docs/es-toolkit/array/xorWith.md): Computes the symmetric difference between two arrays using a custom equality function.
- [zip](../docs/es-toolkit/array/zip.md): Combines multiple arrays into a single array of tuples.
- [zipObject](../docs/es-toolkit/array/zipObject.md): Combines two arrays, one of property names and one of corresponding values, into a single object.
- [zipWith](../docs/es-toolkit/array/zipWith.md): Combines multiple arrays into a single array using a custom combiner function.

## Error

- [AbortError](../docs/es-toolkit/error/AbortError.md): An error class representing an operation that was aborted.
- [TimeoutError](../docs/es-toolkit/error/TimeoutError.md): An error class representing an timeout.

## Function

- [after](../docs/es-toolkit/function/after.md): Creates a function that only executes starting from the `n`-th call.
- [ary](../docs/es-toolkit/function/ary.md): Creates a function that invokes func, with up to `n` arguments, ignoring any additional arguments.
- [asyncNoop](../docs/es-toolkit/function/asyncNoop.md): An asynchronous no-operation function that does nothing. This can be used as a placeholder or default function.
- [before](../docs/es-toolkit/function/before.md): Creates a new function that limits the number of times the given function (`func`) can be called.
- [curry](../docs/es-toolkit/function/curry.md): Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
- [curryRight](../docs/es-toolkit/function/curryRight.md): Curries a function from right to left, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
- [debounce](../docs/es-toolkit/function/debounce.md): Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
- [flow](../docs/es-toolkit/function/flow.md): Creates a new function that executes the given functions in sequence. The return value of the previous function is passed as an argument to the next function.
- [flowRight](../docs/es-toolkit/function/flowRight.md): Creates a new function that executes the given functions in sequence from right to left. The return value of the previous function is passed as an argument to the next function.
- [identity](../docs/es-toolkit/function/identity.md): Returns the input value unchanged.
- [memoize](../docs/es-toolkit/function/memoize.md): Creates a memoized version of the provided function. The memoized function caches
- [negate](../docs/es-toolkit/function/negate.md): Creates a function that negates the result of the predicate function.
- [noop](../docs/es-toolkit/function/noop.md): A no-operation function that does nothing. This can be used as a placeholder or default function.
- [once](../docs/es-toolkit/function/once.md): Creates a function that is restricted to invoking the provided function `func` once.
- [partial](../docs/es-toolkit/function/partial.md): Creates a function that invokes `func` with `partialArgs` prepended to the arguments it receives.
- [partialRight](../docs/es-toolkit/function/partialRight.md): Creates a function that invokes `func` with `partialArgs` appended to the arguments it receives.
- [rest](../docs/es-toolkit/function/rest.md): Creates a function that transforms the arguments of the provided function `func`.
- [retry](../docs/es-toolkit/function/retry.md): Retries a function that returns a `Promise` until it succeeds. You can specify how many times to retry and the delay between each attempt.
- [spread](../docs/es-toolkit/function/spread.md): Creates a new function that spreads elements of an array argument into individual arguments for the original function.
- [throttle](../docs/es-toolkit/function/throttle.md): Creates a throttled function that only invokes the provided function at most once
- [unary](../docs/es-toolkit/function/unary.md): Creates a function that accepts up to one argument, ignoring any additional arguments.

## Math

- [clamp](../docs/es-toolkit/math/clamp.md): Clamps a number within the inclusive lower and upper bounds.
- [inRange](../docs/es-toolkit/math/inRange.md): Checks if the value is within a specified range.
- [mean](../docs/es-toolkit/math/mean.md): Calculates the average of an array of numbers.
- [meanBy](../docs/es-toolkit/math/meanBy.md): Calculates the average of an array of numbers when applying the `getValue` function to each element.
- [median](../docs/es-toolkit/math/median.md): Calculates the median of an array of numbers.
- [medianBy](../docs/es-toolkit/math/medianBy.md): Calculates the median of an array of elements when applying the `getValue` function to each element.
- [random](../docs/es-toolkit/math/random.md): Generate a random number within the given range. The number can be an integer or a decimal.
- [randomInt](../docs/es-toolkit/math/randomInt.md): Generate a random integer within the given range.
- [range](../docs/es-toolkit/math/range.md): Returns an array of numbers from `start` to `end`, incrementing by `step`.
- [rangeRight](../docs/es-toolkit/math/rangeRight.md): Returns an array of numbers from `end` to `start`, decrementing by `step`.
- [round](../docs/es-toolkit/math/round.md): Rounds a number to a specified precision.
- [sum](../docs/es-toolkit/math/sum.md): Calculates the sum of an array of numbers.
- [sumBy](../docs/es-toolkit/math/sumBy.md): Calculates the sum of an array of numbers when applying the `getValue` function to each element.

## Object

- [clone](../docs/es-toolkit/object/clone.md): Creates a shallow clone of the given objects.
- [cloneDeep](../docs/es-toolkit/object/cloneDeep.md): Creates a deep copy of the given object.
- [cloneDeepWith](../docs/es-toolkit/object/cloneDeepWith.md): Deeply clones the given object.
- [findKey](../docs/es-toolkit/object/findKey.md): Finds the key of the first element in the object that satisfies the provided testing function.
- [flattenObject](../docs/es-toolkit/object/flattenObject.md): Flattens a nested object into a single-level object with dot-separated keys.
- [invert](../docs/es-toolkit/object/invert.md): Creates a new object by swapping the keys and values of the given object.
- [mapKeys](../docs/es-toolkit/object/mapKeys.md): Creates a new object with the same values as the given object, but with keys generated by running each own enumerable property of the object through the `getNewKey` function.
- [mapValues](../docs/es-toolkit/object/mapValues.md): Creates a new object with the same keys as the given object, but with values generated
- [merge](../docs/es-toolkit/object/merge.md): Merges the properties of the source object into the target object.
- [mergeWith](../docs/es-toolkit/object/mergeWith.md): Merges the properties of the source object into the target object.
- [omit](../docs/es-toolkit/object/omit.md): Creates a new object with specified keys omitted.
- [omitBy](../docs/es-toolkit/object/omitBy.md): Creates a new object composed of the properties that do not satisfy the predicate function.
- [pick](../docs/es-toolkit/object/pick.md): Creates a new object composed of the picked object properties.
- [pickBy](../docs/es-toolkit/object/pickBy.md): Creates a new object composed of the properties that satisfy the predicate function.
- [toCamelCaseKeys](../docs/es-toolkit/object/toCamelCaseKeys.md): Creates a new object composed of the properties with keys converted to camel case (`camelCase`).
- [toMerged](../docs/es-toolkit/object/toMerged.md): Merges the properties of the source object into the target object.
- [toSnakeCaseKeys](../docs/es-toolkit/object/toSnakeCaseKeys.md): Creates a new object composed of the properties with keys converted to snake case (`snake_case`).

## Predicate

- [isArrayBuffer](../docs/es-toolkit/predicate/isArrayBuffer.md): Checks if the given value is a `ArrayBuffer`.
- [isBlob](../docs/es-toolkit/predicate/isBlob.md): Checks if the given value is a Blob.
- [isBoolean](../docs/es-toolkit/predicate/isBoolean.md): Checks if the given value is a boolean.
- [isBrowser](../docs/es-toolkit/predicate/isBrowser.md): Checks if the current environment is a browser.
- [isBuffer](../docs/es-toolkit/predicate/isBuffer.md): Checks if the given value is a Buffer instance.
- [isDate](../docs/es-toolkit/predicate/isDate.md): Check if the given value is a Date object.
- [isEqual](../docs/es-toolkit/predicate/isEqual.md): The `isEqual` function checks if two values are equal, including support for `Date`, `RegExp`, and deep object comparison.
- [isEqualWith](../docs/es-toolkit/predicate/isEqualWith.md): Compares two values for equality using a custom comparison function.
- [isError](../docs/es-toolkit/predicate/isError.md): Check if the given value is an Error object.
- [isFile](../docs/es-toolkit/predicate/isFile.md): Checks if the given value is a `File`.
- [isFunction](../docs/es-toolkit/predicate/isFunction.md): Checks if `value` is a function.
- [isJSON](../docs/es-toolkit/predicate/isJSON.md): Checks if a given value is a valid JSON string.
- [isJSONArray](../docs/es-toolkit/predicate/isJSONArray.md): Checks if a given value is a valid JSON array.
- [isJSONObject](../docs/es-toolkit/predicate/isJSONObject.md): Checks if a value is a JSON object.
- [isJSONValue](../docs/es-toolkit/predicate/isJSONValue.md): Checks if a given value is a valid JSON value.
- [isLength](../docs/es-toolkit/predicate/isLength.md): Checks if a given value is a valid length.
- [isMap](../docs/es-toolkit/predicate/isMap.md): Checks if the given value is a `Map`.
- [isNil](../docs/es-toolkit/predicate/isNil.md): Checks if a given value is null or undefined.
- [isNode](../docs/es-toolkit/predicate/isNode.md): Checks if the current environment is Node.js.
- [isNotNil](../docs/es-toolkit/predicate/isNotNil.md): Checks if the given value is not null nor undefined.
- [isNull](../docs/es-toolkit/predicate/isNull.md): Checks if the given value is null.
- [isPlainObject](../docs/es-toolkit/predicate/isPlainObject.md): Checks if a value is a plain object.
- [isPrimitive](../docs/es-toolkit/predicate/isPrimitive.md): Checks whether a value is a JavaScript primitive.
- [isPromise](../docs/es-toolkit/predicate/isPromise.md): Checks if a given value is `Promise`.
- [isRegExp](../docs/es-toolkit/predicate/isRegExp.md): Check if the given value is a regular expression.
- [isSet](../docs/es-toolkit/predicate/isSet.md): Checks if the given value is a `Set`.
- [isString](../docs/es-toolkit/predicate/isString.md): Checks if the given value is a string.
- [isSymbol](../docs/es-toolkit/predicate/isSymbol.md): Check whether a value is a symbol.
- [isTypedArray](../docs/es-toolkit/predicate/isTypedArray.md): Checks if a value is a TypedArray.
- [isUndefined](../docs/es-toolkit/predicate/isUndefined.md): Checks if the given value is `undefined`.
- [isWeakMap](../docs/es-toolkit/predicate/isWeakMap.md): Checks if the given value is a `WeakMap`.
- [isWeakSet](../docs/es-toolkit/predicate/isWeakSet.md): Checks if the given value is a `WeakSet`.

## Promise

- [delay](../docs/es-toolkit/promise/delay.md): Delays the execution of code for a specified number of milliseconds.
- [Mutex](../docs/es-toolkit/promise/Mutex.md): A mutex (mutual exclusion lock) for async functions.
- [Semaphore](../docs/es-toolkit/promise/Semaphore.md): A counting semaphore for async functions that manages available permits.
- [timeout](../docs/es-toolkit/promise/timeout.md): Returns a `Promise` that rejects with a `TimeoutError` after the specified timeout.
- [withTimeout](../docs/es-toolkit/promise/withTimeout.md): Executes an async function and enforces a timeout.

## String

- [camelCase](../docs/es-toolkit/string/camelCase.md): Converts a string to camel case.
- [capitalize](../docs/es-toolkit/string/capitalize.md): Converts the first character of string to upper case and the remaining to lower case.
- [constantCase](../docs/es-toolkit/string/constantCase.md): Converts a string to constant case.
- [deburr](../docs/es-toolkit/string/deburr.md): Converts a string by replacing special characters and diacritical marks with their ASCII equivalents. For example, `Crème brûlée` becomes `Creme brulee`.
- [escape](../docs/es-toolkit/string/escape.md): Converts the characters &, <, >, ", and ' in `str` to their corresponding HTML entities. For example, `<` becomes `&lt;`.
- [kebabCase](../docs/es-toolkit/string/kebabCase.md): Converts a string to kebab case.
- [lowerCase](../docs/es-toolkit/string/lowerCase.md): Converts a string to lower case.
- [lowerFirst](../docs/es-toolkit/string/lowerFirst.md): Converts the first character of string to lower case.
- [pad](../docs/es-toolkit/string/pad.md): Pads string on the left and right sides if its shorter than length. Padding characters are truncated if they cant be evenly divided by length.
- [pascalCase](../docs/es-toolkit/string/pascalCase.md): Converts a string to Pascal case.
- [reverseString](../docs/es-toolkit/string/reverseString.md): Reverses a string.
- [snakeCase](../docs/es-toolkit/string/snakeCase.md): Converts a string to snake case.
- [startCase](../docs/es-toolkit/string/startCase.md): Converts a string to start case.
- [trim](../docs/es-toolkit/string/trim.md): Removes leading and trailing whitespace or specified characters from a string.
- [trimEnd](../docs/es-toolkit/string/trimEnd.md): Removes trailing whitespace or specified characters from a string.
- [trimStart](../docs/es-toolkit/string/trimStart.md): Removes leading whitespace or specified characters from a string.
- [unescape](../docs/es-toolkit/string/unescape.md): Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `str` to their corresponding characters. It is the inverse of `escape`.
- [upperCase](../docs/es-toolkit/string/upperCase.md): Converts a string to upper case.
- [upperFirst](../docs/es-toolkit/string/upperFirst.md): Converts the first character of string to upper case.
- [words](../docs/es-toolkit/string/words.md): Splits a string into an array of words. It can recognize both ASCII and Unicode characters as words.
- [escapeRegExp](../docs/es-toolkit/string/escapeRegExp.md): Escapes the RegExp special characters `^`, `$`, `\`, `.`, `\*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, and `

## Util

- [attempt](../docs/es-toolkit/util/attempt.md): Attempts to execute a function and returns a tuple containing either the result or an error.
- [attemptAsync](../docs/es-toolkit/util/attemptAsync.md): Attempts to execute an async function and returns a tuple containing either the result or an error.
- [invariant](../docs/es-toolkit/util/invariant.md): Asserts that a given condition is true. If the condition is false, an error is thrown with the provided message.
