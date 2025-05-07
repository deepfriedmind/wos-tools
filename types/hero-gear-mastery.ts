export interface CalculatedCostStep {
  cost: HeroGearMasteryCostPerLevel
  level: HeroGearMasteryLevel
}

export interface CalculatedPieceCost {
  id: string
  steps: CalculatedCostStep[]
  total: HeroGearMasteryCostPerLevel
}

export interface GrandTotalCost {
  essenceStone: number
  mythicGearPiece: number
}

export interface HeroGearMasteryCost {
  cost: HeroGearMasteryCostPerLevel
  levelId: HeroGearMasteryLevelId
}

export interface HeroGearMasteryCostPerLevel {
  essenceStone: number
  mythicGearPiece: number
}

export interface HeroGearMasteryLevel {
  id: HeroGearMasteryLevelId
  label: string
  level: number
}

export type HeroGearMasteryLevelId = string

export interface HeroGearMasteryMaterial {
  icon: string
  iconColorClass: string
  key: HeroGearMasteryMaterialKey
  label: string
}

export type HeroGearMasteryMaterialKey = 'essenceStone' | 'mythicGearPiece'

export interface HeroGearMasteryQueryParameters {
  [key: string]: string | undefined
}

export interface HeroGearMasteryState {
  inventory: {
    [key in HeroGearMasteryMaterialKey]: number
  }
  pieces: HeroGearPieceInstance[]
}

export interface HeroGearPieceInstance {
  from?: HeroGearMasteryLevelId
  id: string
  to?: HeroGearMasteryLevelId
}

export interface RemainingCostResult {
  hasInventory: boolean
  leftover: GrandTotalCost
  remaining: GrandTotalCost
}

export interface SelectOption {
  id: string
  label: string
  value: string
}
