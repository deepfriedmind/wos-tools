<script setup lang="ts">
const PAGE_TITLE = 'Chief Charm Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Chief Charms'
const PAGE_ICON = 'mdi:star-four-points-outline'
const PAGE_ICON_COLOR_CLASS = 'text-purple-400'

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
} = useChiefCharmState()

const {
  remainingCost,
  totalCost,
} = useChiefCharmCalculator(state)

const gearPieces = GEAR_PIECES
const charmMaterials = CHARM_MATERIALS
const filteredTotalMaterials = computed(() => {
  if (!totalCost.value)
    return []

  return charmMaterials.filter(mat => totalCost.value[mat.key] > 0)
})
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
          v-for="gearPiece in gearPieces"
          :key="gearPiece.id"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :name="gearPiece.icon"
                size="40"
                :class="gearPiece.iconColorClass"
              />
              <h4>{{ gearPiece.name }} Charms</h4>
              <ToolTip v-if="gearPiece.charmStatsBoost">
                Increases {{ gearPiece.charmStatsBoost }}
              </ToolTip>
            </div>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-4 space-y-4"
            >
              <!-- Loop directly using the constant for clarity -->
              <div
                v-for="slotIndex in CHARM_SLOTS_PER_GEAR"
                :key="slotIndex"
                class="grid grid-cols-[auto,1fr,auto,1fr] items-center gap-x-2 gap-y-1"
              >
                <span class="text-xs text-gray-400">Slot {{ slotIndex }}</span> <!-- Use 1-based index -->
                <ChiefUpgradeSelect
                  v-if="state?.gear?.[gearPiece.id]?.[slotIndex - 1]"
                  :model-value="state.gear[gearPiece.id][slotIndex - 1].from"
                  :options="selectOptions"
                  :grouped-options="false"
                  label="From Lv."
                  @change="(value: string | undefined) => handleFromChange(gearPiece.id, slotIndex - 1, value)"
                />
                <span class="text-gray-400">→</span>
                <ChiefUpgradeSelect
                  v-if="state?.gear?.[gearPiece.id]?.[slotIndex - 1]"
                  :model-value="state.gear[gearPiece.id][slotIndex - 1].to"
                  :options="getFilteredToOptions(state.gear[gearPiece.id][slotIndex - 1]?.from)"
                  :grouped-options="false"
                  :disabled="!state.gear[gearPiece.id][slotIndex - 1]?.from"
                  label="To Lv."
                  @change="(value: string | undefined) => handleToChange(gearPiece.id, slotIndex - 1, value)"
                />
              </div>
              <!-- TODO: Add cost display per slot/piece if needed -->
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
                    :name="mat.icon"
                    size="40"
                    :class="mat.iconColorClass"
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
                v-if="hasAnySelectionOrInventory && filteredTotalMaterials.length > 0"
                class="inline-grid grid-cols-[auto,auto,auto] items-center gap-x-3 gap-y-1.5"
              >
                <template
                  v-for="mat in charmMaterials"
                  :key="`rem-${mat.key}`"
                >
                  <!-- Check if totalCost has value before accessing -->
                  <template v-if="totalCost && (totalCost[mat.key] > 0 || state.inventory[mat.key] > 0)">
                    <Icon
                      :name="mat.icon"
                      size="20"
                      :class="mat.iconColorClass"
                    />
                    <span class="font-medium">{{ mat.label }}:</span>
                    <!-- Check if remainingCost has value before accessing -->
                    <span
                      v-if="remainingCost"
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost[mat.key] > 0,
                        'text-green-500': remainingCost[mat.key] <= 0, // Simplified logic
                      }"
                    >
                      <template v-if="remainingCost[mat.key] > 0">
                        {{ formatNumber(remainingCost[mat.key]) }} needed
                      </template>
                      <template v-else>
                        Have enough
                        <!-- Optionally show leftover: {{ formatNumber(Math.abs(remainingCost[mat.key])) }} left -->
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
                v-if="filteredTotalMaterials.length > 0"
                class="inline-grid grid-cols-[repeat(3,auto)] items-center gap-x-3 gap-y-1.5 text-lg"
              >
                <template
                  v-for="material in filteredTotalMaterials"
                  :key="material.key"
                >
                  <Icon
                    :name="material.icon"
                    size="22"
                    :class="material.iconColorClass"
                  />
                  <span class="font-medium">{{ material.label }}:</span>
                  <!-- Check if totalCost has value before accessing -->
                  <span
                    v-if="totalCost"
                    class="text-right font-bold tabular-nums"
                  >{{ formatNumber(totalCost[material.key]) }}</span>
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
