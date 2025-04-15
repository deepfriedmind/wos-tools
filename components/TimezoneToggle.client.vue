<script lang="ts" setup>
const { localSettings } = useLocalSettings()
</script>

<template>
  <div
    data-test="timezone-toggle"
    class="flex gap-2"
  >
    <span
      class="transition-opacity"
      :class="{
        'opacity-75': localSettings.useUtcTime,
      }"
    >{{ localSettings.timezoneShort }}</span>
    <ToggleSwitchArrow
      v-model="localSettings.useUtcTime"
      aria-label="Toggle UTC time display"
    />
    <span
      class="transition-opacity"
      :class="{
        'opacity-75': !localSettings.useUtcTime,
      }"
    >UTC</span>
  </div>
</template>
