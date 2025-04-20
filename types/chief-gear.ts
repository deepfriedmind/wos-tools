export interface CalculatedCost {
  steps: { cumulativeCost: UpgradeCost, level: UpgradeLevel }[]
  total: UpgradeCost
}

export interface CalculatorState {
  gear: {
    coat: GearSelection
    cudgel: GearSelection
    hat: GearSelection
    pants: GearSelection
    ring: GearSelection
    watch: GearSelection
  }
  inventory: UpgradeCost
}

export interface GearPiece {
  icon: string
  id: keyof CalculatorState['gear']
  name: string
  stats: string
}

export interface GearSelection {
  from: string | undefined
  to: string | undefined
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

export interface UpgradeCost {
  designPlans: number
  hardenedAlloy: number
  lunarAmber: number
  polishingSolution: number
}

export interface UpgradeLevel {
  baseTier: string // e.g., 'Green', 'Blue', 'Purple', 'Gold', 'Red'
  cost: UpgradeCost // Cost to reach THIS level from the PREVIOUS one
  id: string // e.g., 'green_0', 'blue_3', 'red_t1_1'
  index: number // Added index for easier comparison
  label: string // e.g., 'Green', 'Green 1-Star', 'Blue 3-Star', 'Red T3 1-Star'
  stars: number // 0-3
  tier: string // e.g., 'Green', 'Blue', 'Purple T1', 'Red T3'
}
