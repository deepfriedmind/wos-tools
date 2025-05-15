import { v4 as uuidv4 } from 'uuid'

import type { CalculatorState, HeroGearMasteryLevelId, HeroGearMasteryMaterialKey, HeroGearMasteryQueryParameters, HeroGearPieceInstance } from '~/types/hero-gear-mastery'

const GRADIENT_DIRECTIONS = [
  'bg-gradient-to-b',
  'bg-gradient-to-bl',
  'bg-gradient-to-br',
  'bg-gradient-to-l',
  'bg-gradient-to-r',
  'bg-gradient-to-t',
  'bg-gradient-to-tl',
  'bg-gradient-to-tr',
]

const AMBER_COLORS = ['amber-100', 'amber-200', 'amber-300', 'amber-400', 'amber-500']
const TO_FROM_PERCENT_OPTIONS = [30, 35, 40, 45, 50, 55, 60]
const VIA_PERCENT_OPTIONS = [30, 35, 40, 45, 50, 55, 60]

/**
 * Generates a random gradient string for gear pieces
 * @returns A Tailwind CSS gradient class string
 */
function generateRandomAmberGradient() {
  const direction = useSample(GRADIENT_DIRECTIONS)
  const fromColor = useSample(AMBER_COLORS)
  const viaColor = useSample(AMBER_COLORS.filter(color => color !== fromColor))
  const toColor = useSample(AMBER_COLORS.filter(color => color !== viaColor))
  const fromPercent = useSample(TO_FROM_PERCENT_OPTIONS)
  const viaPercent = useSample(VIA_PERCENT_OPTIONS)
  const toPercent = useSample(TO_FROM_PERCENT_OPTIONS)

  return `${direction} from-${fromColor} from-${fromPercent}% via-${viaColor} via-${viaPercent}% to-${toColor} to-${toPercent}%`
}

const DEFAULT_INVENTORY = Object.fromEntries(
  HERO_GEAR_MASTERY_MATERIALS.map(({ key }) => [key, 0]),
) as { [key in HeroGearMasteryMaterialKey]: number }

export default function useHeroGearMasteryState() {
  const route = useRoute()
  const router = useRouter()
  const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

  const defaultState: CalculatorState = {
    inventory: { ...DEFAULT_INVENTORY },
    pieces: [{ from: undefined, gradient: generateRandomAmberGradient(), id: uuidv4(), to: undefined }],
  }

  const state = useLocalStorage<CalculatorState>(`${STORAGE_PREFIX}hero-gear-mastery-calculator-state`, defaultState, {
    initOnMounted: true,
    // Deep merge stored state with current defaults to handle potential structure changes
    mergeDefaults: (storageValue, defaults) => useToMerged(storageValue, defaults),
  })

  const queryParameters = computed(() => {
    const parameters: HeroGearMasteryQueryParameters = {}
    for (const [index, { from, to }] of state.value.pieces.entries()) {
      if (typeof from === 'string')
        parameters[`p${index}_from`] = from
      if (typeof to === 'string')
        parameters[`p${index}_to`] = to
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
      const piece: HeroGearPieceInstance = {
        gradient: generateRandomAmberGradient(),
        id: uuidv4(),
      }

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
    const lastPiece = state.value.pieces.at(-1)
    const gradient = generateRandomAmberGradient()

    state.value.pieces.push({
      from: lastPiece?.from,
      gradient,
      id: uuidv4(),
      to: lastPiece?.to,
    })
  }

  function removeGearPiece(pieceId: string) {
    const { pieces } = state.value

    if (pieces.length > 1) {
      state.value.pieces = pieces.filter(({ id }) => id !== pieceId)
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
    loadStateFromURL, // Expose this for testing
    queryParameters,
    removeGearPiece,
    selectOptions,
    state,
  }
}
