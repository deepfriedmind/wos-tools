import { createTestingPinia } from '@pinia/testing'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import MainMenu from '~/components/MainMenu.client.vue'
import { useLocalSettings } from '~/stores/local-settings'
import { DrawerStub, RouterLinkStub, ToggleSwitchStub } from '~/tests/helpers/mocks'
import { setupGlobalPlugins } from '~/tests/helpers/plugins'
import { setupPrimeVue } from '~/tests/helpers/primevue'

function mountComponent(): VueWrapper<InstanceType<typeof MainMenu>> {
  return mount<typeof MainMenu>(MainMenu, {
    global: {
      ...setupPrimeVue().global,
      ...setupGlobalPlugins().global,
      plugins: [createTestingPinia({
        createSpy: vi.fn,
      })],
      stubs: {
        Drawer: DrawerStub,
        RouterLink: RouterLinkStub,
        ToggleSwitch: ToggleSwitchStub,
      },
    },
  })
}

describe('mainMenu', () => {
  describe('rendering', () => {
    it('renders menu button', () => {
      const wrapper = mountComponent()
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('.pi-bars').exists()).toBe(true)
    })

    it('toggles drawer visibility on button click', async () => {
      const wrapper = mountComponent()

      // Initial state - drawer should be hidden
      const drawer = wrapper.find('.p-drawer')
      expect(drawer.classes()).not.toContain('p-drawer-visible')

      // Click menu button to show drawer
      await wrapper.find('button').trigger('click')
      expect(drawer.classes()).toContain('p-drawer-visible')
    })
  })

  describe('settings', () => {
    it('shows timezone toggle options', () => {
      const wrapper = mountComponent()

      const timezoneToggle = wrapper.find('[data-test="timezone-toggle"]')
      expect(timezoneToggle.exists()).toBe(true)

      const labels = timezoneToggle.findAll('span')
      expect(labels).toHaveLength(2)
      // Check that we have some timezone string
      expect(labels[0].text()).toBeTruthy()
      expect(labels[1].text()).toBe('UTC')
      expect(timezoneToggle.find('.p-toggleswitch').exists()).toBe(true)
    })

    it('shows time format toggle options', () => {
      const wrapper = mountComponent()

      const formatToggle = wrapper.find('[data-test="time-format-toggle"]')
      expect(formatToggle.exists()).toBe(true)

      const labels = formatToggle.findAll('span')
      expect(labels).toHaveLength(2)
      expect(labels[0].text()).toBe('12h')
      expect(labels[1].text()).toBe('24h')
      expect(formatToggle.find('.p-toggleswitch').exists()).toBe(true)
    })

    it('updates UTC time setting when toggled', async () => {
      const wrapper = mountComponent()
      const { localSettings } = useLocalSettings()
      expect(localSettings.useUtcTime).toBe(false)
      const toggleSwitch = wrapper.find('[data-test="timezone-toggle"] .p-toggleswitch')
      await toggleSwitch.trigger('click')
      expect(localSettings.useUtcTime).toBe(true)
      await toggleSwitch.trigger('click')
      expect(localSettings.useUtcTime).toBe(false)
    })

    it('updates time format setting when toggled', async () => {
      const wrapper = mountComponent()
      const { localSettings } = useLocalSettings()
      expect(localSettings.use24HourFormat).toBe(true)
      const toggleSwitch = wrapper.find('[data-test="time-format-toggle"] .p-toggleswitch')
      await toggleSwitch.trigger('click')
      expect(localSettings.use24HourFormat).toBe(false)
      await toggleSwitch.trigger('click')
      expect(localSettings.use24HourFormat).toBe(true)
    })

    it('shows time format toggle options only when not using UTC', async () => {
      const wrapper = mountComponent()
      const { localSettings } = useLocalSettings()

      // Initially visible since UTC is off by default
      const formatToggle = wrapper.find('[data-test="time-format-toggle"]')
      expect(formatToggle.exists()).toBe(true)

      // Enable UTC time
      const timezoneToggle = wrapper.find('[data-test="timezone-toggle"] .p-toggleswitch')
      await timezoneToggle.trigger('click')

      // Format toggle should be hidden
      expect(wrapper.find('[data-test="time-format-toggle"]').exists()).toBe(false)
      // Should force 24h format
      expect(localSettings.use24HourFormat).toBe(true)

      // Disable UTC time
      await timezoneToggle.trigger('click')
      expect(wrapper.find('[data-test="time-format-toggle"]').exists()).toBe(true)
    })
  })
})
