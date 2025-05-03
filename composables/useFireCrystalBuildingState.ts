import type {
  BuildingCalculatorState,
  LevelGroupOption,
  LevelOption,
  Material,
} from '~/types/fire-crystal-building'
import { BuildingType } from '~/types/fire-crystal-building'

export default function useFireCrystalBuildingState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  // Generate select options for level selection
  const selectOptions = ref<LevelGroupOption[]>([])

  // Generate select options from the upgrade data
  function generateSelectOptions() {
    // Generate options immediately and also on mount to ensure they're available
    _generateSelectOptions()

    onMounted(() => {
      _generateSelectOptions()
    })
  }

  // Internal function to generate select options
  function _generateSelectOptions() {
    // Use furnace data as the reference for all buildings
    const furnaceData = FC_UPGRADE_DATA[BuildingType.FURNACE]

    // Validate furnace data exists and is an array
    if (furnaceData == null || !Array.isArray(furnaceData) || furnaceData.length === 0) {
      return
    }

    // Group levels by tier
    const groupedLevels: Record<string, LevelOption[]> = {}

    for (const level of furnaceData) {
      const { baseTier } = level

      // Ensure baseTier is a valid string
      if (baseTier != null && typeof baseTier === 'string' && baseTier !== '') {
        // Initialize array for this tier if it doesn't exist
        if (groupedLevels[baseTier] == null) {
          groupedLevels[baseTier] = []
        }

        groupedLevels[baseTier].push({
          id: level.id,
          label: level.label,
        })
      }
    }

    // Convert grouped levels to select options
    const options: LevelGroupOption[] = Object.entries(groupedLevels).map(([tier, levels]) => ({
      levels,
      tier,
    }))

    // Sort options by tier
    options.sort((a, b) => {
      const tierA = a.tier.match(/FC (\d+)/)
      const tierB = b.tier.match(/FC (\d+)/)

      if (tierA && tierB) {
        return Number.parseInt(tierA[1], 10) - Number.parseInt(tierB[1], 10)
      }

      return a.tier.localeCompare(b.tier)
    })

    // Update select options
    selectOptions.value = options
  }

  // Call generateSelectOptions to set up the options
  generateSelectOptions()

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
    state.value = useCloneDeep(defaultState)
  }

  // Filter 'from' options to exclude the last level since you can't upgrade from it
  const filteredFromOptions = computed(() => {
    // Create a deep copy of the options
    const result = [...selectOptions.value]

    // Process each tier group to remove the last level from the last tier
    if (result.length > 0) {
      const lastGroupIndex = result.length - 1
      const lastGroup = result[lastGroupIndex]

      // If the last tier has levels, remove the last level
      if (lastGroup.levels.length > 0) {
        result[lastGroupIndex] = {
          ...lastGroup,
          levels: useInitial(lastGroup.levels),
        }
      }
    }

    return result
  })

  // Get filtered 'to' options based on the selected 'from' level
  function getFilteredToOptions(buildingType: keyof BuildingCalculatorState['buildings'], fromId: string | undefined): LevelGroupOption[] {
    if (fromId == null || fromId === '')
      return []

    // FC_UPGRADE_LEVEL_MAP is guaranteed to have entries for all building types
    const levelMap = FC_UPGRADE_LEVEL_MAP[buildingType]

    // Safety check, but this should never happen with valid building types
    if (levelMap == null || !(levelMap instanceof Map) || levelMap.size === 0)
      return []

    const fromLevel = levelMap.get(fromId)

    if (!fromLevel)
      return []

    // Filter options to only include levels higher than the 'From' level
    return selectOptions.value
      .map(group => ({
        ...group,
        levels: group.levels.filter((level) => {
          const toLevel = levelMap.get(level.id)

          return toLevel && toLevel.index > fromLevel.index
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

    // Safety check, but this should never happen with valid building types
    if (levelMap == null || !(levelMap instanceof Map) || levelMap.size === 0)
      return

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

    // Safety check, but this should never happen with valid building types
    if (data == null || !Array.isArray(data) || data.length === 0)
      return

    const isNotLastLevel = fromLevel.index < data.length - 1
    const isToInvalid = !currentToLevel || currentToLevel.index <= fromLevel.index

    if (isNotLastLevel) {
      if (isToInvalid) {
        // If 'To' is invalid or non-existent, set it to the next level (if autoSetNext) or clear it
        const nextLevel = data[fromLevel.index + 1]
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

      // Safety check, but this should never happen with valid building types
      if (levelMap == null || !(levelMap instanceof Map) || levelMap.size === 0)
        continue

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

  // Load state from URL on initial load
  loadStateFromURL()

  // Also load on mount to ensure client-side hydration
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
