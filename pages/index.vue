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
  <div class="flex h-full items-center">
    <MainContentCard class="flex flex-1">
      <ul class="mx-auto space-y-8 py-16">
        <li
          v-for="page in pages"
          :key="page.path"
        >
          <RouterLink
            :to="page.path"
            class="inline-block text-4xl font-bold text-primary-emphasis transition [text-shadow:0.0333em_0.033em_0_rgb(36_65_102_/_90%)] hover:scale-105 hover:text-primary-emphasis-alt"
          >
            {{ page.name }}
          </RouterLink>
        </li>
      </ul>
    </MainContentCard>
  </div>
</template>
