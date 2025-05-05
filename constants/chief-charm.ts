import type { CharmMaterialInfo, CharmUpgradeLevel } from '~/types/chief-charm'

export const CHARM_MATERIALS: CharmMaterialInfo[] = [
  { icon: 'game-icons:scroll-unfurled', iconColorClass: tw`bg-gradient-to-t from-amber-400 via-amber-200 to-amber-300`, key: 'charmDesign', label: 'Charm Design' },
  { icon: 'game-icons:book-cover', iconColorClass: tw`bg-gradient-to-t from-yellow-900 via-yellow-600 to-yellow-800`, key: 'charmGuide', label: 'Charm Guide' },
  { icon: 'game-icons:secret-book', iconColorClass: tw`bg-gradient-to-t from-red-900 via-red-600 to-red-800`, key: 'charmSecret', label: 'Charm Secret' },
] as const

// Cost represents the cost to upgrade *to* this level from the previous one
const CHARM_UPGRADE_DATA_RAW: Array<{ cost: { charmDesign: number, charmGuide: number, charmSecret: number }, level: number }> = [
  { cost: { charmDesign: 5, charmGuide: 5, charmSecret: 0 }, level: 1 },
  { cost: { charmDesign: 15, charmGuide: 40, charmSecret: 0 }, level: 2 },
  { cost: { charmDesign: 40, charmGuide: 60, charmSecret: 0 }, level: 3 },
  { cost: { charmDesign: 100, charmGuide: 80, charmSecret: 0 }, level: 4 },
  { cost: { charmDesign: 200, charmGuide: 100, charmSecret: 0 }, level: 5 },
  { cost: { charmDesign: 300, charmGuide: 120, charmSecret: 0 }, level: 6 },
  { cost: { charmDesign: 400, charmGuide: 140, charmSecret: 0 }, level: 7 },
  { cost: { charmDesign: 400, charmGuide: 200, charmSecret: 0 }, level: 8 },
  { cost: { charmDesign: 400, charmGuide: 300, charmSecret: 0 }, level: 9 },
  { cost: { charmDesign: 420, charmGuide: 420, charmSecret: 0 }, level: 10 },
  { cost: { charmDesign: 420, charmGuide: 560, charmSecret: 0 }, level: 11 },
  { cost: { charmDesign: 450, charmGuide: 580, charmSecret: 15 }, level: 12 },
  { cost: { charmDesign: 450, charmGuide: 580, charmSecret: 30 }, level: 13 },
  { cost: { charmDesign: 500, charmGuide: 600, charmSecret: 45 }, level: 14 },
  { cost: { charmDesign: 500, charmGuide: 600, charmSecret: 70 }, level: 15 },
  { cost: { charmDesign: 550, charmGuide: 650, charmSecret: 100 }, level: 16 },
]

export const CHARM_UPGRADE_DATA: CharmUpgradeLevel[] = CHARM_UPGRADE_DATA_RAW.map((levelData, index) => ({
  ...levelData,
  id: `level_${levelData.level}`,
  index, // 0-based index
}))

export const CHARM_UPGRADE_LEVEL_MAP = new Map(CHARM_UPGRADE_DATA.map(level => [level.id, level]))

export const CHARM_SLOTS_PER_GEAR = 3
