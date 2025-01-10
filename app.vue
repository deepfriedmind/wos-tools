<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | WoS Tools❄️` : 'WoS Tools❄️',
})
</script>

<template>
  <Html
    lang="en"
    class="dark"
  >
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NuxtRouteAnnouncer />
      <main class="container mx-auto px-4 py-8">
        <div class="mb-8">
          <RouterLink
            to="/"
            class="inline-block"
          >
            <Logo />
          </RouterLink>
        </div>
        <div class="flex flex-col items-center justify-center">
          <h1 class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
            Time Until reset:
          </h1>
          <ResetCountdown />
        </div>
      </main>
    </div>
  </Html>
</template>
