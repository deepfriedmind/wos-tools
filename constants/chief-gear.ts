import type { GearPiece, Material, UpgradeLevel } from '~/types/chief-gear'

export const GEAR_PIECES: GearPiece[] = [
  { icon: 'game-icons:winter-hat', id: 'hat', name: 'Winter Hat', stats: 'lancer attack/defense' },
  { icon: 'game-icons:pirate-coat', id: 'coat', name: 'Valor\'s Embrace', stats: 'infantry attack/defense' },
  { icon: 'game-icons:power-ring', id: 'ring', name: 'Ring of Resilience', stats: 'marksman attack/defense' },
  { icon: 'game-icons:pocket-watch', id: 'watch', name: 'Durable Watch', stats: 'lancer attack/defense' },
  { icon: 'game-icons:armored-pants', id: 'pants', name: 'Explorer Pants', stats: 'infantry attack/defense' },
  { icon: 'game-icons:wood-club', id: 'cudgel', name: 'Cudgel', stats: 'marksman attack/defense' },
] as const

export const MATERIALS: { key: Material, label: string }[] = [
  { key: 'hardenedAlloy', label: 'Hardened Alloy' },
  { key: 'polishingSolution', label: 'Polishing Solution' },
  { key: 'designPlans', label: 'Design Plans' },
  { key: 'lunarAmber', label: 'Lunar Amber' },
]

// Cost represents the cost to upgrade *to* this level from the previous one
const UPGRADE_DATA_RAW: Array<
  Omit<UpgradeLevel, 'baseTier' | 'index'>
