<script setup lang="ts">
definePageMeta({
  description: 'Calculate the max. number of troops for joining bear hunt rallies in Whiteout Survival.',
  title: 'Bear Hunt Rally Calculator 🐻‍❄️',
})

interface RallyComposition {
  infantry: number
  lancers: number
  marksmen: number
  total: number
}

interface Settings {
  deployment: number
  infantryPercent: number
  lancersPercent: number
  marksmenPercent: number
  rallyCount: number
  rallyOptions: Array<{ value: number }>
  snowApe: {
    enabled: boolean
    level: number
  }
  totalMarksmen: number
  useDeploymentBoostI: boolean
  useDeploymentBoostII: boolean
}

const route = useRoute()
const router = useRouter()

const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

const settings = useLocalStorage<Settings>(`${STORAGE_PREFIX}bear-rally-settings`, {
  deployment: 100_000,
  infantryPercent: 12,
  lancersPercent: 19,
  marksmenPercent: 69,
  rallyCount: Math.min(Math.max(Number(route.query.rallies) || 6, 1), 6),
  rallyOptions: Array.from({ length: 6 }, (_, index) => ({ value: index + 1 })),
  snowApe: {
    enabled: true,
    level: 1,
  },
  totalMarksmen: 100_000,
  useDeploymentBoostI: false,
  useDeploymentBoostII: false,
})

// Computed percentages as decimals
const MARKSMEN_PERCENT = computed(() => settings.value.marksmenPercent / 100)
const LANCERS_PERCENT = computed(() => settings.value.lancersPercent / 100)
const INFANTRY_PERCENT = computed(() => settings.value.infantryPercent / 100)

const formatNumber = (number: number) => new Intl.NumberFormat().format(number)

// Load from URL params if present
if (route.query.marksmen) {
  const amount = Number(route.query.marksmen)
  if (!Number.isNaN(amount)) {
    settings.value.totalMarksmen = amount
  }
}

if (route.query.deployment) {
  const amount = Number(route.query.deployment)
  if (!Number.isNaN(amount)) {
    settings.value.deployment = amount
  }
}

if (route.query.rallies) {
  const amount = Number(route.query.rallies)
  if (!Number.isNaN(amount)) {
    settings.value.rallyCount = amount
  }
}

// Load percentages from URL if present
if (route.query.marksmenPercent && route.query.lancersPercent && route.query.infantryPercent) {
  const marksmenPercentValue = Number(route.query.marksmenPercent)
  const lancersPercentValue = Number(route.query.lancersPercent)
  const infantryPercentValue = Number(route.query.infantryPercent)
  if (!Number.isNaN(marksmenPercentValue) && !Number.isNaN(lancersPercentValue) && !Number.isNaN(infantryPercentValue)) {
    settings.value.marksmenPercent = marksmenPercentValue
    settings.value.lancersPercent = lancersPercentValue
    settings.value.infantryPercent = infantryPercentValue
  }
}

// Handle URL params for deployment boosts
if (route.query.deploymentBoostI === '1') {
  settings.value.useDeploymentBoostI = true
  settings.value.useDeploymentBoostII = false
}

if (route.query.deploymentBoostII === '1') {
  settings.value.useDeploymentBoostII = true
  settings.value.useDeploymentBoostI = false
}

// Watch deployment boosts to ensure mutual exclusivity
watch(() => settings.value.useDeploymentBoostI, (newValue) => {
  if (newValue && settings.value.useDeploymentBoostII)
    settings.value.useDeploymentBoostII = false
})

watch(() => settings.value.useDeploymentBoostII, (newValue) => {
  if (newValue && settings.value.useDeploymentBoostI)
    settings.value.useDeploymentBoostI = false
})

if (route.query.snowApe === '0') {
  settings.value.snowApe.enabled = false
}

if (route.query.snowApeLevel) {
  const level = Number(route.query.snowApeLevel)
  if (!Number.isNaN(level) && level >= 1 && level <= 10) {
    settings.value.snowApe.level = level
  }
}

const SNOW_APE_LEVELS = Array.from({ length: 10 }, (_, index) => ({
  bonus: (index + 1) * 1500,
  label: `Lv. ${index + 1} (+${formatNumber((index + 1) * 1500)})`,
  value: index + 1,
}))

const effectiveCapacity = computed(() => {
  let capacity = settings.value.deployment

  // Apply deployment boosts if enabled
  if (settings.value.useDeploymentBoostI)
    capacity *= 1.1
  else if (settings.value.useDeploymentBoostII)
    capacity *= 1.2

  // Apply Snow Ape bonus if enabled
  if (settings.value.snowApe.enabled) {
    const { bonus } = SNOW_APE_LEVELS[settings.value.snowApe.level - 1]
    capacity += bonus
  }

  return Math.floor(capacity)
})

