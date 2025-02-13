<template>
  <div>
    <SettingsMenu />
    <main class="p-8 py-container 2xl:container xl:p-16">
      <NuxtRouteAnnouncer />
      <Header />
      <slot />
    </main>
  </div>
</template>
