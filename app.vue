<script setup lang="ts">
/* eslint-disable ts/no-restricted-imports */
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

const { name } = useSiteConfig()

useSeoMeta({
  description,
  title,
  titleTemplate: title => title ? `${title} | ${name}` : `${name} for Whiteout Survival`,
  twitterCard: 'summary_large_image',
  twitterDescription: description,
  twitterTitle: title,
})
defineOgImageComponent('NuxtSeo', { colorMode: 'dark', theme: '#4072b3' })
</script>

<template>
  <Html class="dark">
    <Toast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
