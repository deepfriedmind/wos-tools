<script lang="ts" setup>
import type { TooltipOptions } from 'primevue/tooltip'

// eslint-disable-next-line unused-imports/no-unused-vars
const { autoHide = true, escape = true, fitContent = true, type = 'info' } = defineProps<TooltipOptions & {
  type?: 'info' | 'question'
}>()
</script>

<template>
  <i
    v-tooltip.top="$props"
    class="pi cursor-help align-text-top text-primary transition-colors hover:text-primary-300"
    :class="{
      'pi-info-circle': type === 'info',
      'pi-question-circle': type === 'question',
    }"
  />
</template>
