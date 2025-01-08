<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { as = 'h1' } = defineProps<Properties>()

/**
 * Main site logo
 */
interface Properties {
  /**
   * Element or component to render the logo as
   * @default 'h1'
   */
  as?: Component | string
}

const attributes = useAttrs()
const baseClasses = 'text-6xl tracking-tighter [text-shadow:0.0333em_0.033em_0_rgb(36_65_102_/_90%)] font-logo font-semibold select-none drop-shadow flex items-center'
const classes = computed(() => twMerge(baseClasses, attributes.class as string))
</script>

<template>
  <component
    :is="as"
    v-bind="{ ...attributes, class: null }"
    :class="classes"
  >
    <span>WoS </span><Icon
      size="0.7em"
      name="fluent-emoji:snowflake"
    />
    <span class="[transform:translateX(-10%)]">Tools</span>
  </component>
</template>
