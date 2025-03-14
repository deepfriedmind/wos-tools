<script setup lang="ts">
const route = useRoute()

const title = computed(() =>
  typeof route.meta.title === 'string' ?
    route.meta.title
    : '',
)

const description = computed(() =>
  typeof route.meta.description === 'string' ?
    route.meta.description
    : 'A collection of tools for the game Whiteout Survival.',
)

useSeoMeta({
  description,
  title,
  titleTemplate: title => title ? `${title} | WoS Tools❄️` : 'WoS Tools❄️',
})
</script>

<template>
  <Html
    lang="en"
    class="dark"
  >
    <Toast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
