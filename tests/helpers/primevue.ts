import type { MountingOptions } from '@vue/test-utils'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import Popover from 'primevue/popover'
import ToastService from 'primevue/toastservice'
import ToggleSwitch from 'primevue/toggleswitch'
import { vi } from 'vitest'
import type { VNode } from 'vue'

interface InputNumberInstance {
  $emit: (event: string, ...arguments_: unknown[]) => void
  inputClass?: string
  max?: number
  maxFractionDigits?: number
  min?: number
  modelValue?: number
  name?: string
  step?: number
}

export const mockToast = {
  add: vi.fn(),
}

export function mockPrimeVueComponents() {
  vi.mock('primevue/inputnumber', () => ({
    default: {
      name: 'InputNumber',
      props: {
        inputClass: String,
        inputMode: String,
        max: Number,
        maxFractionDigits: Number,
        min: Number,
        minFractionDigits: Number,
        modelValue: Number,
        name: String,
        showButtons: Boolean,
        size: String,
        step: Number,
        suffix: String,
      },
      render(this: InputNumberInstance): VNode {
        const displayValue = typeof this.modelValue === 'number' ?
            this.modelValue.toFixed(
              this.maxFractionDigits ?? (Number.isInteger(this.modelValue) ? 0 : 1),
            )
          : ''

        return h('input', {
          class: this.inputClass,
          max: this.max,
          min: this.min,
          name: this.name,
          onFocus: (event: FocusEvent) => {
            const input = event.target as HTMLInputElement

            if (typeof input.select === 'function') {
              input.select()
            }
          },
          onInput: (event: Event) => {
            this.$emit('update:modelValue', Number((event.target as HTMLInputElement).value))
          },
          step: this.step,
          type: 'number',
          value: displayValue,
        })
      },
    },
  }))

  vi.mock('primevue/select', () => ({
    default: {
      name: 'Select',
      props: ['modelValue', 'options'],
      template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', Number($event.target.value))"></select>',
    },
  }))

  vi.mock('primevue/card', () => ({
    default: {
      name: 'Card',
      template: '<div><slot name="header"></slot><slot name="title"></slot><slot name="content"></slot></div>',
    },
  }))
}

export function mockPrimeVueToast(): void {
  vi.mock('primevue/usetoast', () => ({
    default: () => mockToast,
  }))
}

export function setupPrimeVue(config: Partial<MountingOptions<unknown>> = {}): Partial<MountingOptions<unknown>> {
  return {
    global: {
      components: {
        Button,
        Popover,
        ToggleSwitch,
      },
      plugins: [PrimeVue, ToastService],
      ...config.global,
    },
  }
}