// Watch settings and update URL
watchDebounced(settings, () => {
  router.replace({
    query: {
      ...route.query,
      deployment: settings.value.deployment.toString(),
      deploymentBoostI: settings.value.useDeploymentBoostI ? '1' : '0',
      deploymentBoostII: settings.value.useDeploymentBoostII ? '1' : '0',
      infantryPercent: settings.value.infantryPercent.toString(),
      lancersPercent: settings.value.lancersPercent.toString(),
      marksmen: settings.value.totalMarksmen.toString(),
      marksmenPercent: settings.value.marksmenPercent.toString(),
      rallies: settings.value.rallyCount.toString(),
      snowApe: settings.value.snowApe.enabled ? '1' : '0',
      snowApeLevel: settings.value.snowApe.level.toString(),
    },
  })
}, { debounce: 250, deep: true })

const rallyLeader = computed<RallyComposition>(() => {
  const total = effectiveCapacity.value

  return {
    infantry: Math.floor(total * INFANTRY_PERCENT.value),
    lancers: Math.floor(total * LANCERS_PERCENT.value),
    marksmen: Math.floor(total * MARKSMEN_PERCENT.value),
    total,
  }
})

const remainingMarksmen = computed(() => settings.value.totalMarksmen - rallyLeader.value.marksmen)
const joiningRallyComposition = computed<RallyComposition>(() => {
  const marksmenPerRally = Math.floor(remainingMarksmen.value / settings.value.rallyCount)
  const total = Math.floor(marksmenPerRally / MARKSMEN_PERCENT.value)

  return {
    infantry: Math.floor(total * INFANTRY_PERCENT.value),
    lancers: Math.floor(total * LANCERS_PERCENT.value),
    marksmen: marksmenPerRally,
    total,
  }
})

// Total troops composition (rally leader + joining rallies)
const totalComposition = computed<RallyComposition>(() => {
  // Calculate total troops based on rally leader plus joining rallies
  const infantry = rallyLeader.value.infantry + (joiningRallyComposition.value.infantry * settings.value.rallyCount)
  const lancers = rallyLeader.value.lancers + (joiningRallyComposition.value.lancers * settings.value.rallyCount)
  const marksmen = rallyLeader.value.marksmen + (joiningRallyComposition.value.marksmen * settings.value.rallyCount)
  const total = infantry + lancers + marksmen

  return { infantry, lancers, marksmen, total }
})

// Troop type distribution configuration
const troopInputs = [
  ['infantryPercent', 'Infantry'],
  ['lancersPercent', 'Lancers'],
  ['marksmenPercent', 'Marksmen'],
] as const

const totalPercentage = computed(() => settings.value.infantryPercent + settings.value.lancersPercent + settings.value.marksmenPercent)
const isTotalValid = computed(() => totalPercentage.value === 100)
const isMarksmenHighest = computed(() => {
  const currentMarksmenPercent = settings.value.marksmenPercent

  return currentMarksmenPercent > settings.value.infantryPercent && currentMarksmenPercent > settings.value.lancersPercent
})

const rallyLeaderRows = computed(() => [
  { label: `Infantry (${settings.value.infantryPercent}%):`, value: rallyLeader.value.infantry },
  { label: `Lancers (${settings.value.lancersPercent}%):`, value: rallyLeader.value.lancers },
  { label: `Marksmen (${settings.value.marksmenPercent}%):`, value: rallyLeader.value.marksmen },
])

const joiningRallySections = computed(() => {
  const sections = [
    {
      title: 'Per rally',
      values: {
        infantry: joiningRallyComposition.value.infantry,
        lancers: joiningRallyComposition.value.lancers,
        marksmen: joiningRallyComposition.value.marksmen,
        total: joiningRallyComposition.value.total,
      },
    },
  ]

  // Only show total joining rallies section if there's more than 1 rally
  if (settings.value.rallyCount > 1) {
    sections.push({
      title: `All ${settings.value.rallyCount} joining rallies`,
      values: {
        infantry: joiningRallyComposition.value.infantry * settings.value.rallyCount,
        lancers: joiningRallyComposition.value.lancers * settings.value.rallyCount,
        marksmen: joiningRallyComposition.value.marksmen * settings.value.rallyCount,
        total: joiningRallyComposition.value.total * settings.value.rallyCount,
      },
    })
  }

  sections.push({
    title: 'Grand total',
    values: {
      infantry: totalComposition.value.infantry,
      lancers: totalComposition.value.lancers,
      marksmen: totalComposition.value.marksmen,
      total: totalComposition.value.total,
    },
  })

  return sections
})

const isShaking = ref(false)
const lastFactIndex = ref(-1)
const toast = useToast()

