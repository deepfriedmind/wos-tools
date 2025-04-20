<script setup lang="ts">
const PAGE_TITLE = 'Chief Gear Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Chief Gear'
const PAGE_ICON = 'game-icons:pirate-coat'
const PAGE_ICON_COLOR_CLASS = 'text-yellow-800'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  iconColorClass: PAGE_ICON_COLOR_CLASS,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const { mobileScrollIntoView } = useMobileScrollIntoView()

const {
  clearAll,
  getFilteredToOptions,
  handleFromChange,
  handleToChange,
  hasAnySelectionOrInventory,
  queryParameters,
  selectOptions,
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
    :icon="PAGE_ICON"
    :icon-color-class="PAGE_ICON_COLOR_CLASS"
    :heading="PAGE_TITLE"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <CopyButton
      v-if="queryParameters.hasAnyParameter"
      v-tooltip="'Copy link to current settings'"
      copy-string="currentUrl"
      variant="text"
      rounded
      class="!absolute right-0 top-0 size-12 animate-zoomin animate-once md:right-[rem(18)] md:top-[rem(18)]"
    >
      <Icon
        name="fluent:copy-link-24-regular"
        size="24"
        aria-label="Copy link to current settings"
      />
    </CopyButton>

    <div class="space-y-12">
      <!-- Gear Selection Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="gear in GEAR_PIECES"
          :key="gear.id"
          class="overflow-hidden"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :name="gear.icon"
                size="24"
                class="text-primary"
              />
              <h4>{{ gear.name }}</h4>
              <ToolTip>
                Increases {{ gear.stats }}
              </ToolTip>
            </div>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-4 space-y-4"
            >
              <div class="flex gap-4 max-sm:flex-col">
                <GearLevelSelect
                  :model-value="state.gear[gear.id].from"
                  :options="selectOptions"
                  label="From"
                  :tier-color-classes="TIER_COLOR_CLASSES"
                  @change="(value) => handleFromChange(gear.id, value)"
                />
                <GearLevelSelect
                  :model-value="state.gear[gear.id].to"
                  :options="getFilteredToOptions(state.gear[gear.id].from)"
                  :disabled="!state.gear[gear.id].from"
                  label="To"
                  :tier-color-classes="TIER_COLOR_CLASSES"
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
                  :header="`Show step costs (${gearCosts[gear.id].steps.length} levels)`"
                >
                  <ol class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6">
                    <li
                      v-for="step in gearCosts[gear.id].steps"
                      :key="step.level.id"
                    >
                      <span class="block font-bold">To {{ step.level.label }}:</span>
                      <span v-if="MATERIALS.some(({ key }) => step.level.cost[key] > 0)">
                        {{ renderMaterialCosts(MATERIALS, step.level.cost) }}
                      </span>
                    </li>
                  </ol>
                </Panel>
                <!-- Total for Piece -->
                <h5 class="font-bold">
                  Upgrade cost:
                </h5>
                <p v-if="MATERIALS.some(({ key }) => gearCosts[gear.id].total[key] > 0)">
                  {{ renderMaterialCosts(MATERIALS, gearCosts[gear.id].total) }}
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
              class="space-y-4"
            >
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <IftaLabel
                  v-for="mat in MATERIALS"
                  :key="`inv-${mat.key}`"
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
                  <label class="font-bold">{{ mat.label }}</label>
                </IftaLabel>
              </div>

              <div
                v-if="remainingCost.hasInventory && (grandTotalCost.hardenedAlloy > 0 || grandTotalCost.polishingSolution > 0 || grandTotalCost.designPlans > 0 || grandTotalCost.lunarAmber > 0)"
                class="inline-grid grid-cols-[auto,auto] gap-3"
              >
                <template
                  v-for="mat in MATERIALS"
                  :key="`rem-${mat.key}`"
                >
                  <template v-if="grandTotalCost[mat.key] > 0 || state.inventory[mat.key] > 0">
                    <span class="font-medium">{{ mat.label }}:</span>
                    <span
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost.remaining[mat.key] > 0,
                        'text-green-500': remainingCost.remaining[mat.key] === 0 && leftoverInventory[mat.key] >= 0,
                      }"
                    >
                      <template v-if="remainingCost.remaining[mat.key] > 0">
                        {{ formatNumber(remainingCost.remaining[mat.key]) }} needed
                      </template>
                      <template v-else-if="leftoverInventory[mat.key] > 0">
                        {{ formatNumber(leftoverInventory[mat.key]) }} left over
                      </template>
                      <template v-else>
                        Have enough
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
            <div v-auto-animate>
              <div
                v-if="filteredGrandTotalMaterials.length > 0"
                class="inline-grid grid-cols-[auto,auto] gap-3"
              >
                <template
                  v-for="material in filteredGrandTotalMaterials"
                  :key="material.key"
                >
                  <span class="font-medium">{{ material.label }}:</span>
                  <span class="text-right font-bold tabular-nums">{{ formatNumber(grandTotalCost[material.key]) }}</span>
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
          label="Clear all"
          icon="pi pi-trash"
          severity="danger"
          outlined
          size="small"
          :disabled="!hasAnySelectionOrInventory"
          @click="clearAll"
        />
      </div>
    </div>
  </MainContentCard>
</template>
