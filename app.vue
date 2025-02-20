<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | WoS Tools❄️` : 'WoS Tools❄️',
})
</script>

<template>
  <Html
    lang="en"
    class="dark"
  >
    <Toast position="top-center" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
