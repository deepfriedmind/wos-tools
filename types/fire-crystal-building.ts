// Group buildings by upgrade cost similarity
export enum BuildingCostGroup {
  CAMP = 'camp', // All camps share the same upgrade costs
  COMMAND_CENTER = 'commandCenter',
  EMBASSY = 'embassy',
  FURNACE = 'furnace',
  INFIRMARY = 'infirmary',
  WAR_ACADEMY = 'warAcademy',
}

export enum BuildingType {
  COMMAND_CENTER = 'commandCenter',
  EMBASSY = 'embassy',
  FURNACE = 'furnace',
  INFANTRY_CAMP = 'infantryCamp',
  INFIRMARY = 'infirmary',
  LANCER_CAMP = 'lancerCamp',
  MARKSMAN_CAMP = 'marksmanCamp',
  WAR_ACADEMY = 'warAcademy',
}

export interface BuildingCalculatorState {
  buildings: {
    commandCenter: BuildingSelection
    embassy: BuildingSelection
    furnace: BuildingSelection
    infantryCamp: BuildingSelection
    infirmary: BuildingSelection
    lancerCamp: BuildingSelection
    marksmanCamp: BuildingSelection
    warAcademy: BuildingSelection
  }
  inventory: UpgradeCost
}

export interface BuildingInfo {
  description: string
  icon: string
  iconColorClass: string
  id: keyof BuildingCalculatorState['buildings']
  name: string
}

export interface BuildingSelection {
  from: string | undefined
  to: string | undefined
}

export interface CalculatedCost {
  steps: { cumulativeCost: UpgradeCost, level: UpgradeLevel }[]
  total: UpgradeCost
}

export interface LevelGroupOption {
  levels: LevelOption[]
  tier: string
}

export interface LevelOption {
  id: string
  label: string
}

export type Material = keyof UpgradeCost

export interface MaterialInfo {
  imagePath: string
  key: Material
  label: string
}

export interface UpgradeCost {
  coal: number
  fireCrystal: number
  iron: number
  meat: number
  refinedFireCrystal: number
  wood: number
}

export interface UpgradeLevel {
  cost: UpgradeCost // Cost to reach THIS level from the PREVIOUS one
  id: string // e.g., 'fc1_0', 'fc2_3'
  label: string // e.g., 'FC 1', 'FC 1-1', 'FC 2-3'
  tier: string // e.g., 'FC 1', 'FC 2'
}
