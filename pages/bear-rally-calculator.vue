<script setup lang="ts">
useHead({
  title: 'Bear Rally Calculator 🐻‍❄️',
})

interface RallyComposition {
  infantry: number
  lancers: number
  marksmen: number
  total: number
}

const route = useRoute()
const router = useRouter()

const totalMarksmen = ref(100_000)
const squadDeploymentCapacity = ref(100_000)
const rallyCount = ref(Math.min(Math.max(Number(route.query.rallies) || 6, 1), 6))
const rallyOptions = Array.from({ length: 6 }, (_, index) => ({ value: index + 1 }))

const marksmenPercent = ref(69)
const lancersPercent = ref(19)
const infantryPercent = ref(12)

// Computed percentages as decimals
const MARKSMEN_PERCENT = computed(() => marksmenPercent.value / 100)
const LANCERS_PERCENT = computed(() => lancersPercent.value / 100)
const INFANTRY_PERCENT = computed(() => infantryPercent.value / 100)

if (route.query.marksmen) {
  const amount = Number(route.query.marksmen)
  if (!Number.isNaN(amount)) {
    totalMarksmen.value = amount
  }
}

if (route.query.deployment) {
  const amount = Number(route.query.deployment)
  if (!Number.isNaN(amount)) {
    squadDeploymentCapacity.value = amount
  }
}

if (route.query.rallies) {
  const amount = Number(route.query.rallies)
  if (!Number.isNaN(amount)) {
    rallyCount.value = amount
  }
}

// Load percentages from URL if present
if (route.query.marksmenPercent && route.query.lancersPercent && route.query.infantryPercent) {
  const marksmenPercentValue = Number(route.query.marksmenPercent)
  const lancersPercentValue = Number(route.query.lancersPercent)
  const infantryPercentValue = Number(route.query.infantryPercent)
  if (!Number.isNaN(marksmenPercentValue) && !Number.isNaN(lancersPercentValue) && !Number.isNaN(infantryPercentValue)) {
    marksmenPercent.value = marksmenPercentValue
    lancersPercent.value = lancersPercentValue
    infantryPercent.value = infantryPercentValue
  }
}

// Also watch and save percentages in URL
watch([totalMarksmen, squadDeploymentCapacity, rallyCount, marksmenPercent, lancersPercent, infantryPercent], () => {
  router.replace({
    query: {
      deployment: squadDeploymentCapacity.value.toString(),
      infantryPercent: infantryPercent.value.toString(),
      lancersPercent: lancersPercent.value.toString(),
      marksmen: totalMarksmen.value.toString(),
      marksmenPercent: marksmenPercent.value.toString(),
      rallies: rallyCount.value.toString(),
    },
  })
})

const rallyLeader = computed<RallyComposition>(() => {
  const total = squadDeploymentCapacity.value

  return {
    infantry: Math.floor(total * INFANTRY_PERCENT.value),
    lancers: Math.floor(total * LANCERS_PERCENT.value),
    marksmen: Math.floor(total * MARKSMEN_PERCENT.value),
    total,
  }
})

const remainingMarksmen = computed(() => totalMarksmen.value - rallyLeader.value.marksmen)
const joiningRallyComposition = computed<RallyComposition>(() => {
  const marksmenPerRally = Math.floor(remainingMarksmen.value / rallyCount.value)
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
  const infantry = rallyLeader.value.infantry + (joiningRallyComposition.value.infantry * rallyCount.value)
  const lancers = rallyLeader.value.lancers + (joiningRallyComposition.value.lancers * rallyCount.value)
  const marksmen = rallyLeader.value.marksmen + (joiningRallyComposition.value.marksmen * rallyCount.value)
  const total = infantry + lancers + marksmen

  return { infantry, lancers, marksmen, total }
})

const formatNumber = (number: number) => new Intl.NumberFormat().format(number)

// Troop type distribution configuration
const troopInputs = [
  [infantryPercent, 'Infantry'],
  [lancersPercent, 'Lancers'],
  [marksmenPercent, 'Marksmen'],
] as const

const totalPercentage = computed(() => infantryPercent.value + lancersPercent.value + marksmenPercent.value)
const isTotalValid = computed(() => totalPercentage.value === 100)
const isMarksmenHighest = computed(() => {
  const currentMarksmenPercent = marksmenPercent.value

  return currentMarksmenPercent > infantryPercent.value && currentMarksmenPercent > lancersPercent.value
})

