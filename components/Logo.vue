<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { as = 'span' } = defineProps<{
  as?: Component | string
}>()

const attributes: Record<string, unknown> = useAttrs()
const baseClasses = tw`
  inline-flex
  select-none
  items-center
  font-logo
  font-semibold
  tracking-tighter
  drop-shadow
  text-shadow
`
const classes = computed(() => twMerge(baseClasses, attributes.class as string))
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
