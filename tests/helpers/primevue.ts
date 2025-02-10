import { vi } from 'vitest'
import { h } from 'vue'

type InputNumberInstance = InputNumberMethods & InputNumberProperties

interface InputNumberMethods {
  $emit: (event: string, ...arguments_: any[]) => void
}

interface InputNumberProperties {
  inputClass?: string
  inputMode?: string
  max?: number
  maxFractionDigits?: number
  min?: number
  minFractionDigits?: number
  modelValue?: number
  name?: string
  showButtons?: boolean
  size?: string
  step?: number
  suffix?: string
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
      render(this: InputNumberInstance): ReturnType<typeof h> {
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
            ;(event.target as HTMLInputElement).select?.()
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