const rallyLeaderRows = computed(() => [
  { label: `Infantry (${infantryPercent.value}%):`, value: rallyLeader.value.infantry },
  { label: `Lancers (${lancersPercent.value}%):`, value: rallyLeader.value.lancers },
  { label: `Marksmen (${marksmenPercent.value}%):`, value: rallyLeader.value.marksmen },
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
  if (rallyCount.value > 1) {
    sections.push({
      title: `All ${rallyCount.value} joining rallies`,
      values: {
        infantry: joiningRallyComposition.value.infantry * rallyCount.value,
        lancers: joiningRallyComposition.value.lancers * rallyCount.value,
        marksmen: joiningRallyComposition.value.marksmen * rallyCount.value,
        total: joiningRallyComposition.value.total * rallyCount.value,
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
    console.log('🟡 | handleBearClick | randomIndex:', randomIndex)
  } while (randomIndex === lastFactIndex.value)

  lastFactIndex.value = randomIndex
  const randomPolarBearFact = POLAR_BEAR_FACTS[randomIndex]
  toast.add({ detail: randomPolarBearFact, life: 5000, severity: 'info', summary: '🐻‍❄️ Did you know?' })

  setTimeout(() => {
    isShaking.value = false
  }, 820)
}
</script>

<template>
  <Transition
    appear
    enter-active-class="duration-[2s] delay-[3s] ease-out-back"
    enter-from-class="translate-y-full opacity-0"
    leave-to-class="translate-y-[-56%] opacity-100"
  >
    <div class="group absolute left-1/2 -translate-x-1/2 translate-y-[-56%] transition duration-300 ease-out-back leading-0 hover:translate-y-[-79%]">
      <Icon
        name="noto:polar-bear"
        size="60"
        class="origin-bottom cursor-pointer drop-shadow-lg transition-transform duration-300 ease-out-back will-change-transform group-hover:scale-110"
        :class="{ 'animate-shake': isShaking }"
        @click="handleBearClick"
      />
    </div>
  </Transition>
  <div class="animate-fadeinright rounded-3xl bg-surface-950/95 p-8 shadow-2xl shadow-blue-200 backdrop-blur-md animate-once">
    <div class="space-y-12">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="mb-2 text-2xl font-medium">
            Bear Rally Calculator
          </h2>
          <h3 class="text-xl">
            Calculate the max. number of troops for joining bear rallies.
          </h3>
        </div>
        <CopyButton
          v-tooltip.top="'Copy link to current settings'"
          copy-string="currentUrl"
          variant="text"
          rounded
          class="-mr-3.5 -mt-3.5 size-12"
        >
          <Icon
            name="fluent:copy-link-24-regular"
            size="24"
            aria-label="Copy link to current settings"
          />
        </CopyButton>
      </div>

      <div class="space-y-8">
        <div class="flex items-center gap-4">
          <label
            for="totalMarksmen"
            class="w-72 text-lg"
          >Total marksmen (highest tier):</label>
          <InputNumber
            v-model="totalMarksmen"
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
            class="w-72 text-lg"
          >Squad deployment capacity:</label>
          <InputNumber
            v-model="squadDeploymentCapacity"
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
        <div class="flex items-center gap-4">
          <label
            for="rallyCount"
            class="w-72 text-lg"
          >Number of joining rallies:</label>
          <Dropdown
            v-model="rallyCount"
            label-id="rallyCount"
            :options="rallyOptions"
            option-label="value"
            option-value="value"
          />
        </div>
        <div class="items-center gap-4 lg:flex">
          <div class="w-72 text-lg max-lg:mb-4">
            Troop type distribution %:
          </div>
          <div class="flex justify-start gap-4">
            <div
              v-for="[percent, label] in troopInputs"
              :key="label"
              class="flex justify-start gap-4"
            >
              <IftaLabel>
                <InputNumber
                  v-model="percent.value"
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
            <h3 class="text-xl font-bold">
              Rally leader composition
            </h3>
          </template>
          <template #content>
            <div class="inline-block space-y-2">
              <div
                v-for="(row, index) in rallyLeaderRows"
                :key="index"
                class="flex h-10 items-center justify-between gap-4"
              >
                <span>{{ row.label }}</span>
                <span class="font-medium tabular-nums">{{ formatNumber(row.value) }}</span>
              </div>
            </div>
            <Divider type="dotted" />
            Marksmen left for joining rallies: <span class="font-bold tabular-nums">{{ formatNumber(remainingMarksmen) }}</span>
          </template>
        </Card>

        <Card class="flex-1">
          <template #title>
            <h3 class="text-xl font-bold">
              Joining rallies composition
            </h3>
          </template>
          <template #content>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div
                v-for="(section, sIndex) in joiningRallySections"
                :key="sIndex"
                class="space-y-2"
              >
                <h3 class="font-bold">
                  {{ section.title }}
                </h3>
                <div class="inline-block space-y-2">
                  <div
                    v-for="value in ['infantry', 'lancers', 'marksmen'] as const"
                    :key="value"
                    class="flex h-10 items-center justify-between gap-4"
                  >
                    <span>{{ value.charAt(0).toUpperCase() + value.slice(1) }}:</span>
                    <span
                      class="font-medium tabular-nums"
                      :class="{ 'text-green-500': section.title === 'Per rally' }"
                    >{{ formatNumber(section.values[value]) }}<CopyButton
                      v-if="section.title === 'Per rally'"
                      v-tooltip.top="{ value: 'Copy value', showDelay: 700 }"
                      :copy-string="String(section.values[value])"
                      variant="text"
                      rounded
                      size="small"
                      icon="pi pi-copy"
                      class="-ml-1.5 -mr-2.5"
                    /></span>
                  </div>
                  <Divider type="dotted" />
                  <div class="flex justify-between gap-4 pt-2">
                    <span class="font-bold">Total:</span>
                    <span class="font-bold tabular-nums">
                      {{ formatNumber(section.values.total) }}
                    </span>
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
          class="text-sm text-primary hover:underline"
        >Good Bear guide</a>
      </div>
    </div>
  </div>
</template>
