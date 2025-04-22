<script setup lang="ts">
import type { SelectProps } from 'primevue/select'

interface LevelGroupOption {
  levels: { id: string, label: string }[]
  tier: string
}

type SelectOption = LevelGroupOption | { id: string, label: string }

defineProps<Pick<SelectProps, 'disabled' | 'modelValue'> & {
  groupedOptions: boolean
  label: string
  options: SelectOption[] | { id: string, label: string }[]
}>()

const emit = defineEmits<{
  (event: 'change', value: string | undefined): void
}>()

function onChange(event: { value: string | undefined }) {
  emit('change', event.value)
}
</script>

<template>
  <FloatLabel variant="on">
    <Select
      :disabled="disabled"
      :model-value="modelValue"
      :options="options"
      :pt="{ optionLabel: { class: 'tabular-nums' } }"
      :scroll-height="rem(636)"
      fluid
      :option-group-children="groupedOptions ? 'levels' : undefined"
      :option-group-label="groupedOptions ? 'tier' : undefined"
      option-label="label"
      option-value="id"
      show-clear
      size="small"
      @change="onChange"
    >
      <template
        v-if="groupedOptions"
        #optiongroup="slotProps"
      >
        <div
          class="py-2 text-lg font-bold uppercase tracking-widest"
          :class="[TIER_COLOR_CLASSES[slotProps.option.tier] || '']"
        >
          {{ slotProps.option.tier }}
        </div>
      </template>
    </Select>
    <label>{{ label }}</label>
  </FloatLabel>
</template>
