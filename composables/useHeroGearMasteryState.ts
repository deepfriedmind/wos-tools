import { v4 as uuidv4 } from 'uuid'

import type { CalculatorState, HeroGearMasteryLevelId, HeroGearMasteryMaterialKey, HeroGearMasteryQueryParameters, HeroGearPieceInstance } from '~/types/hero-gear-mastery'

const DEFAULT_INVENTORY = Object.fromEntries(
  HERO_GEAR_MASTERY_MATERIALS.map(material => [material.key, 0]),
) as { [key in HeroGearMasteryMaterialKey]: number }

export default function useHeroGearMasteryState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  const defaultState: CalculatorState = {
    inventory: { ...DEFAULT_INVENTORY },
    pieces: [{ from: undefined, id: uuidv4(), to: undefined }],
  }

  const state = useLocalStorage<CalculatorState>(`${STORAGE_PREFIX}hero-gear-mastery-calculator-state`, defaultState, {
    initOnMounted: true,
    // Deep merge stored state with current defaults to handle potential structure changes
    mergeDefaults: (storageValue, defaults) => useToMerged(storageValue, defaults),
  })

  const queryParameters = computed(() => {
    const parameters: HeroGearMasteryQueryParameters = {}
    for (const [index, piece] of state.value.pieces.entries()) {
      if (typeof piece.from === 'string')
        parameters[`p${index}_from`] = piece.from
      if (typeof piece.to === 'string')
        parameters[`p${index}_to`] = piece.to
    }
    for (const material of HERO_GEAR_MASTERY_MATERIALS) {
      if (state.value.inventory[material.key] > 0) {
        parameters[`inv_${material.key}`] = String(state.value.inventory[material.key])
      }
    }

    return {
      hasAnyParameter: Object.keys(parameters).length > 0,
      params: parameters,
    }
  })

  const selectOptions = HERO_GEAR_MASTERY_LEVELS.map(({ id, label }) => ({
    id,
    label,
  }))

  // Filter 'From' options to exclude the last level since you can't upgrade from it
  const filteredFromOptions = computed(() => useInitial(selectOptions))

  function getFilteredToOptions(fromLevelId?: HeroGearMasteryLevelId) {
    if (typeof fromLevelId !== 'string')
      return []

    const fromIndex = HERO_GEAR_MASTERY_LEVELS.findIndex(level => level.id === fromLevelId)

    if (fromIndex === -1)
      return []

    return selectOptions.slice(fromIndex + 1) // Start from the level after the 'From' level
  }

  const hasAnySelectionOrInventory = computed(() =>
    state.value.pieces.some(({ from, to }) => typeof from === 'string' || typeof to === 'string')
    || Object.values(state.value.inventory).some(value => value > 0)
    || state.value.pieces.length > 1)

  function clearAll() {
    state.value = structuredClone(defaultState)
  }

  function handleFromChange(pieceId: string, value?: HeroGearMasteryLevelId, autoSetNext = true) {
    const piece = state.value.pieces.find(p => p.id === pieceId)

    if (!piece)
      return

    piece.from = value

    // If 'From' is cleared or invalid, clear 'To'
    if (typeof value !== 'string') {
      piece.to = undefined

      return
    }

    const fromIndex = HERO_GEAR_MASTERY_LEVELS.findIndex(l => l.id === value)
    const isNotLastLevel = fromIndex < HERO_GEAR_MASTERY_LEVELS.length - 1

    // Check if current 'To' is valid
    let isToInvalid = true
    if (typeof piece.to === 'string') {
      const toIndex = HERO_GEAR_MASTERY_LEVELS.findIndex(l => l.id === piece.to)
      isToInvalid = toIndex <= fromIndex
    }

    if (isNotLastLevel && isToInvalid) {
      // If 'To' is invalid or not set, and we're not at the last level,
      // set 'To' to the next level (if autoSetNext) or clear it
      const nextLevel = HERO_GEAR_MASTERY_LEVELS[fromIndex + 1]
      piece.to = autoSetNext ? nextLevel.id : undefined
    }
    else if (!isNotLastLevel) {
      // If 'From' is the last level, clear 'To'
      piece.to = undefined
    }
    // If 'To' is valid and greater than 'From', keep it
  }

  function handleToChange(pieceId: string, value?: HeroGearMasteryLevelId) {
    const piece = state.value.pieces.find(p => p.id === pieceId)

    if (!piece)
      return

    piece.to = value
  }

  function loadStateFromURL() {
    let needsUpdate = false
    const { query } = route
    const newPieces: HeroGearPieceInstance[] = []
    let pieceIndex = 0

    // Check for query parameters in the format p0_from, p0_to, p1_from, etc.
    while (typeof query[`p${pieceIndex}_from`] === 'string' || typeof query[`p${pieceIndex}_to`] === 'string') {
      const piece: HeroGearPieceInstance = { id: uuidv4() }

      if (typeof query[`p${pieceIndex}_from`] === 'string')
        piece.from = query[`p${pieceIndex}_from`] as HeroGearMasteryLevelId
      if (typeof query[`p${pieceIndex}_to`] === 'string')
        piece.to = query[`p${pieceIndex}_to`] as HeroGearMasteryLevelId

      // Only add pieces that have at least one valid property
      if (typeof piece.from === 'string' || typeof piece.to === 'string') {
        newPieces.push(piece)
        needsUpdate = true
      }

      pieceIndex++
    }

    if (newPieces.length > 0) {
      state.value.pieces = newPieces
    }

    for (const material of HERO_GEAR_MASTERY_MATERIALS) {
      const invValue = query[`inv_${material.key}`]

      if (typeof invValue === 'string' && !Number.isNaN(Number(invValue))) {
        state.value.inventory[material.key] = Number(invValue)
        needsUpdate = true
      }
    }

    // If state was loaded from URL, ensure 'To' levels are valid relative to 'From'
    if (needsUpdate) {
      for (const piece of state.value.pieces) {
        handleFromChange(piece.id, piece.from, false) // Don't auto-set 'To' when loading/fixing
      }

      // Trigger immediate URL update if loaded state caused changes
      void router.replace({ query: queryParameters.value.params })
    }

    return needsUpdate
  }

  function addGearPiece() {
    state.value.pieces.push({ from: undefined, id: uuidv4(), to: undefined })
  }

  function removeGearPiece(pieceId: string) {
    if (state.value.pieces.length > 1) {
      state.value.pieces = state.value.pieces.filter(p => p.id !== pieceId)
    }
  }

  onMounted(() => {
    loadStateFromURL()
  })

  watchDebounced(queryParameters, (newParameters) => {
    if (!useIsEqual(newParameters.params, route.query))
      void router.replace({ query: newParameters.params })
  }, { debounce: 300, deep: true })

  return {
    addGearPiece,
    clearAll,
    filteredFromOptions,
    getFilteredToOptions,
    handleFromChange,
    handleToChange,
    hasAnySelectionOrInventory,
    queryParameters,
    removeGearPiece,
    selectOptions,
    state,
  }
}
