<script lang="ts" setup>
const { localSettings } = useLocalSettings()
</script>

<template>
  <div
    data-test="timezone-toggle"
    class="flex gap-2"
  >
    <span>{{ localSettings.timezoneShort }}</span>
    <ToggleSwitchArrow
      v-model="localSettings.useUtcTime"
      aria-label="Toggle UTC time display"
    />
    <span>UTC</span>
  </div>
</template>
