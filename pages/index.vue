<script lang="ts" setup>
const router = useRouter()

const pages = computed(() => router.getRoutes()
  .filter(route => route.path !== '/' && !route.path.includes(':'))
  .map(route => ({
    name: route.meta?.title ?? useStartCase(route.path),
    path: route.path,
  })),
)
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
            class="inline-block text-3xl font-bold text-primary-emphasis transition text-shadow hover:scale-105 hover:text-primary-emphasis-alt max-sm:origin-left md:text-4xl"
          >
            {{ page.name }}
          </RouterLink>
        </li>
        <li class="translate-y-full text-center text-lg">
          More Coming Soon™
        </li>
      </ul>
    </MainContentCard>
  </div>
</template>
