import type { GearPiece } from '~/types/chief-gear'

// State structure: GearPiece ID -> Slot Index (0-2) -> Selection
export interface CharmCalculatorState {
  gear: Record<GearPiece['id'], Record<number, CharmSelection>>
  inventory: Record<CharmMaterialKey, number>
}

export interface CharmMaterialInfo {
  icon: string
  iconColorClass: string
  key: CharmMaterialKey
  label: string
}

export type CharmMaterialKey = 'charmDesign' | 'charmGuide' | 'charmSecret'

export interface CharmSelection {
  from: string | undefined
  to: string | undefined
}

export type CharmUpgradeCost = Record<CharmMaterialKey, number>

export interface CharmUpgradeLevel {
  cost: CharmUpgradeCost
  id: string
  index: number // 0-based index
  level: number // 1-based level (1-16)
}
