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
    <Toast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
