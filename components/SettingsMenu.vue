<script setup lang="ts">
import type Popover from 'primevue/popover'

const { localSettings } = useLocalSettings()
const popover = ref<InstanceType<typeof Popover>>()

function toggle(event: MouseEvent) {
  popover.value?.toggle(event)
}
</script>

<template>
  <div class="flex justify-end pr-6 pt-2 xl:pr-12 2xl:pr-2">
    <Button
      severity="contrast"
      size="large"
      type="button"
      icon="pi pi-cog"
      aria-haspopup="true"
      aria-controls="settings_menu"
      class="mr-[-3px] p-2 xl:-mr-px"
      rounded
      aria-label="Settings"
      variant="text"
      @click="toggle"
    />
    <Popover
      id="settings_menu"
      ref="popover"
      class="mt-1 p-3"
    >
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
            <ToggleSwitch
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
            <ToggleSwitch
              v-model="localSettings.use24HourFormat"
              aria-label="Toggle 24-hour time format"
            />
            <span>24h</span>
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>
