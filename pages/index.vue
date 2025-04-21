<script lang="ts" setup>
const { name } = useSiteConfig()
defineOgImage(false)
defineOgImage({
  alt: `${name} logo`,
  height: 600,
  url: '/og-image.jpg',
  width: 1200,
})

const { pages } = usePageRoutes()
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-4">
    <h2 class="mb-2 text-3xl font-bold text-shadow">
      Available tools:
    </h2>
    <MainContentCard class="flex">
      <ul class="mx-auto space-y-8 py-16">
        <li
          v-for="page in pages"
          :key="page.path"
        >
          <RouterLink
            :to="page.path"
            class="inline-block text-xl font-bold text-primary-emphasis transition text-shadow hover:scale-105 hover:text-primary-emphasis-alt max-sm:origin-left sm:text-2xl md:text-4xl"
          >
            <Icon
              v-if="page.icon"
              class="mt-[0.125em] align-text-top drop-shadow-md"
              :class="page.iconColorClass ? String(page.iconColorClass) : 'text-surface-500'"
              :name="String(page.icon)"
            />
            {{ page.title }}
          </RouterLink>
        </li>
        <li class="translate-y-full text-center text-lg">
          More Coming Soon™
        </li>
      </ul>
    </MainContentCard>
  </div>
</template>
