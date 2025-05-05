<script setup lang="ts">
const PAGE_TITLE = 'Fire Crystal Building Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Fire Crystal buildings'
const PAGE_IMAGE_PATH = '/img/fc.webp'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  imagePath: PAGE_IMAGE_PATH,
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
  upgradeData,
  upgradeLevelMap,
} = useFireCrystalBuildingState()

const {
  buildingCosts,
  filteredGrandTotalMaterials,
  grandTotalCost,
  leftoverInventory,
  remainingCost,
  renderFireCrystalBuildingUpgradeMaterialCosts,
} = useFireCrystalBuildingCalculator(state, upgradeData, upgradeLevelMap)
</script>

<template>
  <MainContentCard
    :copy-url-button="queryParameters.hasAnyParameter"
    :heading="PAGE_TITLE"
    :image-path="PAGE_IMAGE_PATH"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <div class="space-y-12">
      <!-- Building Selection Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="building in FC_BUILDINGS"
          :key="building.id"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :aria-label="building.name"
                :class="building.iconColorClass"
                :name="building.icon"
                size="40"
              />
              <h4>{{ building.name }}</h4>
              <ToolTip>
                {{ building.description }}
              </ToolTip>
            </div>
          </template>

          <template #content>
            <div
              v-auto-animate
              class="mt-4 space-y-4"
            >
              <div class="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:max-xl:grid-cols-1">
                <ChiefUpgradeSelect
                  :model-value="state.buildings[building.id].from"
                  :options="filteredFromOptions"
                  grouped-options
                  label="From"
                  @change="(value) => handleFromChange(building.id, value)"
                />
                <ChiefUpgradeSelect
                  :disabled="!state.buildings[building.id].from"
                  :model-value="state.buildings[building.id].to"
                  :options="getFilteredToOptions(building.id, state.buildings[building.id].from)"
                  grouped-options
                  label="To"
                  @change="(value) => handleToChange(building.id, value)"
                />
              </div>

              <!-- Cost Display for this Building -->
              <div
                v-if="buildingCosts[building.id].total.wood > 0 || buildingCosts[building.id].total.meat > 0 || buildingCosts[building.id].total.coal > 0 || buildingCosts[building.id].total.iron > 0 || buildingCosts[building.id].total.fireCrystal > 0 || buildingCosts[building.id].total.refinedFireCrystal > 0"
                v-auto-animate
                class="space-y-2 text-sm"
              >
                <!-- Intermediate Steps -->
                <Panel
                  v-if="buildingCosts[building.id].steps.length > 1"
                  toggleable
                  collapsed
                  :header="`Show step costs (${buildingCosts[building.id].steps.length}&nbsp;levels)`"
                  class="mb-4"
                >
                  <ol
                    v-auto-animate
                    class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6"
                  >
                    <li
                      v-for="{ level } in buildingCosts[building.id].steps"
                      :key="level.id"
                    >
                      <span class="block font-bold">To {{ level.label }}:</span>
                      <span v-if="FC_MATERIALS.some(({ key }) => level.cost[key] > 0)">
                        {{ renderFireCrystalBuildingUpgradeMaterialCosts(FC_MATERIALS, level.cost) }}
                      </span>
                    </li>
                  </ol>
                </Panel>
                <!-- Total for Building -->
                <h5 class="font-bold">
                  Upgrade cost:
                </h5>
                <p v-if="FC_MATERIALS.some(({ key }) => buildingCosts[building.id].total[key] > 0)">
                  {{ renderFireCrystalBuildingUpgradeMaterialCosts(FC_MATERIALS, buildingCosts[building.id].total) }}
                </p>
              </div>
              <div
                v-else-if="state.buildings[building.id].from && state.buildings[building.id].to"
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
                  v-for="{ key, label, imagePath } in FC_MATERIALS"
                  :key="`inv-${key}`"
                  class="flex items-center gap-2"
                >
                  <img
                    :alt="label"
                    :src="imagePath"
                    width="40"
                    height="40"
                    class="drop-shadow-lg"
                  >
                  <FloatLabel
                    variant="on"
                    class="flex-1"
                  >
                    <InputNumber
                      v-model="state.inventory[key]"
                      :allow-empty="false"
                      :min="0"
                      fluid
                      highlight-on-focus
                      input-class="tabular-nums scroll-m-1"
                      show-buttons
                      @focus="mobileScrollIntoView"
                    />
                    <label class="font-bold tracking-wide">{{ label }}</label>
                  </FloatLabel>
                </div>
              </div>

              <div
                v-if="remainingCost.hasInventory && (grandTotalCost.wood > 0 || grandTotalCost.meat > 0 || grandTotalCost.coal > 0 || grandTotalCost.iron > 0 || grandTotalCost.fireCrystal > 0 || grandTotalCost.refinedFireCrystal > 0)"
                class="inline-grid grid-cols-[auto,auto,auto] items-center gap-x-3 gap-y-1.5"
              >
                <template
                  v-for="{ key, label, imagePath } in FC_MATERIALS"
                  :key="`rem-${key}`"
                >
                  <template v-if="grandTotalCost[key] > 0 || state.inventory[key] > 0">
                    <img
                      :alt="label"
                      :src="imagePath"
                      width="20"
                      height="20"
                      class="drop-shadow"
                    >
                    <span class="font-medium">{{ label }}:</span>
                    <span
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost.remaining[key] > 0,
                        'text-green-500': remainingCost.remaining[key] === 0 && leftoverInventory[key] >= 0,
                      }"
                    >
                      <template v-if="remainingCost.remaining[key] > 0">
                        {{ formatNumber(remainingCost.remaining[key]) }} needed
                      </template>
                      <template v-else-if="leftoverInventory[key] > 0">
                        {{ formatNumber(leftoverInventory[key]) }} left over
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
                  v-for="{ key, label, imagePath } in filteredGrandTotalMaterials"
                  :key="key"
                >
                  <img
                    :alt="label"
                    :src="imagePath"
                    width="24"
                    height="24"
                    class="drop-shadow"
                  >
                  <span class="font-medium">{{ label }}:</span>
                  <span class="text-right font-bold tabular-nums">{{ formatNumber(grandTotalCost[key]) }}</span>
                </template>
              </div>
              <div
                v-else
                class="italic text-primary"
              >
                Select building levels to calculate total costs
              </div>
            </div>
          </template>
        </Card>
      </div>
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