function handleBearClick() {
  if (isShaking.value)
    return

  isShaking.value = true

  // Get a random index different from the last one
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * POLAR_BEAR_FACTS.length)
  } while (randomIndex === lastFactIndex.value)

  lastFactIndex.value = randomIndex
  const randomPolarBearFact = POLAR_BEAR_FACTS[randomIndex]
  toast.removeAllGroups()
  setTimeout(() => {
    toast.add({ detail: randomPolarBearFact, life: 5000, severity: 'info', summary: '🐻‍❄️ Did you know?' })
  }, 100)

  setTimeout(() => {
    isShaking.value = false
  }, 820)
}
</script>

<template>
  <Transition
    appear
    enter-active-class="duration-[1.1s] delay-[3s] ease-out-back"
    enter-from-class="translate-y-[1%] opacity-0"
    leave-to-class="translate-y-[-56%] opacity-100"
  >
    <div class="group absolute left-1/2 -translate-x-1/2 translate-y-[-56%] transition duration-300 ease-out-back leading-0 hover:translate-y-[-78%]">
      <PolarBear
        class="origin-bottom cursor-pointer transition-transform duration-300 ease-out-back will-change-transform group-hover:scale-110"
        :class="{ 'animate-shake': isShaking }"
        @click="handleBearClick"
      />
    </div>
  </Transition>

  <MainContentCard
    heading="Bear Hunt Rally Calculator"
    sub-heading="Calculate the max. number of troops for joining bear hunt rallies."
  >
    <CopyButton
      v-if="route.query.marksmen"
      v-tooltip.top="'Copy link to current settings'"
      copy-string="currentUrl"
      variant="text"
      rounded
      class="!absolute right-[rem(18)] top-[rem(18)] size-12 animate-zoomin animate-once"
    >
      <Icon
        name="fluent:copy-link-24-regular"
        size="24"
        aria-label="Copy link to current settings"
      />
    </CopyButton>

    <div class="space-y-12">
      <div class="space-y-8">
        <div class="flex items-center gap-4">
          <label
            for="totalMarksmen"
            class="w-64 text-lg"
          >Total marksmen:
            <ToolTip value="Highest tier. Don't join with lower tiers." />
          </label>
          <InputNumber
            v-model="settings.totalMarksmen"
            input-id="totalMarksmen"
            :max-fraction-digits="0"
            :min="1"
            class="w-36"
            fluid
            input-class="tabular-nums"
            show-buttons
            size="large"
          />
        </div>

        <div class="flex items-center gap-4">
          <label
            for="squadDeploymentCapacity"
            class="w-64 text-lg"
          >Squad deployment capacity:</label>
          <div class="flex items-center gap-4">
            <InputNumber
              v-model="settings.deployment"
              input-id="squadDeploymentCapacity"
              :max-fraction-digits="0"
              :min="1"
              class="w-36"
              fluid
              input-class="tabular-nums"
              show-buttons
              size="large"
            />
          </div>
        </div>

        <Fieldset
          legend="Deployment capacity boosts"
          toggleable
          :collapsed="!settings.snowApe.enabled && !settings.useDeploymentBoostI && !settings.useDeploymentBoostII"
        >
          <div
            v-auto-animate
            class="flex items-center justify-between gap-4"
          >
            <div class="space-y-8">
              <div class="flex min-h-16 items-center gap-4">
                <ToggleSwitch
                  v-model="settings.snowApe.enabled"
                  input-id="useSnowApe"
                />
                <label
                  for="useSnowApe"
                  class="w-[rem(181)] cursor-pointer"
                >Use Snow Ape skill</label>
                <IftaLabel v-if="settings.snowApe.enabled">
                  <Select
                    v-model="settings.snowApe.level"
                    :options="SNOW_APE_LEVELS"
                    option-label="label"
                    option-value="value"
                    label-id="snowApeLevel"
                  />
                  <label
                    for="snowApeLevel"
                    class="font-bold"
                  >Skill level</label>
                </IftaLabel>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-4">
                  <ToggleSwitch
                    v-model="settings.useDeploymentBoostI"
                    input-id="deploymentBoostI"
                    class="min-w-10"
                  />
                  <label
                    for="deploymentBoostI"
                    class="cursor-pointer"
                  >Use Deployment Capacity Boost I <span class="align-text-bottom text-sm">(+10%)</span></label>
                </div>
                <div class="flex items-center gap-4">
                  <ToggleSwitch
                    v-model="settings.useDeploymentBoostII"
                    input-id="deploymentBoostII"
                    class="min-w-10"
                  />
                  <label
                    for="deploymentBoostII"
                    class="cursor-pointer"
                  >Use Deployment Capacity Boost II <span class="mr-2 align-text-bottom text-sm">(+20%)</span>
                    <ToolTip value="Applied to base capacity. Only one City Bonus for deployment capacity can be active." />
                  </label>
                </div>
              </div>
            </div>
            <div v-if="settings.snowApe.enabled || settings.useDeploymentBoostI || settings.useDeploymentBoostII">
              <span class="font-medium tabular-nums xl:text-lg">{{ formatNumber(effectiveCapacity) }}</span> total capacity
            </div>
          </div>
        </Fieldset>

        <div class="flex items-center gap-4">
          <label
            for="rallyCount"
            class="w-64 text-lg"
          >Number of joining rallies:</label>
          <Select
            v-model="settings.rallyCount"
            label-id="rallyCount"
            :options="settings.rallyOptions"
            option-label="value"
            option-value="value"
          />
        </div>

        <div class="items-center gap-4 lg:flex">
          <div class="w-64 text-lg max-lg:mb-4">
            Troop type distribution %:
          </div>
          <div class="flex justify-start gap-4">
            <div
              v-for="[key, label] in troopInputs"
              :key="key"
              class="flex justify-start gap-4"
            >
              <IftaLabel>
                <InputNumber
                  v-model="settings[key]"
                  :max-fraction-digits="0"
                  :max="100"
                  :min="0"
                  class="w-36"
                  fluid
                  input-class="tabular-nums"
                  show-buttons
                  size="large"
                />
                <label class="font-bold">{{ label }}</label>
              </IftaLabel>
            </div>
            <Message
              v-if="!isTotalValid"
              severity="error"
              size="small"
              icon="pi pi-exclamation-triangle"
            >
              Total must be 100% (current: <span class="tabular-nums">{{ totalPercentage }}</span>%)
            </Message>
            <Message
              v-else-if="!isMarksmenHighest"
              severity="error"
              size="small"
              icon="pi pi-exclamation-triangle"
            >
              Marksmen % must be the highest
            </Message>
            <Message
              v-else
              severity="success"
              icon="pi pi-check"
              size="small"
            >
              100%
            </Message>
          </div>
        </div>
      </div>

      <div class="gap-8 max-xl:space-y-8 xl:flex">
        <Card>
          <template #title>
            <h3 class="text-xl font-semibold">
              <Icon
                name="fluent-emoji:1st-place-medal"
                size="24"
                class="align-text-top"
              />
              Rally leader composition
            </h3>
          </template>
          <template #content>
            <div class="inline-block space-y-2">
              <div
                v-for="(row, index) in rallyLeaderRows"
                :key="index"
                class="flex h-10 items-center justify-between gap-2"
              >
                <span>{{ row.label }}</span>
                <span class="font-medium tabular-nums">{{ formatNumber(row.value) }}</span>
              </div>
            </div>
            <Divider type="dotted" />
            Marksmen left for joining rallies: <span class="font-medium tabular-nums">{{ formatNumber(remainingMarksmen) }}</span>
          </template>
        </Card>

        <Card class="flex-1">
          <template #title>
            <h3 class="text-xl font-semibold">
              <Icon
                name="fluent-emoji:2nd-place-medal"
                size="24"
                class="align-text-top"
              />
              Joining rallies composition
            </h3>
          </template>
          <template #content>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div
                v-for="{ title, values }, index in joiningRallySections"
                :key="title"
                class="space-y-2"
              >
                <h3 class="font-semibold">
                  {{ title }}
                </h3>
                <div class="inline-block space-y-2">
                  <div
                    v-for="troopType in ['infantry', 'lancers', 'marksmen'] as const"
                    :key="troopType"
                    class="flex h-10 items-center justify-between gap-2"
                  >
                    <span v-if="index === 0">{{ useCapitalize(troopType) }}:</span>
                    <span
                      class="font-medium tabular-nums"
                      :class="{ 'text-green-500': index === 0 }"
                    >{{ formatNumber(values[troopType]) }}<CopyButton
                      v-if="index === 0"
                      v-tooltip.top="{ value: 'Copy value', showDelay: 700 }"
                      :copy-string="String(values[troopType])"
                      variant="text"
                      rounded
                      size="small"
                      icon="pi pi-copy"
                      class="-ml-1.5 -mr-2.5"
                    /></span>
                  </div>
                  <Divider type="dotted" />
                  <div class="flex justify-between gap-2 pt-2 font-medium tabular-nums">
                    <span v-if="index === 0">Total:</span>
                    <span>{{ formatNumber(values.total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="text-center">
        <a
          href="https://outof.games/realms/whiteoutsurvival/guides/397-everything-you-need-to-know-about-bear-hunt-in-whiteout-survival/"
          target="_blank"
          rel="external noopener noreferrer"
          class="text-sm text-primary transition-colors hover:text-primary-300 hover:underline"
        >Good Bear Hunt guide</a>
      </div>
    </div>
  </MainContentCard>
</template>
