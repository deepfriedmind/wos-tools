<template>
  <div class="grid min-h-screen grid-rows-[1fr_auto] gap-8">
    <div>
      <SettingsMenu />
      <main class="p-8 py-container 2xl:container xl:p-16">
        <NuxtRouteAnnouncer />
        <Header />
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
