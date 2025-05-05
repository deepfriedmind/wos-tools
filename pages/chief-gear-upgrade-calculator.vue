<script setup lang="ts">
const PAGE_TITLE = 'Chief Gear Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Chief Gear'
const PAGE_ICON = 'game-icons:pirate-coat'
const PAGE_ICON_COLOR_CLASS = 'bg-gradient-to-r from-yellow-700 to-yellow-700 via-yellow-900'

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
} = useChiefGearState()

const {
  filteredGrandTotalMaterials,
  gearCosts,
  grandTotalCost,
  leftoverInventory,
  remainingCost,
} = useChiefGearCalculator(state)
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
          v-for="gear in GEAR_PIECES"
          :key="gear.id"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :aria-label="gear.name"
                :class="gear.iconColorClass"
                :name="gear.icon"
                size="40"
              />
              <h4>{{ gear.name }}</h4>
              <ToolTip>
                Increases {{ gear.statsBoost }}
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
                  :model-value="state.gear[gear.id].from"
                  :options="filteredFromOptions"
                  grouped-options
                  label="From"
                  @change="(value) => handleFromChange(gear.id, value)"
                />
                <ChiefUpgradeSelect
                  :disabled="!state.gear[gear.id].from"
                  :model-value="state.gear[gear.id].to"
                  :options="getFilteredToOptions(state.gear[gear.id].from)"
                  grouped-options
                  label="To"
                  @change="(value) => handleToChange(gear.id, value)"
                />
              </div>

              <!-- Cost Display for this Gear Piece -->
              <div
                v-if="gearCosts[gear.id].total.hardenedAlloy > 0 || gearCosts[gear.id].total.polishingSolution > 0 || gearCosts[gear.id].total.designPlans > 0 || gearCosts[gear.id].total.lunarAmber > 0"
                v-auto-animate
                class="space-y-2 text-sm"
              >
                <!-- Intermediate Steps -->
                <Panel
                  v-if="gearCosts[gear.id].steps.length > 1"
                  toggleable
                  collapsed
                  :header="`Step costs (${gearCosts[gear.id].steps.length}&nbsp;levels)`"
                  class="mb-4"
                >
                  <ol
                    v-auto-animate
                    class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6"
                  >
                    <li
                      v-for="{ level } in gearCosts[gear.id].steps"
                      :key="level.id"
                    >
                      <span class="block font-bold">To {{ level.label }}:</span>
                      <span v-if="MATERIALS.some(({ key }) => level.cost[key] > 0)">
                        {{ renderChiefGearUpgradeMaterialCosts(MATERIALS, level.cost) }}
                      </span>
                    </li>
                  </ol>
                </Panel>
                <!-- Total for Piece -->
                <h5 class="font-bold">
                  Upgrade cost:
                </h5>
                <p v-if="MATERIALS.some(({ key }) => gearCosts[gear.id].total[key] > 0)">
                  {{ renderChiefGearUpgradeMaterialCosts(MATERIALS, gearCosts[gear.id].total) }}
                </p>
              </div>
              <div
                v-else-if="state.gear[gear.id].from && state.gear[gear.id].to"
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
                  v-for="{ key, label, icon, iconColorClass } in MATERIALS"
                  :key="`inv-${key}`"
                  class="flex items-center gap-2"
                >
                  <Icon
                    :aria-label="label"
                    :class="iconColorClass"
                    :name="icon"
                    size="40"
                  />
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
                v-if="remainingCost.hasInventory && (grandTotalCost.hardenedAlloy > 0 || grandTotalCost.polishingSolution > 0 || grandTotalCost.designPlans > 0 || grandTotalCost.lunarAmber > 0)"
                class="inline-grid grid-cols-[auto,auto,auto] items-center gap-x-3 gap-y-1.5"
              >
                <template
                  v-for="{ key, label, icon, iconColorClass } in MATERIALS"
                  :key="`rem-${key}`"
                >
                  <template v-if="grandTotalCost[key] > 0 || state.inventory[key] > 0">
                    <Icon
                      :aria-label="label"
                      :class="iconColorClass"
                      :name="icon"
                      size="20"
                    />
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
                  v-for="{ key, label, icon, iconColorClass } in filteredGrandTotalMaterials"
                  :key="key"
                >
                  <Icon
                    :aria-label="label"
                    :class="iconColorClass"
                    :name="icon"
                    size="22"
                  />
                  <span class="font-medium">{{ label }}:</span>
                  <span class="text-right font-bold tabular-nums">{{ formatNumber(grandTotalCost[key]) }}</span>
                </template>
              </div>
              <div
                v-else
                class="italic text-primary"
              >
                Select gear levels to calculate total costs
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
