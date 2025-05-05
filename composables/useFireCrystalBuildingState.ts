import type {
  BuildingCalculatorState,
  LevelGroupOption,
  Material,
} from '~/types/fire-crystal-building'
import { BuildingType } from '~/types/fire-crystal-building'

export default function useFireCrystalBuildingState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  // Generate select options for level selection
  const selectOptions = (() => {
    // Group levels by tier and convert to select options format
    const groupedLevels = useGroupBy(FC_UPGRADE_DATA[BuildingType.FURNACE], level => level.tier) // Use furnace data as the reference for all buildings since the tiers are the same

    // Convert grouped levels to select options (source data is already in the correct order)
    return Object.entries(groupedLevels).map(([tier, levels]) => ({
      levels: levels.map(level => ({ id: level.id, label: level.label })),
      tier,
    }))
  })()

  const defaultState: BuildingCalculatorState = {
    buildings: {
      commandCenter: { from: undefined, to: undefined },
      embassy: { from: undefined, to: undefined },
      furnace: { from: undefined, to: undefined },
      infantryCamp: { from: undefined, to: undefined },
      infirmary: { from: undefined, to: undefined },
      lancerCamp: { from: undefined, to: undefined },
      marksmanCamp: { from: undefined, to: undefined },
      warAcademy: { from: undefined, to: undefined },
    },
    inventory: {
      coal: 0,
      fireCrystal: 0,
      iron: 0,
      meat: 0,
      refinedFireCrystal: 0,
      wood: 0,
    },
  }

  const state = useLocalStorage<BuildingCalculatorState>(`${STORAGE_PREFIX}fire-crystal-building-calculator-state`, defaultState, {
    initOnMounted: true,
    // Deep merge stored state with current defaults to handle potential structure changes
    mergeDefaults: (storageValue, defaults) => useToMerged(storageValue, defaults),
  })

  // Compute URL parameters for sharing
  const queryParameters = computed(() => {
    const parameters: Record<string, string> = {}
    let hasAnyParameter = false

    // Add building selections to URL parameters
    for (const buildingId of Object.keys(state.value.buildings) as (keyof BuildingCalculatorState['buildings'])[]) {
      const buildingState = state.value.buildings[buildingId]

      if (buildingState.from != null && buildingState.from !== '') {
        parameters[`${buildingId}_from`] = buildingState.from
        hasAnyParameter = true
      }

      if (buildingState.to != null && buildingState.to !== '') {
        parameters[`${buildingId}_to`] = buildingState.to
        hasAnyParameter = true
      }
    }

    // Add inventory to URL parameters if any values are non-zero
    for (const materialKey of Object.keys(state.value.inventory) as Material[]) {
      const value = state.value.inventory[materialKey]

      if (value > 0) {
        parameters[`inv_${materialKey}`] = value.toString()
        hasAnyParameter = true
      }
    }

    return {
      hasAnyParameter,
      parameters,
    }
  })

  // Check if there are any selections or inventory values
  const hasAnySelectionOrInventory = computed(() => {
    // Check if any building has a selection
    for (const buildingState of Object.values(state.value.buildings)) {
      if ((buildingState.from != null && buildingState.from !== '')
        || (buildingState.to != null && buildingState.to !== '')) {
        return true
      }
    }

    // Check if any inventory value is non-zero
    for (const value of Object.values(state.value.inventory)) {
      if (value > 0)
        return true
    }

    return false
  })

  // Clear all selections and inventory
  function clearAll() {
    state.value = structuredClone(defaultState)
  }

  // Filter 'From' options to exclude the last tier (FC10) since you can't upgrade from it
  const filteredFromOptions = computed(() => useInitial(selectOptions))

  // Get filtered 'To' options based on the selected 'From' level
  function getFilteredToOptions(buildingType: keyof BuildingCalculatorState['buildings'], fromId: string | undefined): LevelGroupOption[] {
    if (fromId == null || fromId === '')
      return []

    // FC_UPGRADE_LEVEL_MAP is guaranteed to have entries for all building types
    const levelMap = FC_UPGRADE_LEVEL_MAP[buildingType]

    const fromLevel = levelMap.get(fromId)

    if (!fromLevel)
      return []

    // Get the data array for this building type
    const data = FC_UPGRADE_DATA[buildingType]

    // Get the index of the fromLevel in the data array
    const fromIndex = data.indexOf(fromLevel)

    // Filter options to only include levels higher than the 'From' level
    return selectOptions
      .map(group => ({
        ...group,
        levels: group.levels.filter((level) => {
          const toLevel = levelMap.get(level.id)

          return toLevel && data.indexOf(toLevel) > fromIndex
        }),
      }))
      .filter(group => group.levels.length > 0)
  }

  // Handle 'From' level change
  function handleFromChange(
    buildingId: keyof BuildingCalculatorState['buildings'],
    newFromId: string | undefined,
    autoSetNext = true,
  ) {
    const currentBuildingState = state.value.buildings[buildingId]

    if (newFromId == null || newFromId === '') {
      currentBuildingState.from = undefined
      currentBuildingState.to = undefined

      return
    }

    currentBuildingState.from = newFromId

    // FC_UPGRADE_LEVEL_MAP is guaranteed to have entries for all building types
    const levelMap = FC_UPGRADE_LEVEL_MAP[buildingId]

    const fromLevel = levelMap.get(newFromId)

    if (!fromLevel)
      return

    // Check if there's a valid 'To' level selected
    const currentToId = currentBuildingState.to
    const currentToLevel = (currentToId != null && currentToId !== '') ?
        levelMap.get(currentToId)
      : undefined

    // FC_UPGRADE_DATA is guaranteed to have entries for all building types
    const data = FC_UPGRADE_DATA[buildingId]

    const fromIndex = data.indexOf(fromLevel)
    const isNotLastLevel = fromIndex < data.length - 1
    const isToInvalid = !currentToLevel || data.indexOf(currentToLevel) <= fromIndex

    if (isNotLastLevel) {
      if (isToInvalid) {
        // If 'To' is invalid or non-existent, set it to the next level (if autoSetNext) or clear it
        const nextLevel = data[fromIndex + 1]
        currentBuildingState.to = autoSetNext ? nextLevel.id : undefined
      }
      // If 'To' is valid and greater than 'From', keep it.
    }
    else {
      // If 'From' is the last level, clear 'To'
      currentBuildingState.to = undefined
    }
  }

  // Handle 'To' level change
  function handleToChange(
    buildingId: keyof BuildingCalculatorState['buildings'],
    newToId: string | undefined,
  ) {
    state.value.buildings[buildingId].to = newToId
  }

  // Function to load state from URL
  function loadStateFromURL() {
    let needsUpdate = false
    const { query } = route

    // Load building selections from URL
    for (const buildingId of Object.keys(state.value.buildings) as (keyof BuildingCalculatorState['buildings'])[]) {
      const fromParameter = query[`${buildingId}_from`] as string | undefined
      const toParameter = query[`${buildingId}_to`] as string | undefined

      // FC_UPGRADE_LEVEL_MAP is guaranteed to have entries for all building types
      const levelMap = FC_UPGRADE_LEVEL_MAP[buildingId]

      if (fromParameter != null && fromParameter !== '' && levelMap.has(fromParameter)) {
        state.value.buildings[buildingId].from = fromParameter
        needsUpdate = true
      }

      if (toParameter != null && toParameter !== '' && levelMap.has(toParameter)) {
        state.value.buildings[buildingId].to = toParameter
        needsUpdate = true
      }
    }

    // Load inventory from URL
    for (const materialKey of Object.keys(state.value.inventory) as Material[]) {
      const inventoryParameter = query[`inv_${materialKey}`]

      if (inventoryParameter != null) {
        const value = Number.parseInt(inventoryParameter as string, 10)

        if (!Number.isNaN(value) && value >= 0) {
          state.value.inventory[materialKey] = value
          needsUpdate = true
        }
      }
    }

    // If state was loaded from URL, ensure 'To' levels are valid relative to 'From'
    if (needsUpdate) {
      for (const buildingId of Object.keys(state.value.buildings) as (keyof BuildingCalculatorState['buildings'])[]) {
        handleFromChange(buildingId, state.value.buildings[buildingId].from, false) // Don't auto-set 'To' when loading/fixing
      }

      // Trigger immediate URL update if loaded state caused changes
      // Use void to explicitly ignore the promise returned by router.replace
      void router.replace({ query: queryParameters.value.parameters })
    }

    return needsUpdate
  }

  // Load state from URL only on mount to ensure client-side hydration
  // and to avoid reloading state after clearAll is called
  onMounted(() => {
    loadStateFromURL()
  })

  // Update URL when state changes
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
    upgradeData: FC_UPGRADE_DATA,
    upgradeLevelMap: FC_UPGRADE_LEVEL_MAP,
  }
}
