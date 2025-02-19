export interface ExpeditionSkillOption {
  label: string
  level: 1 | 2 | 3 | 4 | 5
  percentage: number
}

export interface ResourceCalculations {
  availableTime: string
  results: Array<Record<string, string>>
  startTimes: Array<{ label: string, time: string }>
  timeUntilMidnight: string
  timezone: string
  timezoneShort: string | undefined
  travelTimeTotal: string
}

export interface ResourceNode {
  boostPercent: number
  expeditionSkillLevel: 1 | 2 | 3 | 4 | 5
  heroImagePath: string
  heroName: string
  maxAmount: number
  rssImagePath: string
  rssName: string
}

export const BOOST_TYPES = {
  BOTH: 'Using both',
  CITY: 'Using city boost (+100%)',
  EXPEDITION: 'Using hero expedition skill',
  NONE: 'With no extra boost',
} as const

export type BoostType = keyof typeof BOOST_TYPES
export type BoostTypeValue = (typeof BOOST_TYPES)[BoostType]

export interface ExposedProperties {
  fastestGatheredNode: ResourceNode
  resourceCards: ResourceCard[]
}

export interface ResourceCard extends ResourceNode {
  amounts: Record<BoostTypeValue, string>
  startTimes: Record<BoostTypeValue, string>
}
