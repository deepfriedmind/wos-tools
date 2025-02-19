<script setup lang="ts">
const { public: { buildTime } } = useRuntimeConfig()
const dayjs = useDayjs()
</script>

<template>
  <footer
    v-if="typeof buildTime === 'string'"
    class="bg-[linear-gradient(0,_rgb(23_41_64_/_33%),_transparent)] pb-8 pt-2.5 text-center"
  >
    <div class="container">
      <p class="font-medium [text-shadow:1px_1px_0px_rgb(36_65_102_/_50%)]">
        &copy;{{ dayjs(buildTime).year() }}
        <Logo
          class="text-lg"
          as="span"
        />– Last updated: {{ dayjs(buildTime).format('YYYY-MM-DD') }}
      </p>
    </div>
  </footer>
</template>
