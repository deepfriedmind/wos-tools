<template>
  <div class="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8">
    <Header />
    <main class="p-8 py-container 2xl:container xl:p-16">
      <NuxtRouteAnnouncer />
      <slot />
    </main>
    <Footer />
  </div>
</template>