> = [
  { cost: { designPlans: 0, hardenedAlloy: 1500, lunarAmber: 0, polishingSolution: 15 }, id: 'green_0', label: 'Green', stars: 0, tier: 'Green' },
  { cost: { designPlans: 0, hardenedAlloy: 3800, lunarAmber: 0, polishingSolution: 40 }, id: 'green_1', label: 'Green 1-Star', stars: 1, tier: 'Green' },
  { cost: { designPlans: 0, hardenedAlloy: 7000, lunarAmber: 0, polishingSolution: 70 }, id: 'blue_0', label: 'Blue', stars: 0, tier: 'Blue' },
  { cost: { designPlans: 0, hardenedAlloy: 9700, lunarAmber: 0, polishingSolution: 95 }, id: 'blue_1', label: 'Blue 1-Star', stars: 1, tier: 'Blue' },
  { cost: { designPlans: 45, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'blue_2', label: 'Blue 2-Star', stars: 2, tier: 'Blue' },
  { cost: { designPlans: 50, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'blue_3', label: 'Blue 3-Star', stars: 3, tier: 'Blue' },
  { cost: { designPlans: 60, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'purple_0', label: 'Purple', stars: 0, tier: 'Purple' },
  { cost: { designPlans: 70, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'purple_1', label: 'Purple 1-Star', stars: 1, tier: 'Purple' },
  { cost: { designPlans: 40, hardenedAlloy: 6500, lunarAmber: 0, polishingSolution: 65 }, id: 'purple_2', label: 'Purple 2-Star', stars: 2, tier: 'Purple' },
  { cost: { designPlans: 50, hardenedAlloy: 8000, lunarAmber: 0, polishingSolution: 80 }, id: 'purple_3', label: 'Purple 3-Star', stars: 3, tier: 'Purple' },
  { cost: { designPlans: 60, hardenedAlloy: 10_000, lunarAmber: 0, polishingSolution: 95 }, id: 'purple_t1_0', label: 'Purple T1', stars: 0, tier: 'Purple T1' },
  { cost: { designPlans: 70, hardenedAlloy: 11_000, lunarAmber: 0, polishingSolution: 110 }, id: 'purple_t1_1', label: 'Purple T1 1-Star', stars: 1, tier: 'Purple T1' },
  { cost: { designPlans: 85, hardenedAlloy: 13_000, lunarAmber: 0, polishingSolution: 130 }, id: 'purple_t1_2', label: 'Purple T1 2-Star', stars: 2, tier: 'Purple T1' },
  { cost: { designPlans: 100, hardenedAlloy: 15_000, lunarAmber: 0, polishingSolution: 160 }, id: 'purple_t1_3', label: 'Purple T1 3-Star', stars: 3, tier: 'Purple T1' },
  { cost: { designPlans: 40, hardenedAlloy: 22_000, lunarAmber: 0, polishingSolution: 220 }, id: 'gold_0', label: 'Gold', stars: 0, tier: 'Gold' },
  { cost: { designPlans: 40, hardenedAlloy: 23_000, lunarAmber: 0, polishingSolution: 230 }, id: 'gold_1', label: 'Gold 1-Star', stars: 1, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 25_000, lunarAmber: 0, polishingSolution: 250 }, id: 'gold_2', label: 'Gold 2-Star', stars: 2, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 26_000, lunarAmber: 0, polishingSolution: 260 }, id: 'gold_3', label: 'Gold 3-Star', stars: 3, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 28_000, lunarAmber: 0, polishingSolution: 280 }, id: 'gold_t1_0', label: 'Gold T1', stars: 0, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 30_000, lunarAmber: 0, polishingSolution: 300 }, id: 'gold_t1_1', label: 'Gold T1 1-Star', stars: 1, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 32_000, lunarAmber: 0, polishingSolution: 320 }, id: 'gold_t1_2', label: 'Gold T1 2-Star', stars: 2, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 35_000, lunarAmber: 0, polishingSolution: 340 }, id: 'gold_t1_3', label: 'Gold T1 3-Star', stars: 3, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 38_000, lunarAmber: 0, polishingSolution: 360 }, id: 'gold_t2_0', label: 'Gold T2', stars: 0, tier: 'Gold T2' },
  { cost: { designPlans: 75, hardenedAlloy: 43_000, lunarAmber: 0, polishingSolution: 430 }, id: 'gold_t2_1', label: 'Gold T2 1-Star', stars: 1, tier: 'Gold T2' },
  { cost: { designPlans: 80, hardenedAlloy: 45_000, lunarAmber: 0, polishingSolution: 460 }, id: 'gold_t2_2', label: 'Gold T2 2-Star', stars: 2, tier: 'Gold T2' },
  { cost: { designPlans: 85, hardenedAlloy: 48_000, lunarAmber: 0, polishingSolution: 500 }, id: 'gold_t2_3', label: 'Gold T2 3-Star', stars: 3, tier: 'Gold T2' },
  { cost: { designPlans: 85, hardenedAlloy: 50_000, lunarAmber: 10, polishingSolution: 530 }, id: 'red_0', label: 'Red', stars: 0, tier: 'Red' },
  { cost: { designPlans: 90, hardenedAlloy: 52_000, lunarAmber: 10, polishingSolution: 560 }, id: 'red_1', label: 'Red 1-Star', stars: 1, tier: 'Red' },
  { cost: { designPlans: 95, hardenedAlloy: 54_000, lunarAmber: 10, polishingSolution: 590 }, id: 'red_2', label: 'Red 2-Star', stars: 2, tier: 'Red' },
  { cost: { designPlans: 100, hardenedAlloy: 56_000, lunarAmber: 10, polishingSolution: 620 }, id: 'red_3', label: 'Red 3-Star', stars: 3, tier: 'Red' },
  { cost: { designPlans: 110, hardenedAlloy: 59_000, lunarAmber: 15, polishingSolution: 670 }, id: 'red_t1_0', label: 'Red T1', stars: 0, tier: 'Red T1' },
  { cost: { designPlans: 115, hardenedAlloy: 61_000, lunarAmber: 15, polishingSolution: 700 }, id: 'red_t1_1', label: 'Red T1 1-Star', stars: 1, tier: 'Red T1' },
  { cost: { designPlans: 120, hardenedAlloy: 63_000, lunarAmber: 15, polishingSolution: 730 }, id: 'red_t1_2', label: 'Red T1 2-Star', stars: 2, tier: 'Red T1' },
  { cost: { designPlans: 125, hardenedAlloy: 65_000, lunarAmber: 15, polishingSolution: 760 }, id: 'red_t1_3', label: 'Red T1 3-Star', stars: 3, tier: 'Red T1' },
  { cost: { designPlans: 135, hardenedAlloy: 68_000, lunarAmber: 20, polishingSolution: 810 }, id: 'red_t2_0', label: 'Red T2', stars: 0, tier: 'Red T2' },
  { cost: { designPlans: 140, hardenedAlloy: 70_000, lunarAmber: 20, polishingSolution: 840 }, id: 'red_t2_1', label: 'Red T2 1-Star', stars: 1, tier: 'Red T2' },
  { cost: { designPlans: 145, hardenedAlloy: 72_000, lunarAmber: 20, polishingSolution: 870 }, id: 'red_t2_2', label: 'Red T2 2-Star', stars: 2, tier: 'Red T2' },
  { cost: { designPlans: 150, hardenedAlloy: 74_000, lunarAmber: 20, polishingSolution: 900 }, id: 'red_t2_3', label: 'Red T2 3-Star', stars: 3, tier: 'Red T2' },
  { cost: { designPlans: 160, hardenedAlloy: 77_000, lunarAmber: 25, polishingSolution: 950 }, id: 'red_t3_0', label: 'Red T3', stars: 0, tier: 'Red T3' },
  { cost: { designPlans: 165, hardenedAlloy: 80_000, lunarAmber: 25, polishingSolution: 990 }, id: 'red_t3_1', label: 'Red T3 1-Star', stars: 1, tier: 'Red T3' },
  { cost: { designPlans: 170, hardenedAlloy: 83_000, lunarAmber: 25, polishingSolution: 1030 }, id: 'red_t3_2', label: 'Red T3 2-Star', stars: 2, tier: 'Red T3' },
  { cost: { designPlans: 180, hardenedAlloy: 86_000, lunarAmber: 25, polishingSolution: 1070 }, id: 'red_t3_3', label: 'Red T3 3-Star', stars: 3, tier: 'Red T3' },
] as const

// Helper to extract base tier (color)
function getBaseTier(tier: string): string {
  return tier.split(' ')[0]
}

export const UPGRADE_DATA: UpgradeLevel[] = UPGRADE_DATA_RAW.map((level, index) => ({
  ...level,
  baseTier: getBaseTier(level.tier),
  index,
}))

export const UPGRADE_LEVEL_MAP = new Map(UPGRADE_DATA.map(level => [level.id, level]))

export const TIER_COLOR_CLASSES: Record<string, string> = {
  Blue: 'text-sky-400',
  Gold: 'text-amber-400',
  Green: 'text-emerald-400',
  Purple: 'text-purple-500',
  Red: 'text-red-600',
} as const
