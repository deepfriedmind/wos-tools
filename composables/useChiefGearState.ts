import type {
  CalculatorState,
  LevelGroupOption,
  Material,
} from '~/types/chief-gear'

export default function useChiefGearState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  const defaultState: CalculatorState = {
    gear: {
      coat: { from: undefined, to: undefined },
      cudgel: { from: undefined, to: undefined },
      hat: { from: undefined, to: undefined },
      pants: { from: undefined, to: undefined },
      ring: { from: undefined, to: undefined },
      watch: { from: undefined, to: undefined },
    },
    inventory: {
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    },
  }

  const state = useLocalStorage<CalculatorState>(`${STORAGE_PREFIX}chief-gear-calculator-state`, defaultState, {
    initOnMounted: true,
    // Deep merge stored state with current defaults to handle potential structure changes
    mergeDefaults: (storageValue, defaults) => useToMerged(storageValue, defaults),
  })

  const queryParameters = computed(() => {
    const parameters: Record<string, string> = {}
    let hasAnyParameter = false

    for (const gearPiece of GEAR_PIECES) {
      const gearState = state.value.gear[gearPiece.id]

      if (gearState.from != null) {
        parameters[`${gearPiece.id}_from`] = gearState.from
        hasAnyParameter = true
      }

      if (gearState.to != null) {
        parameters[`${gearPiece.id}_to`] = gearState.to
        hasAnyParameter = true
      }
    }

    for (const material of MATERIALS) {
      const inventoryAmount = state.value.inventory[material.key]

      if (inventoryAmount > 0) {
        parameters[`inv_${material.key}`] = String(inventoryAmount)
        hasAnyParameter = true
      }
    }

    return { hasAnyParameter, parameters }
  })

  const selectOptions = (() => {
    const groupedLevels = useGroupBy(UPGRADE_DATA, level => level.baseTier)
    const baseTierOrder = ['Green', 'Blue', 'Purple', 'Gold', 'Red']

    return baseTierOrder
      .filter(baseTier => groupedLevels[baseTier] != null && groupedLevels[baseTier].length > 0)
      .map(baseTier => ({
        levels: groupedLevels[baseTier].map(level => ({ id: level.id, label: level.label })),
        tier: baseTier,
      }))
  })()

  // Filter 'From' options to exclude the last level since you can't upgrade from it
  const filteredFromOptions = computed(() => {
    const result = [...selectOptions]
    const lastGroupIndex = result.length - 1
    const lastGroup = result[lastGroupIndex]
    result[lastGroupIndex] = {
      ...lastGroup,
      levels: useInitial(lastGroup.levels),
    }

    return result
  })

  function getFilteredToOptions(fromId: string | undefined) {
    if (fromId === undefined || fromId === '')
      return selectOptions // Return all if no 'From' selected

    const fromLevel = UPGRADE_LEVEL_MAP.get(fromId)

    if (fromLevel === undefined)
      return selectOptions

    const filteredGroups: LevelGroupOption[] = []
    for (const group of selectOptions) {
      const filteredLevels = group.levels.filter((levelOption) => {
        const levelData = UPGRADE_LEVEL_MAP.get(levelOption.id)

        return levelData != null && levelData.index > fromLevel.index
      })

      if (filteredLevels.length > 0) {
        filteredGroups.push({ levels: filteredLevels, tier: group.tier })
      }
    }

    return filteredGroups
  }

  const hasAnySelectionOrInventory = computed(() => {
    for (const pieceId in state.value.gear) {
      const { from, to } = state.value.gear[pieceId as keyof CalculatorState['gear']]

      if (
        (from != null && from !== '')
        || (to != null && to !== '')) {
        return true
      }
    }
    for (const material in state.value.inventory) {
      if (state.value.inventory[material as Material] > 0)
        return true
    }

    return false
  })

  function clearAll() {
    state.value = structuredClone(defaultState)
  }

  function handleFromChange(gearId: keyof CalculatorState['gear'], newFromId: string | undefined, autoSetNext = true) {
    const currentGearState = state.value.gear[gearId]
    currentGearState.from = newFromId

    const fromLevel = (newFromId != null && newFromId !== '') ? UPGRADE_LEVEL_MAP.get(newFromId) : undefined
    const currentToLevel = (currentGearState.to != null && currentGearState.to !== '') ? UPGRADE_LEVEL_MAP.get(currentGearState.to) : undefined

    // If 'From' is cleared or invalid, clear 'To'
    if (fromLevel === undefined) {
      currentGearState.to = undefined

      return
    }

    const isNotLastLevel = fromLevel.index < UPGRADE_DATA.length - 1
    const isToInvalid = !currentToLevel || currentToLevel.index <= fromLevel.index

    if (isNotLastLevel) {
      if (isToInvalid) {
        // If 'To' is invalid or non-existent, set it to the next level (if autoSetNext) or clear it
        const nextLevel = UPGRADE_DATA[fromLevel.index + 1]
        currentGearState.to = autoSetNext ? nextLevel.id : undefined
      }
      // If 'To' is valid and greater than 'From', keep it.
    }
    else {
      // If 'From' is the last level, clear 'To'
      currentGearState.to = undefined
    }
  }

  function handleToChange(gearId: keyof CalculatorState['gear'], newToId: string | undefined) {
    state.value.gear[gearId].to = newToId
  }

  function loadStateFromURL() {
    let needsUpdate = false
    const { query } = route

    for (const gearPiece of GEAR_PIECES) {
      const fromParameter = query[`${gearPiece.id}_from`] as string | undefined
      const toParameter = query[`${gearPiece.id}_to`] as string | undefined

      if (fromParameter != null && fromParameter !== '' && UPGRADE_LEVEL_MAP.has(fromParameter)) {
        state.value.gear[gearPiece.id].from = fromParameter
        needsUpdate = true
      }

      if (toParameter != null && toParameter !== '' && UPGRADE_LEVEL_MAP.has(toParameter)) {
        state.value.gear[gearPiece.id].to = toParameter
        needsUpdate = true
      }
    }

    for (const material of MATERIALS) {
      const invParameter = query[`inv_${material.key}`] as string | undefined

      if (invParameter != null && invParameter !== '') {
        const amount = Number.parseInt(invParameter)

        if (!Number.isNaN(amount) && amount >= 0) {
          state.value.inventory[material.key] = amount
          needsUpdate = true
        }
      }
    }

    // If state was loaded from URL, ensure 'To' levels are valid relative to 'From'
    // Also, if the stored state had invalid 'To' relative to 'From', fix it.
    if (needsUpdate) {
      for (const gearPiece of GEAR_PIECES) {
        handleFromChange(gearPiece.id, state.value.gear[gearPiece.id].from, false) // Don't auto-set 'To' when loading/fixing
      }

      // Trigger immediate URL update if loaded state caused changes
      // Use void to explicitly ignore the promise returned by router.replace
      void router.replace({ query: queryParameters.value.parameters })
    }

    return needsUpdate
  }

  onMounted(() => {
    loadStateFromURL()
  })

  watchDebounced(queryParameters, (newParameters) => {
    if (!useIsEqual(newParameters.parameters, route.query))
      void router.replace({ query: newParameters.parameters })
  }, { debounce: 300, deep: true })

  return {
    clearAll,
    filteredFromOptions,
    getFilteredToOptions,
    handleFromChange,
    handleToChange,
    hasAnySelectionOrInventory,
    queryParameters,
    selectOptions,
    state,
  }
}
