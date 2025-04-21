Your goal is to suggest instances where you can use `es-toolkit` (similar to `lodash`) functions instead of custom implementations in this file. The available functions are (they are prefixed with `use` in this Nuxt project):

## Functions

### Array Utilities

- `useAt`
- `useChunk`
- `useCompact`
- `useCountBy`
- `useDifference`
- `useDifferenceBy`
- `useDifferenceWith`
- `useDrop`
- `useDropRight`
- `useDropRightWhile`
- `useDropWhile`
- `useFill`
- `useFlatMap`
- `useFlatMapDeep`
- `useFlatten`
- `useFlattenDeep`
- `useForEachRight`
- `useGroupBy`
- `useHeadArray`
- `useInitial`
- `useIntersection`
- `useIntersectionBy`
- `useIntersectionWith`
- `useIsSubset`
- `useIsSubsetWith`
- `useKeyBy`
- `useLast`
- `useMaxBy`
- `useMinBy`
- `useOrderBy`
- `usePartition`
- `usePull`
- `usePullAt`
- `useRemove`
- `useSample`
- `useSampleSize`
- `useShuffle`
- `useSortBy`
- `useTail`
- `useTake`
- `useTakeRight`
- `useTakeRightWhile`
- `useTakeWhile`
- `useToFilled`
- `useUnion`
- `useUnionBy`
- `useUnionWith`
- `useUniq`
- `useUniqBy`
- `useUniqWith`
- `useUnzip`
- `useUnzipWith`
- `useWindowed`
- `useWithout`
- `useXor`
- `useXorBy`
- `useXorWith`
- `useZip`
- `useZipObject`
- `useZipWith`

### Function Utilities

- `useAfter`
- `useAry`
- `useAsyncNoop`
- `useBefore`
- `useCurry`
- `useCurryRight`
- `useDebounce`
- `useFlow`
- `useFlowRight`
- `useIdentity`
- `useMemoize`
- `useNegate`
- `useNoop`
- `useOnce`
- `usePartial`
- `usePartialRight`
- `useRest`
- `useRetry`
- `useSpread`
- `useThrottle`
- `useUnary`

### Math Utilities

- `useClamp`
- `useInRange`
- `useMean`
- `useMeanBy`
- `useMedian`
- `useMedianBy`
- `useRandom`
- `useRandomInt`
- `useRange`
- `useRangeRight`
- `useRound`
- `useSum`
- `useSumBy`

### Object Utilities

- `useClone`
- `useCloneDeep`
- `useCloneDeepWith`
- `useFindKey`
- `useFlattenObject`
- `useInvert`
- `useMapKeys`
- `useMapValues`
- `useMerge`
- `useMergeWith`
- `useOmit`
- `useOmitBy`
- `usePick`
- `usePickBy`
- `useToMerged`

### Predicates

- `useIsArrayBuffer`
- `useIsBlob`
- `useIsBoolean`
- `useIsBuffer`
- `useIsDate`
- `useIsEqual`
- `useIsEqualWith`
- `useIsError`
- `useIsFile`
- `useIsFunction`
- `useIsJSONArray`
- `useIsJSONObject`
- `useIsJSONValue`
- `useIsLength`
- `useIsMap`
- `useIsPlainObject`
- `useIsPrimitive`
- `useIsPromise`
- `useIsRegExp`
- `useIsSet`
- `useIsString`
- `useIsSymbol`
- `useIsTypedArray`
- `useIsUndefined`
- `useIsWeakMap`
- `useIsWeakSet`

### String Utilities

- `useCamelCase`
- `useCapitalize`
- `useConstantCase`
- `useDeburr`
- `useEscape`
- `useEscapeRegExp`
- `useKebabCase`
- `useLowerCase`
- `useLowerFirst`
- `usePad`
- `usePascalCase`
- `useReverseString`
- `useSnakeCase`
- `useStartCase`
- `useTrim`
- `useTrimEnd`
- `useTrimStart`
- `useUnescape`
- `useUpperCase`
- `useUpperFirst`
- `useWords`

### Utility Functions

- `useInvariant`

## Requirements

- For each instance you suggest, provide a brief explanation of why the `es-toolkit` function is better than a custom implementation.
- Ask before implementing each unique function. If accepted; implement, fix potential errors, and run tests before continuing to the next function.
- The goal is to make the codebase more maintainable and readable, not to add unnecessary complexity.
- Changes should be as small as possible, allowing for small commits that can be easily reverted if needed.
- Do not use any other functions from `es-toolkit` than those listed above.
- Do not add any imports, the functions are auto-imported.
- Do not use `useIsEqual` for primitive values.
- Also check for potential usages of utility functions in the `utils` folder, e.g. `isEmpty` for checking if an object is empty.
