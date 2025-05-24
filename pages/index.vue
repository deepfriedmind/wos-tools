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
    <MainContentCard class="flex">
      <ul class="mx-auto space-y-8 py-16">
        <li
          v-for="page in pages"
          :key="page.path"
        >
          <RouterLink
            :to="page.path"
            class="inline-block text-lg font-bold text-primary-emphasis transition text-shadow hover:scale-105 hover:text-primary-emphasis-alt max-sm:origin-left sm:text-2xl md:text-4xl"
          >
            <img
              v-if="page.imagePath"
              :alt="page.title"
              :src="page.imagePath"
              class="inline-block size-[1em] object-contain align-top drop-shadow-md"
            >
            <Icon
              v-else-if="page.icon"
              :class="page.iconColorClass ? page.iconColorClass : 'text-surface-500'"
              :name="page.icon"
              class="mt-[0.125em] align-text-top drop-shadow-md"
            />
            {{ page.title }}
          </RouterLink>
        </li>
      </ul>
    </MainContentCard>
  </div>
</template>
