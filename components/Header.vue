<script setup lang="ts">
const { isStickyHeaderEnabled } = useStickyHeader()
const { isScrolled, shouldHideHeader } = useScrollHeader()
</script>

<template>
  <header
    class="top-0 z-10 transition-all will-change-transform"
    :class="{
      'sticky': isStickyHeaderEnabled,
      'bg-surface-950/95 pb-2 backdrop-blur-md sm:pb-4 md:pb-8': isStickyHeaderEnabled && isScrolled,
      '-translate-y-full': isStickyHeaderEnabled && shouldHideHeader,
      'shadow-md': isStickyHeaderEnabled && isScrolled && !shouldHideHeader,
    }"
  >
    <nav class="justify-between gap-2 px-4 pt-4 2xl:container max-md:flex sm:px-8 sm:pt-8 md:space-y-5 xl:px-16">
      <ClientOnly>
        <LazyMainMenu hydrate-on-idle />
      </ClientOnly>
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
        <ClientOnly>
          <LazyResetCountdown hydrate-on-idle />
        </ClientOnly>
      </div>
    </nav>
  </header>
</template>
