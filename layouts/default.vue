<template>
  <div class="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8">
    <Header />
    <main class="p-4 py-container 2xl:container sm:p-8 xl:p-16">
      <NuxtRouteAnnouncer />
      <slot />
    </main>
    <Footer />
  </div>
</template>
