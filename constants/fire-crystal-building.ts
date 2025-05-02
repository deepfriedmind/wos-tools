import type {
  BuildingInfo,
  MaterialInfo,
  UpgradeLevel,
} from '~/types/fire-crystal-building'
import { BuildingType } from '~/types/fire-crystal-building'

// Define materials with their icons and colors
export const FC_MATERIALS: MaterialInfo[] = [
  { icon: 'game-icons:pine-tree', iconColorClass: 'bg-gradient-to-tr from-green-800 to-green-600 via-green-700', key: 'wood', label: 'Wood' },
  { icon: 'game-icons:meat', iconColorClass: 'bg-gradient-to-tr from-red-800 to-red-600 via-red-700', key: 'meat', label: 'Meat' },
  { icon: 'game-icons:coal', iconColorClass: 'bg-gradient-to-tr from-gray-900 to-gray-700 via-gray-800', key: 'coal', label: 'Coal' },
  { icon: 'game-icons:anvil', iconColorClass: 'bg-gradient-to-tr from-slate-700 to-slate-500 via-slate-600', key: 'iron', label: 'Iron' },
  { icon: 'game-icons:crystal-growth', iconColorClass: 'bg-gradient-to-tr from-orange-600 to-orange-400 via-orange-500', key: 'fireCrystal', label: 'Fire Crystal' },
  { icon: 'game-icons:crystal-shine', iconColorClass: 'bg-gradient-to-tr from-purple-600 to-purple-400 via-purple-500', key: 'refinedFireCrystal', label: 'Refined Fire Crystal' },
]

// Define building information
export const FC_BUILDINGS: BuildingInfo[] = [
  {
    description: 'Main building for Fire Crystal Age upgrades',
    icon: 'game-icons:furnace',
    iconColorClass: 'bg-gradient-to-tr from-red-700 to-orange-500 via-red-600',
    id: BuildingType.FURNACE,
    name: 'Furnace',
  },
  {
    description: 'Required for alliance interactions',
    icon: 'game-icons:castle',
    iconColorClass: 'bg-gradient-to-tr from-blue-700 to-blue-500 via-blue-600',
    id: BuildingType.EMBASSY,
    name: 'Embassy',
  },
  {
    description: 'Controls troop movements and rallies',
    icon: 'game-icons:control-tower',
    iconColorClass: 'bg-gradient-to-tr from-gray-700 to-gray-500 via-gray-600',
    id: BuildingType.COMMAND_CENTER,
    name: 'Command Center',
  },
  {
    description: 'Heals wounded troops',
    icon: 'game-icons:hospital-cross',
    iconColorClass: 'bg-gradient-to-tr from-green-700 to-green-500 via-green-600',
    id: BuildingType.INFIRMARY,
    name: 'Infirmary',
  },
  {
    description: 'Trains infantry troops',
    icon: 'game-icons:spear-head',
    iconColorClass: 'bg-gradient-to-tr from-yellow-700 to-yellow-500 via-yellow-600',
    id: BuildingType.INFANTRY_CAMP,
    name: 'Infantry Camp',
  },
  {
    description: 'Trains lancer troops',
    icon: 'game-icons:cavalry',
    iconColorClass: 'bg-gradient-to-tr from-blue-700 to-blue-500 via-blue-600',
    id: BuildingType.LANCER_CAMP,
    name: 'Lancer Camp',
  },
  {
    description: 'Trains marksman troops',
    icon: 'game-icons:bow-arrow',
    iconColorClass: 'bg-gradient-to-tr from-green-700 to-green-500 via-green-600',
    id: BuildingType.MARKSMAN_CAMP,
    name: 'Marksman Camp',
  },
  {
    description: 'Researches military technologies',
    icon: 'game-icons:scroll-unfurled',
    iconColorClass: 'bg-gradient-to-tr from-purple-700 to-purple-500 via-purple-600',
    id: BuildingType.WAR_ACADEMY,
    name: 'War Academy',
  },
]

// Helper to extract base tier (FC level)
function getBaseTier(tier: string): string {
  // Extract the FC part (e.g., "FC 1" from "FC 1-2")
  const match = tier.match(/^(FC \d+)/)

  return match ? match[1] : tier
}

