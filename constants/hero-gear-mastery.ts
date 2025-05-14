import type { HeroGearMasteryCost, HeroGearMasteryLevel, HeroGearMasteryMaterial } from '~/types/hero-gear-mastery'

export const HERO_GEAR_MASTERY_MATERIALS: ReadonlyArray<HeroGearMasteryMaterial> = [
  {
    icon: 'game-icons:rune-stone',
    iconColorClass: tw`bg-gradient-to-r from-stone-700 via-stone-400 to-stone-700`,
    key: 'essenceStone',
    label: 'Essence Stones',
  },
  {
    icon: 'game-icons:shoulder-armor',
    iconColorClass: tw`bg-gradient-to-tr from-amber-400 from-[46%] via-amber-100 via-[46%] to-amber-400 to-60%`,
    key: 'mythicGearPiece',
    label: 'Mythic Hero Gear',
  },
] as const

export const HERO_GEAR_MASTERY_LEVELS: ReadonlyArray<HeroGearMasteryLevel> = Array.from({ length: 20 }, (_, index) => ({
  id: `level-${index + 1}`,
  label: `Level ${index + 1}`,
  level: index + 1,
})) as ReadonlyArray<HeroGearMasteryLevel>

export const HERO_GEAR_MASTERY_COSTS: ReadonlyArray<HeroGearMasteryCost> = [
  { cost: { essenceStone: 10, mythicGearPiece: 0 }, levelId: 'level-1' },
  { cost: { essenceStone: 20, mythicGearPiece: 0 }, levelId: 'level-2' },
  { cost: { essenceStone: 30, mythicGearPiece: 0 }, levelId: 'level-3' },
  { cost: { essenceStone: 40, mythicGearPiece: 0 }, levelId: 'level-4' },
  { cost: { essenceStone: 50, mythicGearPiece: 0 }, levelId: 'level-5' },
  { cost: { essenceStone: 60, mythicGearPiece: 0 }, levelId: 'level-6' },
  { cost: { essenceStone: 70, mythicGearPiece: 0 }, levelId: 'level-7' },
  { cost: { essenceStone: 80, mythicGearPiece: 0 }, levelId: 'level-8' },
  { cost: { essenceStone: 90, mythicGearPiece: 0 }, levelId: 'level-9' },
  { cost: { essenceStone: 100, mythicGearPiece: 0 }, levelId: 'level-10' },
  { cost: { essenceStone: 110, mythicGearPiece: 1 }, levelId: 'level-11' },
  { cost: { essenceStone: 120, mythicGearPiece: 2 }, levelId: 'level-12' },
  { cost: { essenceStone: 130, mythicGearPiece: 3 }, levelId: 'level-13' },
  { cost: { essenceStone: 140, mythicGearPiece: 4 }, levelId: 'level-14' },
  { cost: { essenceStone: 150, mythicGearPiece: 5 }, levelId: 'level-15' },
  { cost: { essenceStone: 160, mythicGearPiece: 6 }, levelId: 'level-16' },
  { cost: { essenceStone: 170, mythicGearPiece: 7 }, levelId: 'level-17' },
  { cost: { essenceStone: 180, mythicGearPiece: 8 }, levelId: 'level-18' },
  { cost: { essenceStone: 190, mythicGearPiece: 9 }, levelId: 'level-19' },
  { cost: { essenceStone: 200, mythicGearPiece: 10 }, levelId: 'level-20' },
] as const

// Helper to map level IDs to costs for quick lookup
export const HERO_GEAR_MASTERY_COST_MAP = new Map(
  HERO_GEAR_MASTERY_COSTS.map(item => [item.levelId, item.cost]),
)
