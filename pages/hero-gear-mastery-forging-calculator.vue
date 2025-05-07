<script setup lang="ts">
const PAGE_TITLE = 'Hero Gear Mastery Forging Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for Hero Gear Mastery Forging upgrades'
const PAGE_ICON = 'game-icons:shoulder-armor'
const PAGE_ICON_COLOR_CLASS = tw`bg-gradient-to-tr from-amber-400 from-[46%] via-amber-100 via-[46%] to-amber-400 to-60%`

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  iconColorClass: PAGE_ICON_COLOR_CLASS,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const { mobileScrollIntoView } = useMobileScrollIntoView()

const {
  addGearPiece,
  clearAll,
  filteredFromOptions,
  getFilteredToOptions,
  handleFromChange,
  handleToChange,
  hasAnySelectionOrInventory,
  queryParameters,
  removeGearPiece,
  state,
} = useHeroGearMasteryState()

const {
  filteredGrandTotalMaterials,
  grandTotalCost,
  pieceCosts,
  remainingCost,
  renderHeroGearMasteryUpgradeMaterialCosts,
} = useHeroGearMasteryCalculator(state)

function getPieceCostById(pieceId: string) {
  return pieceCosts.value.find(pc => pc.id === pieceId) || { steps: [], total: { essenceStone: 0, mythicGearPiece: 0 } }
}
</script>

