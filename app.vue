<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | WoS Tools` : 'WoS Tools',
})
</script>
<template>
  <Html
    lang="en"
    class="dark"
  >
    <div>
      <NuxtRouteAnnouncer />
      <div>
        <RouterLink to="/">
          <h1 class="text-6xl tracking-tighter [text-shadow:0.0333em_0.033em_0_rgb(36_65_102_/_90%)] font-logo font-medium select-none drop-shadow">
            WoS Tools
          </h1>
        </RouterLink>
        <p class="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur.
        </p>
      </div>
    </div>
  </Html>
</template>
