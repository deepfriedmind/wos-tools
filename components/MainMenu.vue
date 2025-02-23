<script setup lang="ts">
const { localSettings } = useLocalSettings()
const visible = ref(false)
</script>

<template>
  <div class="flex justify-end">
    <Button
      severity="contrast"
      size="large"
      icon="pi pi-bars"
      aria-controls="mainMenu"
      class="-mr-3 -mt-3"
      rounded
      aria-label="Menu"
      variant="text"
      @click="visible = true"
    />
    <Drawer
      id="mainMenu"
      v-model:visible="visible"
      position="right"
    >
      <template #header>
        <Logo
          :as="resolveComponent('RouterLink')"
          to="/"
          class="text-3xl/none"
        />
      </template>
      <div class="space-y-4">
        <div class="space-y-2">
          <div>
            Show times in:
          </div>
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
        </div>

        <Divider
          v-if="!localSettings.useUtcTime"
          type="dotted"
        />

        <div
          v-if="!localSettings.useUtcTime"
          class="space-y-2"
        >
          <div>
            Time format:
          </div>
          <div
            data-test="time-format-toggle"
            class="flex gap-2"
          >
            <span>12h</span>
            <ToggleSwitchArrow
              v-model="localSettings.use24HourFormat"
              aria-label="Toggle 24-hour time format"
            />
            <span>24h</span>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>
