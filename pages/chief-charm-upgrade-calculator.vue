<script setup lang="ts">
const PAGE_TITLE = 'Chief Charm Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Chief Charms'
const PAGE_ICON = 'game-icons:emerald'
const PAGE_ICON_COLOR_CLASS = tw`bg-gradient-to-tl from-indigo-500 via-fuchsia-400 to-purple-500`

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  iconColorClass: PAGE_ICON_COLOR_CLASS,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const { mobileScrollIntoView } = useMobileScrollIntoView()

const {
  clearAll,
  filteredFromOptions,
  getFilteredToOptions,
  handleFromChange,
  handleToChange,
  hasAnySelectionOrInventory,
  queryParameters,
  state,
} = useChiefCharmState()

const {
  filteredGrandTotalMaterials,
  gearCosts,
  grandTotalCost,
  leftoverInventory,
  remainingCost,
} = useChiefCharmCalculator(state)

const gearPieces = GEAR_PIECES
const charmMaterials = CHARM_MATERIALS
</script>

<template>
  <MainContentCard
    :copy-url-button="queryParameters.hasAnyParameter"
    :heading="PAGE_TITLE"
    :icon-color-class="PAGE_ICON_COLOR_CLASS"
    :icon="PAGE_ICON"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <div class="space-y-12">
      <!-- Gear Selection Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="gearPiece in gearPieces"
          :key="gearPiece.id"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :aria-label="gearPiece.name"
                :class="gearPiece.iconColorClass"
                :name="gearPiece.icon"
                size="40"
              />
              <h4>{{ gearPiece.name }} Charms</h4>
              <ToolTip v-if="gearPiece.charmStatsBoost">
                Increases {{ gearPiece.charmStatsBoost }}
              </ToolTip>
            </div>
          </template>
          <template #content>
            <div class="mt-4 space-y-4">
              <div
                v-for="slotIndex in CHARM_SLOTS_PER_GEAR"
                :key="slotIndex"
                v-auto-animate
                class="space-y-2"
              >
                <div class="grid grid-cols-[auto,1fr,1fr] items-center gap-x-2 gap-y-1">
                  <span class="text-xs font-medium tabular-nums text-primary">#{{ slotIndex }}</span>
                  <ChiefUpgradeSelect
                    v-if="state?.gear?.[gearPiece.id]?.[slotIndex - 1]"
                    :model-value="state.gear[gearPiece.id][slotIndex - 1].from"
                    :options="filteredFromOptions"
                    :grouped-options="false"
                    label="From"
                    @change="(value: string | undefined) => handleFromChange(gearPiece.id, slotIndex - 1, value)"
                  />
                  <ChiefUpgradeSelect
                    v-if="state?.gear?.[gearPiece.id]?.[slotIndex - 1]"
                    :model-value="state.gear[gearPiece.id][slotIndex - 1].to"
                    :options="getFilteredToOptions(state.gear[gearPiece.id][slotIndex - 1]?.from)"
                    :grouped-options="false"
                    :disabled="!state.gear[gearPiece.id][slotIndex - 1]?.from"
                    label="To"
                    @change="(value: string | undefined) => handleToChange(gearPiece.id, slotIndex - 1, value)"
                  />
                </div>
                <div
                  v-if="Object.values(gearCosts[gearPiece.id]?.slotCosts?.[slotIndex - 1]?.total || {}).some(v => v > 0)"
                  v-auto-animate
                  class="space-y-2 text-sm"
                >
                  <Panel
                    v-if="gearCosts[gearPiece.id].slotCosts[slotIndex - 1].steps.length > 1"
                    toggleable
                    collapsed
                    :header="`Step costs (${gearCosts[gearPiece.id].slotCosts[slotIndex - 1].steps.length}\u00A0levels)`"
                    class="mb-2"
                  >
                    <ol
                      v-auto-animate
                      class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6"
                    >
                      <li
                        v-for="step in gearCosts[gearPiece.id].slotCosts[slotIndex - 1].steps"
                        :key="step.level.id"
                      >
                        <span class="block font-bold">To lv. {{ step.level.level }}:</span>
                        <span v-if="charmMaterials.some(({ key }) => step.level.cost[key] > 0)">
                          {{ renderChiefCharmUpgradeMaterialCosts(charmMaterials, step.level.cost) }}
                        </span>
                      </li>
                    </ol>
                  </Panel>
                  <h5 class="font-bold">
                    Upgrade cost:
                  </h5>
                  <p v-if="charmMaterials.some(({ key }) => gearCosts[gearPiece.id].slotCosts[slotIndex - 1].total[key] > 0)">
                    {{ renderChiefCharmUpgradeMaterialCosts(charmMaterials, gearCosts[gearPiece.id].slotCosts[slotIndex - 1].total) }}
                  </p>
                </div>
                <div
                  v-else-if="state.gear[gearPiece.id]?.[slotIndex - 1]?.from && state.gear[gearPiece.id]?.[slotIndex - 1]?.to"
                  class="text-sm italic text-primary"
                >
                  Select valid 'From' and 'To' levels to see costs.
                </div>
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
                  v-for="mat in charmMaterials"
                  :key="`inv-${mat.key}`"
                  class="flex items-center gap-2"
                >
                  <Icon
                    :aria-label="mat.label"
                    :class="mat.iconColorClass"
                    :name="mat.icon"
                    size="40"
                  />
                  <FloatLabel
                    variant="on"
                    class="flex-1"
                  >
                    <InputNumber
                      v-model="state.inventory[mat.key]"
                      :allow-empty="false"
                      :min="0"
                      fluid
                      highlight-on-focus
                      input-class="tabular-nums scroll-m-1"
                      show-buttons
                      @focus="mobileScrollIntoView"
                    />
                    <label class="font-bold tracking-wide">{{ mat.label }}</label>
                  </FloatLabel>
                </div>
              </div>

              <!-- Remaining Cost Display -->
              <div
                v-if="filteredGrandTotalMaterials.length > 0 && Object.values(state.inventory).some(value => value > 0)"
                class="inline-grid grid-cols-[repeat(3,auto)] items-center gap-x-3 gap-y-1.5"
              >
                <template
                  v-for="mat in charmMaterials"
                  :key="`rem-${mat.key}`"
                >
                  <template v-if="grandTotalCost && (grandTotalCost[mat.key] > 0 || state.inventory[mat.key] > 0)">
                    <Icon
                      :aria-label="mat.label"
                      :name="mat.icon"
                      size="20"
                      :class="mat.iconColorClass"
                    />
                    <span class="font-medium">{{ mat.label }}:</span>
                    <span
                      v-if="remainingCost && leftoverInventory"
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost[mat.key] > 0,
                        'text-green-500': remainingCost[mat.key] <= 0,
                      }"
                    >
                      <template v-if="remainingCost[mat.key] > 0">
                        {{ formatNumber(remainingCost[mat.key]) }} needed
                      </template>
                      <template v-else-if="leftoverInventory[mat.key] > 0">
                        {{ formatNumber(leftoverInventory[mat.key]) }} left over
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
                  <span
                    v-if="grandTotalCost"
                    class="text-right font-bold tabular-nums"
                  >{{ formatNumber(grandTotalCost[material.key]) }}</span>
                </template>
              </div>
              <div
                v-else
                class="italic text-primary"
              >
                Select charm levels to calculate total costs
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Clear Button -->
      <div class="flex items-center justify-center gap-4">
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
