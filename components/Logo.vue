<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { as = 'h1' } = defineProps<Properties>()

/**
 * Site logo
 */
interface Properties {
  /**
   * Element or component to render the logo as
   * @default 'h1'
   */
  as?: Component | string
}

const attributes = useAttrs()
const baseClasses = tw`
  flex
  select-none
  items-center
  font-logo
  text-6xl
  font-semibold
  tracking-tighter
  drop-shadow
  [text-shadow:0.0333em_0.033em_0_rgb(36_65_102_/_90%)]
`
const classes = computed(() => twMerge(baseClasses, useAttrs().class as string))
</script>

<template>
  <component
    :is="as"
    v-bind="{ ...attributes, class: null }"
    :class="classes"
  >
    <span>WoS </span><Icon
      class="-z-10 translate-x-[-0.1em]"
      size="0.7em"
      name="fluent-emoji:snowflake"
    />
    <span class="translate-x-[-0.3em]">Tools</span>
  </component>
</template>