<template>
  <MainContentCard
    :copy-url-button="queryParameters.hasAnyParameter"
    :heading="PAGE_TITLE"
    :icon-color-class="PAGE_ICON_COLOR_CLASS"
    :icon="PAGE_ICON"
    :sub-heading="PAGE_DESCRIPTION"
    copy-url-button-label="Copy link to current settings"
  >
    <div class="space-y-12">
      <!-- Gear Pieces Grid -->
      <div
        v-auto-animate
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card
          v-for="(piece, index) in state.pieces"
          :key="piece.id"
        >
          <template #title>
            <div
              v-auto-animate
              class="flex items-center gap-2"
            >
              <ClientOnly>
                <Icon
                  aria-label="Hero gear piece"
                  :class="piece.gradient"
                  name="game-icons:shoulder-armor"
                  size="40"
                />
              </ClientOnly>
              <h4 class="text-lg font-bold">
                Hero Gear #{{ index + 1 }}
              </h4>
              <Button
                v-if="state.pieces.length > 1"
                icon="pi pi-times"
                text
                rounded
                aria-label="Remove piece"
                class="ml-auto"
                @click="removeGearPiece(piece.id)"
              />
            </div>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-4 space-y-4"
            >
              <div class="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:max-xl:grid-cols-1">
                <UpgradeSelect
                  :model-value="piece.from"
                  :options="filteredFromOptions"
                  :grouped-options="false"
                  label="From"
                  @change="(value) => handleFromChange(piece.id, value)"
                />
                <UpgradeSelect
                  :model-value="piece.to"
                  :options="getFilteredToOptions(piece.from)"
                  :grouped-options="false"
                  :disabled="!piece.from"
                  label="To"
                  @change="(value) => handleToChange(piece.id, value)"
                />
              </div>

              <!-- Cost Display for this Gear Piece -->
              <div
                v-if="getPieceCostById(piece.id).total.essenceStone > 0 || getPieceCostById(piece.id).total.mythicGearPiece > 0"
                v-auto-animate
                class="space-y-2 text-sm"
              >
                <Panel
                  v-if="getPieceCostById(piece.id).steps.length > 1"
                  toggleable
                  collapsed
                  :header="`Step costs (${getPieceCostById(piece.id).steps.length}&nbsp;levels)`"
                  class="mb-4"
                >
                  <ol
                    v-auto-animate
                    class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6"
                  >
                    <li
                      v-for="stepData in getPieceCostById(piece.id).steps"
                      :key="stepData.level.id"
                    >
                      <span class="block font-bold">To {{ stepData.level.label }}:</span>
                      <span v-if="HERO_GEAR_MASTERY_MATERIALS.some(({ key }) => stepData.cost[key] > 0)">
                        {{ renderHeroGearMasteryUpgradeMaterialCosts(HERO_GEAR_MASTERY_MATERIALS, stepData.cost) }}
                      </span>
                    </li>
                  </ol>
                </Panel>
                <h5 class="font-bold">
                  Upgrade cost:
                </h5>
                <p>
                  {{ renderHeroGearMasteryUpgradeMaterialCosts(HERO_GEAR_MASTERY_MATERIALS, getPieceCostById(piece.id).total) }}
                </p>
              </div>
              <div
                v-else-if="piece.from && piece.to"
                class="mt-4 text-sm italic text-primary"
              >
                Select valid 'From' and 'To' levels to see costs.
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Grand Total & Inventory Section -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Inventory & Remaining Cost Card -->
        <Card>
          <template #title>
            <h3 class="text-xl font-bold">
              Material inventory
            </h3>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-2 space-y-8"
            >
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div
                  v-for="material in HERO_GEAR_MASTERY_MATERIALS"
                  :key="`inv-${material.key}`"
                  class="flex items-center gap-2"
                >
                  <Icon
                    :aria-label="material.label"
                    :class="material.iconColorClass"
                    :name="material.icon"
                    size="40"
                  />
                  <FloatLabel
                    variant="on"
                    class="flex-1"
                  >
                    <InputNumber
                      v-model="state.inventory[material.key]"
                      :allow-empty="false"
                      :min="0"
                      fluid
                      highlight-on-focus
                      input-class="tabular-nums scroll-m-1"
                      show-buttons
                      @focus="mobileScrollIntoView"
                    />
                    <label class="font-bold tracking-wide">{{ material.label }}</label>
                  </FloatLabel>
                </div>
              </div>

              <div
                v-if="remainingCost.hasInventory && (grandTotalCost.essenceStone > 0 || grandTotalCost.mythicGearPiece > 0)"
                class="inline-grid grid-cols-[auto,auto,auto] items-center gap-x-3 gap-y-1.5"
              >
                <template
                  v-for="material in HERO_GEAR_MASTERY_MATERIALS"
                  :key="`rem-${material.key}`"
                >
                  <template v-if="grandTotalCost[material.key] > 0 || state.inventory[material.key] > 0">
                    <Icon
                      :aria-label="material.label"
                      :class="material.iconColorClass"
                      :name="material.icon"
                      size="20"
                    />
                    <span class="font-medium">{{ material.label }}:</span>
                    <span
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost.remaining[material.key] > 0,
                        'text-green-500': remainingCost.remaining[material.key] <= 0,
                      }"
                    >
                      <template v-if="remainingCost.remaining[material.key] > 0">
                        {{ formatNumber(remainingCost.remaining[material.key]) }} needed
                      </template>
                      <template v-else-if="remainingCost.leftover[material.key] > 0">
                        {{ formatNumber(remainingCost.leftover[material.key]) }} left over
                      </template>
                      <template v-else>
                        Have just enough
                      </template>
                    </span>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </Card>

        <!-- Grand Total Cost Card -->
        <Card>
          <template #title>
            <h3 class="text-xl font-bold">
              Grand total cost
            </h3>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-2"
            >
              <div
                v-if="filteredGrandTotalMaterials.length > 0"
                class="inline-grid grid-cols-[repeat(3,auto)] items-center gap-x-3 gap-y-1.5 text-lg"
              >
                <template
                  v-for="material in filteredGrandTotalMaterials"
                  :key="material.key"
                >
                  <Icon
                    :aria-label="material.label"
                    :class="material.iconColorClass"
                    :name="material.icon"
                    size="22"
                  />
                  <span class="font-medium">{{ material.label }}:</span>
                  <span class="text-right font-bold tabular-nums">{{ formatNumber(grandTotalCost[material.key]) }}</span>
                </template>
              </div>
              <div
                v-else
                class="italic text-primary"
              >
                Select gear mastery forging levels to calculate total costs
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Add + Clear buttons -->
      <div class="flex items-center justify-center gap-4">
        <Button
          icon="pi pi-plus"
          label="Add Hero Gear piece"
          outlined
          rounded
          size="small"
          @click="addGearPiece"
        />
        <Button
          :disabled="!hasAnySelectionOrInventory"
          icon="pi pi-trash"
          label="Clear all"
          outlined
          rounded
          severity="danger"
          size="small"
          @click="clearAll"
        />
      </div>
    </div>
  </MainContentCard>
</template>
