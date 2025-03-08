<script lang="ts" setup>
const { type = 'info' } = defineProps<{
  type?: 'info' | 'question'
}>()

const ariaId = useId()
</script>

<template>
  <VTooltip
    class="inline"
    :aria-id="ariaId"
  >
    <i
      class="pi cursor-help align-text-top text-primary transition-colors hover:text-primary-300"
      :class="{
        'pi-info-circle': type === 'info',
        'pi-question-circle': type === 'question',
      }"
    />
    <template #popper>
      <slot />
    </template>
  </VTooltip>
</template>
