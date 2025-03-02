<script setup lang="ts">
const { isScrolled, shouldHideHeader } = useScrollHeader()
</script>

<template>
  <header
    class="sticky top-0 z-10 transition-all will-change-transform"
    :class="{
      'bg-surface-950/95 pb-2 backdrop-blur-md sm:pb-4 md:pb-8': isScrolled,
      '-translate-y-full': shouldHideHeader,
      'shadow-md': isScrolled && !shouldHideHeader,
    }"
  >
    <nav class="justify-between gap-2 px-4 pt-4 2xl:container max-md:flex sm:px-8 sm:pt-8 md:space-y-5 xl:px-16">
      <MainMenu />
      <div class="flex flex-1 items-start justify-between max-md:mt-1 md:items-end">
        <RouterLink
          to="/"
          class="-mb-1.5 inline-block"
          aria-label="Home"
        >
          <Logo
            as="h1"
            class="text-3xl/none transition-transform hover:scale-105 sm:text-4xl/none md:text-6xl/none"
          />
        </RouterLink>
        <ResetCountdown />
      </div>
    </nav>
  </header>
</template>
