<script setup lang="ts">
const { public: { buildTime } } = useRuntimeConfig()
const dayjs = useDayjs()
</script>

<template>
  <footer
    v-if="typeof buildTime === 'string'"
    class="bg-[linear-gradient(0,_rgb(23_41_64_/_33%),_transparent)] pb-8 pt-2.5 text-center"
  >
    <div class="container [text-shadow:1px_1px_0px_rgb(36_65_102_/_50%)]">
      <p class="font-medium">
        &copy;{{ dayjs(buildTime).year() }}
        <Logo class="text-lg" />– Made with <img
          src="/img/fc.webp"
          width="24"
          height="24"
          alt="Fire Crystal"
          class="inline align-top"
        > by [BAM]WhaleQuest from #1459 – Last updated: {{ dayjs(buildTime).format('YYYY-MM-DD') }}
      </p>
      <p class="text-xs">
        This website has no affiliation with Century Games Pte. Ltd.
      </p>
    </div>
  </footer>
</template>