// Furnace upgrade data
const FURNACE_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 13_000_000, fireCrystal: 132, iron: 3_300_000, meat: 67_000_000, refinedFireCrystal: 0, wood: 67_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Embassy Lv. 30', stars: 0, tier: 'FC 1' },
  { cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Embassy FC 1', stars: 1, tier: 'FC 1' },
  { cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 }, id: 'fc1_2', label: 'FC 1-2', prerequisites: 'Embassy FC 1', stars: 2, tier: 'FC 1' },
  { cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 }, id: 'fc1_3', label: 'FC 1-3', prerequisites: 'Embassy FC 1', stars: 3, tier: 'FC 1' },
  { cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 }, id: 'fc1_4', label: 'FC 1-4', prerequisites: 'Embassy FC 1', stars: 4, tier: 'FC 1' },
  { cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 }, id: 'fc2_0', label: 'FC 2', prerequisites: 'Embassy FC 1', stars: 0, tier: 'FC 2' },
  { cost: { coal: 15_000_000, fireCrystal: 238, iron: 3_900_000, meat: 79_000_000, refinedFireCrystal: 0, wood: 79_000_000 }, id: 'fc2_1', label: 'FC 2-1', prerequisites: 'Embassy FC 2', stars: 1, tier: 'FC 2' },
  { cost: { coal: 15_000_000, fireCrystal: 238, iron: 3_900_000, meat: 79_000_000, refinedFireCrystal: 0, wood: 79_000_000 }, id: 'fc2_2', label: 'FC 2-2', prerequisites: 'Embassy FC 2', stars: 2, tier: 'FC 2' },
  { cost: { coal: 15_000_000, fireCrystal: 238, iron: 3_900_000, meat: 79_000_000, refinedFireCrystal: 0, wood: 79_000_000 }, id: 'fc2_3', label: 'FC 2-3', prerequisites: 'Embassy FC 2', stars: 3, tier: 'FC 2' },
  { cost: { coal: 15_000_000, fireCrystal: 238, iron: 3_900_000, meat: 79_000_000, refinedFireCrystal: 0, wood: 79_000_000 }, id: 'fc2_4', label: 'FC 2-4', prerequisites: 'Embassy FC 2', stars: 4, tier: 'FC 2' },
  { cost: { coal: 15_000_000, fireCrystal: 238, iron: 3_900_000, meat: 79_000_000, refinedFireCrystal: 0, wood: 79_000_000 }, id: 'fc3_0', label: 'FC 3', prerequisites: 'Embassy FC 2', stars: 0, tier: 'FC 3' },
  { cost: { coal: 16_000_000, fireCrystal: 280, iron: 4_100_000, meat: 82_000_000, refinedFireCrystal: 0, wood: 82_000_000 }, id: 'fc3_1', label: 'FC 3-1', prerequisites: 'Embassy FC 3', stars: 1, tier: 'FC 3' },
  { cost: { coal: 16_000_000, fireCrystal: 280, iron: 4_100_000, meat: 82_000_000, refinedFireCrystal: 0, wood: 82_000_000 }, id: 'fc3_2', label: 'FC 3-2', prerequisites: 'Embassy FC 3', stars: 2, tier: 'FC 3' },
  { cost: { coal: 16_000_000, fireCrystal: 280, iron: 4_100_000, meat: 82_000_000, refinedFireCrystal: 0, wood: 82_000_000 }, id: 'fc3_3', label: 'FC 3-3', prerequisites: 'Embassy FC 3', stars: 3, tier: 'FC 3' },
  { cost: { coal: 16_000_000, fireCrystal: 280, iron: 4_100_000, meat: 82_000_000, refinedFireCrystal: 0, wood: 82_000_000 }, id: 'fc3_4', label: 'FC 3-4', prerequisites: 'Embassy FC 3', stars: 4, tier: 'FC 3' },
  { cost: { coal: 16_000_000, fireCrystal: 280, iron: 4_100_000, meat: 82_000_000, refinedFireCrystal: 0, wood: 82_000_000 }, id: 'fc4_0', label: 'FC 4', prerequisites: 'Embassy FC 3', stars: 0, tier: 'FC 4' },
  { cost: { coal: 16_000_000, fireCrystal: 335, iron: 4_200_000, meat: 84_000_000, refinedFireCrystal: 0, wood: 84_000_000 }, id: 'fc4_1', label: 'FC 4-1', prerequisites: 'Embassy FC 4', stars: 1, tier: 'FC 4' },
  { cost: { coal: 16_000_000, fireCrystal: 335, iron: 4_200_000, meat: 84_000_000, refinedFireCrystal: 0, wood: 84_000_000 }, id: 'fc4_2', label: 'FC 4-2', prerequisites: 'Embassy FC 4', stars: 2, tier: 'FC 4' },
  { cost: { coal: 16_000_000, fireCrystal: 335, iron: 4_200_000, meat: 84_000_000, refinedFireCrystal: 0, wood: 84_000_000 }, id: 'fc4_3', label: 'FC 4-3', prerequisites: 'Embassy FC 4', stars: 3, tier: 'FC 4' },
  { cost: { coal: 16_000_000, fireCrystal: 335, iron: 4_200_000, meat: 84_000_000, refinedFireCrystal: 0, wood: 84_000_000 }, id: 'fc4_4', label: 'FC 4-4', prerequisites: 'Embassy FC 4', stars: 4, tier: 'FC 4' },
  { cost: { coal: 16_000_000, fireCrystal: 335, iron: 4_200_000, meat: 84_000_000, refinedFireCrystal: 0, wood: 84_000_000 }, id: 'fc5_0', label: 'FC 5', prerequisites: 'Embassy FC 4', stars: 0, tier: 'FC 5' },
  { cost: { coal: 19_000_000, fireCrystal: 200, iron: 4_800_000, meat: 96_000_000, refinedFireCrystal: 10, wood: 96_000_000 }, id: 'fc5_1', label: 'FC 5-1', prerequisites: 'Embassy FC 5', stars: 1, tier: 'FC 5' },
  { cost: { coal: 19_000_000, fireCrystal: 200, iron: 4_800_000, meat: 96_000_000, refinedFireCrystal: 10, wood: 96_000_000 }, id: 'fc5_2', label: 'FC 5-2', prerequisites: 'Embassy FC 5', stars: 2, tier: 'FC 5' },
  { cost: { coal: 19_000_000, fireCrystal: 200, iron: 4_800_000, meat: 96_000_000, refinedFireCrystal: 10, wood: 96_000_000 }, id: 'fc5_3', label: 'FC 5-3', prerequisites: 'Embassy FC 5', stars: 3, tier: 'FC 5' },
  { cost: { coal: 19_000_000, fireCrystal: 200, iron: 4_800_000, meat: 96_000_000, refinedFireCrystal: 10, wood: 96_000_000 }, id: 'fc5_4', label: 'FC 5-4', prerequisites: 'Embassy FC 5', stars: 4, tier: 'FC 5' },
  { cost: { coal: 19_000_000, fireCrystal: 100, iron: 4_800_000, meat: 96_000_000, refinedFireCrystal: 20, wood: 96_000_000 }, id: 'fc6_0', label: 'FC 6', prerequisites: 'Embassy FC 5', stars: 0, tier: 'FC 6' },
  { cost: { coal: 21_000_000, fireCrystal: 240, iron: 5_400_000, meat: 100_000_000, refinedFireCrystal: 15, wood: 100_000_000 }, id: 'fc6_1', label: 'FC 6-1', prerequisites: 'Embassy FC 6', stars: 1, tier: 'FC 6' },
  { cost: { coal: 21_000_000, fireCrystal: 240, iron: 5_400_000, meat: 100_000_000, refinedFireCrystal: 15, wood: 100_000_000 }, id: 'fc6_2', label: 'FC 6-2', prerequisites: 'Embassy FC 6', stars: 2, tier: 'FC 6' },
  { cost: { coal: 21_000_000, fireCrystal: 240, iron: 5_400_000, meat: 100_000_000, refinedFireCrystal: 15, wood: 100_000_000 }, id: 'fc6_3', label: 'FC 6-3', prerequisites: 'Embassy FC 6', stars: 3, tier: 'FC 6' },
  { cost: { coal: 21_000_000, fireCrystal: 240, iron: 5_400_000, meat: 100_000_000, refinedFireCrystal: 15, wood: 100_000_000 }, id: 'fc6_4', label: 'FC 6-4', prerequisites: 'Embassy FC 6', stars: 4, tier: 'FC 6' },
  { cost: { coal: 21_000_000, fireCrystal: 120, iron: 5_400_000, meat: 100_000_000, refinedFireCrystal: 30, wood: 100_000_000 }, id: 'fc7_0', label: 'FC 7', prerequisites: 'Embassy FC 6', stars: 0, tier: 'FC 7' },
  { cost: { coal: 26_000_000, fireCrystal: 240, iron: 6_600_000, meat: 130_000_000, refinedFireCrystal: 20, wood: 130_000_000 }, id: 'fc7_1', label: 'FC 7-1', prerequisites: 'Embassy FC 7', stars: 1, tier: 'FC 7' },
  { cost: { coal: 26_000_000, fireCrystal: 240, iron: 6_600_000, meat: 130_000_000, refinedFireCrystal: 20, wood: 130_000_000 }, id: 'fc7_2', label: 'FC 7-2', prerequisites: 'Embassy FC 7', stars: 2, tier: 'FC 7' },
  { cost: { coal: 26_000_000, fireCrystal: 240, iron: 6_600_000, meat: 130_000_000, refinedFireCrystal: 20, wood: 130_000_000 }, id: 'fc7_3', label: 'FC 7-3', prerequisites: 'Embassy FC 7', stars: 3, tier: 'FC 7' },
  { cost: { coal: 26_000_000, fireCrystal: 240, iron: 6_600_000, meat: 130_000_000, refinedFireCrystal: 20, wood: 130_000_000 }, id: 'fc7_4', label: 'FC 7-4', prerequisites: 'Embassy FC 7', stars: 4, tier: 'FC 7' },
  { cost: { coal: 26_000_000, fireCrystal: 120, iron: 6_600_000, meat: 130_000_000, refinedFireCrystal: 40, wood: 130_000_000 }, id: 'fc8_0', label: 'FC 8', prerequisites: 'Embassy FC 7', stars: 0, tier: 'FC 8' },
  { cost: { coal: 29_000_000, fireCrystal: 280, iron: 7_200_000, meat: 140_000_000, refinedFireCrystal: 30, wood: 140_000_000 }, id: 'fc8_1', label: 'FC 8-1', prerequisites: 'Embassy FC 8', stars: 1, tier: 'FC 8' },
  { cost: { coal: 29_000_000, fireCrystal: 280, iron: 7_200_000, meat: 140_000_000, refinedFireCrystal: 30, wood: 140_000_000 }, id: 'fc8_2', label: 'FC 8-2', prerequisites: 'Embassy FC 8', stars: 2, tier: 'FC 8' },
  { cost: { coal: 29_000_000, fireCrystal: 280, iron: 7_200_000, meat: 140_000_000, refinedFireCrystal: 30, wood: 140_000_000 }, id: 'fc8_3', label: 'FC 8-3', prerequisites: 'Embassy FC 8', stars: 3, tier: 'FC 8' },
  { cost: { coal: 29_000_000, fireCrystal: 280, iron: 7_200_000, meat: 140_000_000, refinedFireCrystal: 30, wood: 140_000_000 }, id: 'fc8_4', label: 'FC 8-4', prerequisites: 'Embassy FC 8', stars: 4, tier: 'FC 8' },
  { cost: { coal: 29_000_000, fireCrystal: 140, iron: 7_200_000, meat: 140_000_000, refinedFireCrystal: 60, wood: 140_000_000 }, id: 'fc9_0', label: 'FC 9', prerequisites: 'Embassy FC 8', stars: 0, tier: 'FC 9' },
  { cost: { coal: 33_000_000, fireCrystal: 320, iron: 8_400_000, meat: 160_000_000, refinedFireCrystal: 40, wood: 160_000_000 }, id: 'fc9_1', label: 'FC 9-1', prerequisites: 'Embassy FC 9', stars: 1, tier: 'FC 9' },
  { cost: { coal: 33_000_000, fireCrystal: 320, iron: 8_400_000, meat: 160_000_000, refinedFireCrystal: 40, wood: 160_000_000 }, id: 'fc9_2', label: 'FC 9-2', prerequisites: 'Embassy FC 9', stars: 2, tier: 'FC 9' },
  { cost: { coal: 33_000_000, fireCrystal: 320, iron: 8_400_000, meat: 160_000_000, refinedFireCrystal: 40, wood: 160_000_000 }, id: 'fc9_3', label: 'FC 9-3', prerequisites: 'Embassy FC 9', stars: 3, tier: 'FC 9' },
  { cost: { coal: 33_000_000, fireCrystal: 320, iron: 8_400_000, meat: 160_000_000, refinedFireCrystal: 40, wood: 160_000_000 }, id: 'fc9_4', label: 'FC 9-4', prerequisites: 'Embassy FC 9', stars: 4, tier: 'FC 9' },
  { cost: { coal: 33_000_000, fireCrystal: 160, iron: 8_400_000, meat: 160_000_000, refinedFireCrystal: 80, wood: 160_000_000 }, id: 'fc10_0', label: 'FC 10', prerequisites: 'Embassy FC 9', stars: 0, tier: 'FC 10' },
]

