<script lang="ts" setup>
import type { TooltipOptions } from 'primevue/tooltip'

// eslint-disable-next-line unused-imports/no-unused-vars
const { autoHide = true, escape = true, fitContent = true, position = 'top', type = 'info' } = defineProps<TooltipOptions & {
  position?: 'bottom' | 'left' | 'right' | 'top'
  type?: 'info' | 'question'
}>()

const positionRef = ref({ position })
</script>

<template>
  <i
    v-tooltip:[positionRef]="$props"
    class="pi cursor-help align-text-top text-primary transition-colors hover:text-primary-300"
    :class="{
      'pi-info-circle': type === 'info',
      'pi-question-circle': type === 'question',
    }"
  />
</template>
