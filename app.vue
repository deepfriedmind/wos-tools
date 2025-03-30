<script setup lang="ts">
// FIXME: workaround to avoid 500 error in prod - https://github.com/fumeapp/dayjs/issues/62
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

dayjs.extend(duration)
dayjs.extend(utc)

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
