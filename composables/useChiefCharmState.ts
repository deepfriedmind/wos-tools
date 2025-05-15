import type {
  CharmCalculatorState,
  CharmMaterialInfo,
  CharmMaterialKey,
  CharmUpgradeLevel,
} from '~/types/chief-charm'
import type { GearPiece } from '~/types/chief-gear'

export default function useChiefCharmState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  const defaultGearState = Object.fromEntries(
    GEAR_PIECES.map(gearPiece => [
      gearPiece.id,
      Object.fromEntries(
        useRange(0, CHARM_SLOTS_PER_GEAR).map(slotIndex => [
          slotIndex,
          { from: undefined, to: undefined },
        ]),
      ),
    ]),
  ) as CharmCalculatorState['gear']

  const defaultInventoryState: Record<CharmMaterialKey, number> = {
    charmDesign: 0,
    charmGuide: 0,
    charmSecret: 0,
  }

  const defaultState: CharmCalculatorState = {
    gear: defaultGearState,
    inventory: defaultInventoryState,
  }

  const state = useLocalStorage<CharmCalculatorState>(`${STORAGE_PREFIX}chief-charm-calculator-state`, defaultState, {
    initOnMounted: true,
    // Deep merge stored state with current defaults to handle potential structure changes
    mergeDefaults: (storageValue, defaults) => useToMerged(storageValue, defaults),
  })

  const queryParameters = computed(() => {
    const parameters: Record<string, string> = {}
    let hasAnyParameter = false

    for (const gearPiece of GEAR_PIECES) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        const charmState = state.value.gear[gearPiece.id][slotIndex]

        if (charmState?.from != null) {
          parameters[`${gearPiece.id}_${slotIndex}_from`] = charmState.from
          hasAnyParameter = true
        }

        if (charmState?.to != null) {
          parameters[`${gearPiece.id}_${slotIndex}_to`] = charmState.to
          hasAnyParameter = true
        }
      }
    }

    for (const material of CHARM_MATERIALS as ReadonlyArray<CharmMaterialInfo>) {
      const inventoryAmount = state.value.inventory[material.key]

      if (inventoryAmount > 0) {
        parameters[`inv_${material.key}`] = String(inventoryAmount)
        hasAnyParameter = true
      }
    }

    return { hasAnyParameter, parameters }
  })

  const selectOptions = CHARM_UPGRADE_DATA.map((level: CharmUpgradeLevel) => ({
    id: level.id,
    label: `Lv. ${level.level}`,
  }))

  // Filter 'From' options to exclude the last level since you can't upgrade from it
  const filteredFromOptions = computed(() => useInitial(selectOptions))

  function getFilteredToOptions(fromId: string | undefined) {
    if (fromId === undefined || fromId === '')
      return selectOptions // Return all if no 'From' selected

    const fromLevel: CharmUpgradeLevel | undefined = CHARM_UPGRADE_LEVEL_MAP.get(fromId)

    if (fromLevel === undefined)
      return selectOptions

    return selectOptions.filter((levelOption: { id: string, label: string }) => {
      const levelData: CharmUpgradeLevel | undefined = CHARM_UPGRADE_LEVEL_MAP.get(levelOption.id)

      // Ensure both fromLevel and levelData exist before comparing index
      return levelData != null && fromLevel != null && levelData.index > fromLevel.index
    })
  }

  const hasAnySelectionOrInventory = computed(() => {
    for (const gearId in state.value.gear) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        const slotData = state.value.gear[gearId as GearPiece['id']][slotIndex]

        if (slotData == null)
          continue

        const { from, to } = slotData

        if ((from != null && from !== '') || (to != null && to !== ''))
          return true
      }
    }
    for (const materialKey in state.value.inventory) {
      if (state.value.inventory[materialKey as CharmMaterialKey] > 0)
        return true
    }

    return false
  })

  function clearAll() {
    state.value = structuredClone(defaultState)
  }

  function handleFromChange(gearId: GearPiece['id'], slotIndex: number, newFromId: string | undefined, autoSetNext = true) {
    if (!Object.prototype.hasOwnProperty.call(state.value.gear[gearId], slotIndex)) {
      state.value.gear[gearId][slotIndex] = { from: undefined, to: undefined }
    }

    const currentCharmState = state.value.gear[gearId][slotIndex]
    currentCharmState.from = newFromId

    const fromLevel = (newFromId != null && newFromId !== '') ? CHARM_UPGRADE_LEVEL_MAP.get(newFromId) : undefined
    const currentToLevel = (currentCharmState.to != null && currentCharmState.to !== '') ? CHARM_UPGRADE_LEVEL_MAP.get(currentCharmState.to) : undefined

    // If 'From' is cleared or invalid, clear 'To'
    if (fromLevel === undefined) {
      currentCharmState.to = undefined

      return
    }

    const isNotLastLevel = fromLevel.index < CHARM_UPGRADE_DATA.length - 1
    const isToInvalid = !currentToLevel || currentToLevel.index <= fromLevel.index

    if (isNotLastLevel) {
      if (isToInvalid) {
        // If 'To' is invalid or non-existent, set it to the next level (if autoSetNext) or clear it
        const nextLevel = CHARM_UPGRADE_DATA[fromLevel.index + 1]
        currentCharmState.to = autoSetNext ? nextLevel.id : undefined
      }
      // If 'To' is valid and greater than 'From', keep it.
    }
    else {
      // If 'From' is the last level, clear 'To'
      currentCharmState.to = undefined
    }
  }

  function handleToChange(gearId: GearPiece['id'], slotIndex: number, newToId: string | undefined) {
    if (!Object.prototype.hasOwnProperty.call(state.value.gear[gearId], slotIndex)) {
      state.value.gear[gearId][slotIndex] = { from: undefined, to: undefined }
    }

    state.value.gear[gearId][slotIndex].to = newToId
  }

  function loadStateFromURL() {
    let needsUpdate = false
    const { query } = route

    for (const gearPiece of GEAR_PIECES) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        if (!Object.prototype.hasOwnProperty.call(state.value.gear[gearPiece.id], slotIndex)) {
          state.value.gear[gearPiece.id][slotIndex] = { from: undefined, to: undefined }
        }

        const fromParameter = query[`${gearPiece.id}_${slotIndex}_from`] as string | undefined
        const toParameter = query[`${gearPiece.id}_${slotIndex}_to`] as string | undefined

        if (fromParameter != null && fromParameter !== '' && CHARM_UPGRADE_LEVEL_MAP.has(fromParameter)) {
          state.value.gear[gearPiece.id][slotIndex].from = fromParameter
          needsUpdate = true
        }

        if (toParameter != null && toParameter !== '' && CHARM_UPGRADE_LEVEL_MAP.has(toParameter)) {
          state.value.gear[gearPiece.id][slotIndex].to = toParameter
          needsUpdate = true
        }
      }
    }

    for (const material of CHARM_MATERIALS as ReadonlyArray<CharmMaterialInfo>) {
      const invParameter = query[`inv_${material.key}`] as string | undefined

      if (invParameter != null && invParameter !== '') {
        const amount = Number.parseInt(invParameter)

        if (!Number.isNaN(amount) && amount >= 0) {
          state.value.inventory[material.key] = amount
          needsUpdate = true
        }
      }
    }

    // If state was loaded from URL or storage, ensure 'To' levels are valid relative to 'From'
    if (needsUpdate) {
      for (const gearPiece of GEAR_PIECES) {
        for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
          if (Object.prototype.hasOwnProperty.call(state.value.gear[gearPiece.id], slotIndex)) {
            handleFromChange(gearPiece.id, slotIndex, state.value.gear[gearPiece.id][slotIndex].from, false) // Don't auto-set 'To' when loading/fixing
          }
        }
      }

      // Trigger immediate URL update if loaded state caused changes
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
    loadStateFromURL, // Expose this for testing
    queryParameters,
    selectOptions,
    state,
  }
}
