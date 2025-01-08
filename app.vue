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
          <Logo />
        </RouterLink>
        <p class="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur.
        </p>
      </div>
    </div>
  </Html>
</template>