// Embassy upgrade data - similar to furnace but with different costs
const EMBASSY_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 2_700_000, fireCrystal: 33, iron: 670_000, meat: 13_000_000, refinedFireCrystal: 0, wood: 13_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Furnace FC-1', stars: 0, tier: 'FC 1' },
  { cost: { coal: 2_900_000, fireCrystal: 39, iron: 720_000, meat: 14_000_000, refinedFireCrystal: 0, wood: 14_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Furnace FC-2', stars: 1, tier: 'FC 1' },
  { cost: { coal: 2_900_000, fireCrystal: 39, iron: 720_000, meat: 14_000_000, refinedFireCrystal: 0, wood: 14_000_000 }, id: 'fc1_2', label: 'FC 1-2', prerequisites: 'Furnace FC-2', stars: 2, tier: 'FC 1' },
  { cost: { coal: 2_900_000, fireCrystal: 39, iron: 720_000, meat: 14_000_000, refinedFireCrystal: 0, wood: 14_000_000 }, id: 'fc1_3', label: 'FC 1-3', prerequisites: 'Furnace FC-2', stars: 3, tier: 'FC 1' },
  { cost: { coal: 2_900_000, fireCrystal: 39, iron: 720_000, meat: 14_000_000, refinedFireCrystal: 0, wood: 14_000_000 }, id: 'fc1_4', label: 'FC 1-4', prerequisites: 'Furnace FC-2', stars: 4, tier: 'FC 1' },
  { cost: { coal: 2_900_000, fireCrystal: 39, iron: 1_000_000, meat: 14_000_000, refinedFireCrystal: 0, wood: 14_000_000 }, id: 'fc2_0', label: 'FC 2', prerequisites: 'Furnace FC-2', stars: 0, tier: 'FC 2' },
  // Add more embassy levels as needed
]

// Command Center upgrade data
const COMMAND_CENTER_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 2_000_000, fireCrystal: 25, iron: 500_000, meat: 10_000_000, refinedFireCrystal: 0, wood: 10_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Embassy FC 1', stars: 0, tier: 'FC 1' },
  { cost: { coal: 2_200_000, fireCrystal: 30, iron: 550_000, meat: 11_000_000, refinedFireCrystal: 0, wood: 11_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Embassy FC 1', stars: 1, tier: 'FC 1' },
  // Add more command center levels as needed
]

// Infirmary upgrade data
const INFIRMARY_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 1_800_000, fireCrystal: 22, iron: 450_000, meat: 9_000_000, refinedFireCrystal: 0, wood: 9_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Embassy FC 1', stars: 0, tier: 'FC 1' },
  { cost: { coal: 2_000_000, fireCrystal: 25, iron: 500_000, meat: 10_000_000, refinedFireCrystal: 0, wood: 10_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Embassy FC 1', stars: 1, tier: 'FC 1' },
  // Add more infirmary levels as needed
]

// Camp upgrade data (shared by all camp types)
const CAMP_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 1_600_000, fireCrystal: 20, iron: 400_000, meat: 8_000_000, refinedFireCrystal: 0, wood: 8_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Embassy FC 1', stars: 0, tier: 'FC 1' },
  { cost: { coal: 1_800_000, fireCrystal: 22, iron: 450_000, meat: 9_000_000, refinedFireCrystal: 0, wood: 9_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Embassy FC 1', stars: 1, tier: 'FC 1' },
  // Add more camp levels as needed
]

// War Academy upgrade data
const WAR_ACADEMY_UPGRADE_DATA_RAW: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>> = [
  { cost: { coal: 2_200_000, fireCrystal: 28, iron: 550_000, meat: 11_000_000, refinedFireCrystal: 0, wood: 11_000_000 }, id: 'fc1_0', label: 'FC 1', prerequisites: 'Embassy FC 1', stars: 0, tier: 'FC 1' },
  { cost: { coal: 2_400_000, fireCrystal: 30, iron: 600_000, meat: 12_000_000, refinedFireCrystal: 0, wood: 12_000_000 }, id: 'fc1_1', label: 'FC 1-1', prerequisites: 'Embassy FC 1', stars: 1, tier: 'FC 1' },
  // Add more war academy levels as needed
]

// Process the raw data to add baseTier and index
function processUpgradeData(rawData: Array<Omit<UpgradeLevel, 'baseTier' | 'index'>>): UpgradeLevel[] {
  return rawData.map((level, index) => ({
    ...level,
    baseTier: getBaseTier(level.tier),
    index,
  }))
}

// Create the upgrade data for each building type
export const FC_UPGRADE_DATA: Record<string, UpgradeLevel[]> = {
  [BuildingType.COMMAND_CENTER]: processUpgradeData(COMMAND_CENTER_UPGRADE_DATA_RAW),
  [BuildingType.EMBASSY]: processUpgradeData(EMBASSY_UPGRADE_DATA_RAW),
  [BuildingType.FURNACE]: processUpgradeData(FURNACE_UPGRADE_DATA_RAW),
  [BuildingType.INFANTRY_CAMP]: processUpgradeData(CAMP_UPGRADE_DATA_RAW),
  [BuildingType.INFIRMARY]: processUpgradeData(INFIRMARY_UPGRADE_DATA_RAW),
  [BuildingType.LANCER_CAMP]: processUpgradeData(CAMP_UPGRADE_DATA_RAW),
  [BuildingType.MARKSMAN_CAMP]: processUpgradeData(CAMP_UPGRADE_DATA_RAW),
  [BuildingType.WAR_ACADEMY]: processUpgradeData(WAR_ACADEMY_UPGRADE_DATA_RAW),
}

// Create the upgrade level maps for each building type
export const FC_UPGRADE_LEVEL_MAP: Record<string, Map<string, UpgradeLevel>> = {
  [BuildingType.COMMAND_CENTER]: new Map(FC_UPGRADE_DATA[BuildingType.COMMAND_CENTER].map(level => [level.id, level])),
  [BuildingType.EMBASSY]: new Map(FC_UPGRADE_DATA[BuildingType.EMBASSY].map(level => [level.id, level])),
  [BuildingType.FURNACE]: new Map(FC_UPGRADE_DATA[BuildingType.FURNACE].map(level => [level.id, level])),
  [BuildingType.INFANTRY_CAMP]: new Map(FC_UPGRADE_DATA[BuildingType.INFANTRY_CAMP].map(level => [level.id, level])),
  [BuildingType.INFIRMARY]: new Map(FC_UPGRADE_DATA[BuildingType.INFIRMARY].map(level => [level.id, level])),
  [BuildingType.LANCER_CAMP]: new Map(FC_UPGRADE_DATA[BuildingType.LANCER_CAMP].map(level => [level.id, level])),
  [BuildingType.MARKSMAN_CAMP]: new Map(FC_UPGRADE_DATA[BuildingType.MARKSMAN_CAMP].map(level => [level.id, level])),
  [BuildingType.WAR_ACADEMY]: new Map(FC_UPGRADE_DATA[BuildingType.WAR_ACADEMY].map(level => [level.id, level])),
}

export const FC_TIER_COLOR_CLASSES: Record<string, string> = {
  'FC 1': 'text-blue-400',
  'FC 2': 'text-green-400',
  'FC 3': 'text-yellow-400',
  'FC 4': 'text-orange-400',
  'FC 5': 'text-red-400',
  'FC 6': 'text-purple-400',
  'FC 7': 'text-pink-400',
  'FC 8': 'text-indigo-400',
  'FC 9': 'text-teal-400',
  'FC 10': 'text-amber-400',
}
