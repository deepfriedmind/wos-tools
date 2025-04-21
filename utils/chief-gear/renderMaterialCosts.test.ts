import { describe, expect, it, vi } from 'vitest'

import type { Material } from '~/types/chief-gear'
import renderMaterialCosts from '~/utils/chief-gear/renderMaterialCosts'

// Mock formatNumber for deterministic output
vi.mock('~/utils/formatNumber', () => ({
  default: (value: number) => `#${value}#`,
}))

const materials = [
  { key: 'designPlans' as Material, label: 'Plans' },
  { key: 'hardenedAlloy' as Material, label: 'Alloy' },
  { key: 'lunarAmber' as Material, label: 'Amber' },
  { key: 'polishingSolution' as Material, label: 'Solution' },
]

describe('renderMaterialCosts', () => {
  it('returns formatted string for all nonzero costs', () => {
    const costRecord = {
      designPlans: 100,
      hardenedAlloy: 200,
      lunarAmber: 300,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Plans: #100#, Alloy: #200#, Amber: #300#, Solution: #400#',
    )
  })

  it('omits materials with zero cost', () => {
    const costRecord = {
      designPlans: 0,
      hardenedAlloy: 200,
      lunarAmber: 0,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Alloy: #200#, Solution: #400#',
    )
  })

  it('returns empty string if all costs are zero', () => {
    const costRecord = {
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe('')
  })

  it('returns empty string for empty materials array', () => {
    const costRecord = {
      designPlans: 100,
      hardenedAlloy: 200,
      lunarAmber: 300,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts([], costRecord)).toBe('')
  })

  it('handles missing keys in costRecord as undefined (treated as NaN > 0 is false)', () => {
    const costRecord = {
      designPlans: 100,
      // hardenedAlloy missing
      lunarAmber: 0,
      // polishingSolution missing
    } as Record<Material, number>

    expect(renderMaterialCosts(materials, costRecord)).toBe('Plans: #100#')
  })

  it('handles negative and fractional costs (only > 0 included)', () => {
    const costRecord = {
      designPlans: -5,
      hardenedAlloy: 0.5,
      lunarAmber: 0,
      polishingSolution: 2.7,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Alloy: #0.5#, Solution: #2.7#',
    )
  })

  it('handles single material', () => {
    const singleMaterial = [{ key: 'designPlans' as Material, label: 'Plans' }]
    const costRecord = { designPlans: 123 } as Record<Material, number>
    expect(renderMaterialCosts(singleMaterial, costRecord)).toBe('Plans: #123#')
  })

  it('handles costRecord with extra keys not in materials', () => {
    const costRecord = {
      designPlans: 10,
      // extra key for test
      extra: 999,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe('Plans: #10#')
  })
})
