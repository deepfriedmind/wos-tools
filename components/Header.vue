<script setup lang="ts">
const { isScrolled, shouldHideHeader } = useScrollHeader()
</script>

<template>
  <header
    class="sticky top-0 z-10 transition-all will-change-transform"
    :class="{
      'bg-surface-950/95 pb-8 backdrop-blur-md': isScrolled,
      '-translate-y-full': shouldHideHeader,
      'shadow-md': isScrolled && !shouldHideHeader,
    }"
  >
    <nav class="space-y-5 px-8 pt-8 2xl:container xl:px-16">
      <MainMenu />
      <div class="flex items-end justify-between">
        <RouterLink
          to="/"
          class="-mb-1.5 inline-block"
          aria-label="Home"
        >
          <Logo
            as="h1"
            class="text-6xl/none transition-transform hover:scale-105"
          />
        </RouterLink>
        <ResetCountdown />
      </div>
    </nav>
  </header>
</template>
