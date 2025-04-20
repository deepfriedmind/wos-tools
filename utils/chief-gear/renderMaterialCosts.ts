import type { Material } from '~/types/chief-gear'

/**
 * Returns a string for Chief Gear upgrade material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costRecord Record of material key to number
 * @returns string
 */
export default function renderMaterialCosts(
  materials: { key: Material, label: string }[],
  costRecord: Record<Material, number>,
) {
  return materials
    .filter(({ key }) => costRecord[key] > 0)
    .map(({ key, label }) => `${label}: ${formatNumber(costRecord[key])}`)
    .join(', ')
}
