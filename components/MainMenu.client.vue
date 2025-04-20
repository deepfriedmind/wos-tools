<script setup lang="ts">
const { localSettings } = useLocalSettings()
const drawerVisible = shallowRef(false)

const route = useRoute()
const { pages } = usePageRoutes()

watch(() => route.fullPath, () => {
  drawerVisible.value = false
})
</script>

<template>
  <div class="order-last flex justify-end">
    <Button
      severity="contrast"
      size="large"
      icon="pi pi-bars"
      aria-controls="mainMenu"
      class="-mr-3 -mt-3"
      rounded
      aria-label="Menu"
      variant="text"
      @click="drawerVisible = true"
    />
    <Drawer
      id="mainMenu"
      v-model:visible="drawerVisible"
      position="right"
      class="w-full sm:w-[rem(414)]"
    >
      <template #header>
        <Logo
          :as="resolveComponent('RouterLink')"
          to="/"
          class="text-3xl/none"
        />
      </template>
      <Accordion
        :value="['0', '1']"
        multiple
      >
        <AccordionPanel value="0">
          <AccordionHeader><span class="inline-flex items-center gap-2 text-xl"><i class="pi pi-cog" />Settings</span></AccordionHeader>
          <AccordionContent>
            <div
              v-auto-animate
              class="space-y-4 py-4"
            >
              <div class="space-y-2">
                <div>Show times in:</div>
                <TimezoneToggle />
              </div>
              <Divider
                v-if="!localSettings.useUtcTime"
                type="dotted"
              />
              <div
                v-if="!localSettings.useUtcTime"
                class="space-y-2"
              >
                <div>Time format:</div>
                <div
                  data-test="time-format-toggle"
                  class="flex gap-2"
                >
                  <span
                    class="transition-opacity"
                    :class="{
                      'opacity-75': localSettings.use24HourFormat,
                    }"
                  >12h</span>
                  <ToggleSwitchArrow
                    v-model="localSettings.use24HourFormat"
                    aria-label="Toggle 24-hour time format"
                  />
                  <span
                    class="transition-opacity"
                    :class="{
                      'opacity-75': !localSettings.use24HourFormat,
                    }"
                  >24h</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader><span class="inline-flex items-center gap-2 text-xl"><i class="pi pi-wrench" />Tools</span></AccordionHeader>
          <AccordionContent>
            <ul class="space-y-4 py-4">
              <li
                v-for="page in pages"
                :key="page.path"
              >
                <RouterLink
                  :to="page.path"
                  class="text-lg text-primary-emphasis underline-offset-4 transition-colors hover:text-primary-emphasis-alt link-active:pointer-events-none link-active:font-medium link-active:text-primary-emphasis/70 link-active:underline link-active:decoration-wavy"
                >
                  <Icon
                    v-if="page.icon"
                    class="mt-[0.125em] align-text-top drop-shadow-md"
                    :class="page.iconColorClass ? String(page.iconColorClass) : 'text-surface-500'"
                    :name="String(page.icon)"
                  />
                  {{ page.title }}
                </RouterLink>
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </Drawer>
  </div>
</template>
