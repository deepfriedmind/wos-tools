<script lang="ts" setup>
defineProps<{
  heading?: string
  subHeading?: string
}>()
</script>

<template>
  <div class="animate-fadeinright rounded-3xl bg-surface-950/95 p-4 shadow-2xl shadow-blue-950 backdrop-blur-md animate-once sm:p-8">
    <div
      v-if="heading || subHeading"
      class="mb-12 w-11/12 space-y-4"
    >
      <slot name="heading">
        <h2
          v-if="heading"
          class="text-xl font-semibold text-shadow md:text-2xl"
        >
          {{ heading }}
        </h2>
      </slot>
      <slot name="subHeading">
        <h3
          v-if="subHeading"
          class="text-lg md:text-xl"
        >
          {{ subHeading }}
        </h3>
      </slot>
    </div>
    <slot />
  </div>
</template>
