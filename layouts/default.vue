<template>
  <div class="relative grid min-h-screen grid-rows-[auto_1fr_auto] gap-8">
    <div class="absolute inset-0 -z-50">
      <picture>
        <source
          type="image/avif"
          media="(min-width: 3072px)"
          srcset="/img/bg-h-3072.avif"
        >
        <source
          type="image/avif"
          media="(min-width: 2560px)"
          srcset="/img/bg-h-2560.avif, /img/bg-h-3072.avif 2x"
        >
        <source
          type="image/avif"
          media="(min-width: 1536px"
          srcset="/img/bg-h-1536.avif, /img/bg-h-3072.avif 2x"
        >
        <source
          type="image/avif"
          media="(min-width: 1024px)"
          srcset="/img/bg-h-1280.avif, /img/bg-h-2560.avif 2x"
        >
        <source
          type="image/avif"
          media="(min-width: 640px)"
          srcset="/img/bg-v-768.avif, /img/bg-v-1280.avif 2x"
        >
        <img
          fetchpriority="high"
          src="/img/bg-v-384.avif"
          srcset="/img/bg-v-768.avif 2x"
          alt="A background image of a snowy mountain landscape"
          class="size-full object-contain object-bottom"
        >
      </picture>
    </div>
    <Header />
    <main class="p-4 py-container 2xl:container sm:p-8 xl:p-16">
      <NuxtRouteAnnouncer />
      <slot />
    </main>
    <Footer />
  </div>
</template>
