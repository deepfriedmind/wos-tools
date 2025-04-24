import type {
  CharmCalculatorState,
  CharmMaterialInfo,
  CharmMaterialKey,
  CharmSelection,
  CharmUpgradeLevel,
} from '~/types/chief-charm'
import type { GearPiece } from '~/types/chief-gear'

export default function useChiefCharmState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  // Dynamically create default state based on GEAR_PIECES and CHARM_SLOTS_PER_GEAR
  const defaultGearState = Object.fromEntries(
    GEAR_PIECES.map((gearPiece: GearPiece) => [
      gearPiece.id,
      Object.fromEntries(
        useRange(0, CHARM_SLOTS_PER_GEAR - 1).map((slotIndex: number): [number, CharmSelection] => [
          slotIndex,
          { from: undefined, to: undefined },
        ]),
      ),
    ]),
  ) as CharmCalculatorState['gear'] // Assert type here

  const defaultInventoryState: Record<CharmMaterialKey, number> = {
    charmDesign: 0,
    charmGuide: 0,
    charmSecret: 0,
  }

  const defaultState: CharmCalculatorState = {
    gear: defaultGearState,
    inventory: defaultInventoryState,
  }

  const state = useLocalStorage<CharmCalculatorState>(`${STORAGE_PREFIX}chief-charm-calculator-state`, () => structuredClone(defaultState), {
    initOnMounted: true,
    mergeDefaults: (storageValue, defaults) => {
      // Custom merger to prevent deep merge issues with nested objects
      const merged = structuredClone(defaults)

      if (storageValue != null) {
        // Merge gear selections
        for (const gearId of GEAR_PIECES.map(p => p.id)) {
          if (storageValue.gear?.[gearId] != null) {
            for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
              if (Object.prototype.hasOwnProperty.call(storageValue.gear[gearId], slotIndex)) {
                merged.gear[gearId][slotIndex] = {
                  ...merged.gear[gearId][slotIndex],
                  ...storageValue.gear[gearId][slotIndex],
                }
              }
            }
          }
        }

        // Merge inventory
        if (storageValue.inventory != null) {
          merged.inventory = { ...merged.inventory, ...storageValue.inventory }
        }
      }

      return merged
    },
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

  // Load state from URL on initial load
  onMounted(() => {
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

    // If state was loaded from URL or storage, ensure 'to' levels are valid relative to 'from'
    if (needsUpdate) {
      for (const gearPiece of GEAR_PIECES) {
        for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
          if (Object.prototype.hasOwnProperty.call(state.value.gear[gearPiece.id], slotIndex)) {
            handleFromChange(gearPiece.id, slotIndex, state.value.gear[gearPiece.id][slotIndex].from, false) // Don't auto-set 'to' when loading/fixing
          }
        }
      }

      // Trigger immediate URL update if loaded state caused changes
      void router.replace({ query: queryParameters.value.parameters })
    }
  })

  watchDebounced(queryParameters, (newParameters) => {
    if (!useIsEqual(newParameters.parameters, route.query))
      void router.replace({ query: newParameters.parameters })
  }, { debounce: 300, deep: true })

  // --- Computed Properties for UI ---

  const selectOptions = computed(() =>
    CHARM_UPGRADE_DATA.map((level: CharmUpgradeLevel) => ({
      id: level.id,
      label: `Lv. ${level.level}`,
    })),
  )

  const filteredFromOptions = computed(() =>
    // Don't include the last level in "from" options
    useInitial(selectOptions.value),
  )

  function getFilteredToOptions(fromId: string | undefined) {
    if (fromId === undefined || fromId === '')
      return selectOptions.value // Return all if no 'from' selected

    const fromLevel: CharmUpgradeLevel | undefined = CHARM_UPGRADE_LEVEL_MAP.get(fromId)

    if (fromLevel === undefined)
      return selectOptions.value

    return selectOptions.value.filter((levelOption: { id: string, label: string }) => {
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

  // --- Methods ---

  function clearAll() {
    const { value: { gear, inventory } } = state
    for (const materialKey of Object.keys(defaultInventoryState) as CharmMaterialKey[]) {
      inventory[materialKey] = defaultInventoryState[materialKey]
    }

    for (const { id } of GEAR_PIECES) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        gear[id][slotIndex] = { from: undefined, to: undefined }
      }
    }
  }

  function handleFromChange(gearId: GearPiece['id'], slotIndex: number, newFromId: string | undefined, autoSetNext = true) {
    if (!Object.prototype.hasOwnProperty.call(state.value.gear[gearId], slotIndex)) {
      state.value.gear[gearId][slotIndex] = { from: undefined, to: undefined }
    }

    const currentCharmState = state.value.gear[gearId][slotIndex]
    currentCharmState.from = newFromId

    const fromLevel = (newFromId != null && newFromId !== '') ? CHARM_UPGRADE_LEVEL_MAP.get(newFromId) : undefined
    const currentToLevel = (currentCharmState.to != null && currentCharmState.to !== '') ? CHARM_UPGRADE_LEVEL_MAP.get(currentCharmState.to) : undefined

    // If 'from' is cleared or invalid, clear 'to'
    if (fromLevel === undefined) {
      currentCharmState.to = undefined

      return
    }

    const isNotLastLevel = fromLevel.index < CHARM_UPGRADE_DATA.length - 1
    const isToInvalid = !currentToLevel || currentToLevel.index <= fromLevel.index

    if (isNotLastLevel) {
      if (isToInvalid) {
        // If 'to' is invalid or non-existent, set it to the next level (if autoSetNext) or clear it
        const nextLevel = CHARM_UPGRADE_DATA[fromLevel.index + 1]
        currentCharmState.to = autoSetNext ? nextLevel.id : undefined
      }
      // If 'to' is valid and greater than 'from', keep it.
    }
    else {
      // If 'from' is the last level, clear 'to'
      currentCharmState.to = undefined
    }
  }

  function handleToChange(gearId: GearPiece['id'], slotIndex: number, newToId: string | undefined) {
    if (!Object.prototype.hasOwnProperty.call(state.value.gear[gearId], slotIndex)) {
      state.value.gear[gearId][slotIndex] = { from: undefined, to: undefined }
    }

    state.value.gear[gearId][slotIndex].to = newToId
  }

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
