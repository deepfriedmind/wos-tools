import { createTestingPinia } from '@pinia/testing'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import SettingsMenu from '~/components/SettingsMenu.vue'
import { useLocalSettings } from '~/stores/local-settings'
import { setupPrimeVue } from '~/tests/helpers/primevue'

const PopoverStub = defineComponent({
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible
    },
  },
  props: {
    showOnFocus: { default: false, type: Boolean },
  },
  template: '<div class="p-popover-mock" :class="{ \'p-popover-hidden\': !isVisible }"><slot /></div>',
})

const ToggleSwitchStub = defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: { required: true, type: Boolean },
  },
  template: '<div class="p-toggleswitch" role="switch" @click="$emit(\'update:modelValue\', !modelValue)"></div>',
})

function mountComponent(): VueWrapper<InstanceType<typeof SettingsMenu>> {
  return mount<typeof SettingsMenu>(SettingsMenu, {
    global: {
      ...setupPrimeVue().global,
      plugins: [createTestingPinia({
        createSpy: vi.fn,
      })],
      stubs: {
        Popover: PopoverStub,
        ToggleSwitch: ToggleSwitchStub,
      },
    },
  })
}

describe('settingsMenu', () => {
  describe('rendering', () => {
    it('renders settings button', () => {
      const wrapper = mountComponent()
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('.pi-cog').exists()).toBe(true)
    })

    it('toggles popover visibility on button click', async () => {
      const wrapper = mountComponent()

      // Initial state - popover should be hidden
      const popover = wrapper.find('.p-popover-mock')
      expect(popover.classes()).toContain('p-popover-hidden')

      // Click settings button to show popover
      await wrapper.find('button').trigger('click')
      expect(popover.classes()).not.toContain('p-popover-hidden')

      // Click again to hide
      await wrapper.find('button').trigger('click')
      expect(popover.classes()).toContain('p-popover-hidden')
    })
  })

  describe('settings', () => {
    it('shows timezone toggle options', () => {
      const wrapper = mountComponent()

      const settingsItem = wrapper.find('[data-test="settings-item"]')
      expect(settingsItem.exists()).toBe(true)

      const labels = settingsItem.findAll('span')
      expect(labels).toHaveLength(2)
      // Check that we have some timezone string
      expect(labels[0].text()).toBeTruthy()
      expect(labels[1].text()).toBe('UTC')
      expect(settingsItem.find('.p-toggleswitch').exists()).toBe(true)
    })

    it('updates UTC time setting when toggled', async () => {
      const wrapper = mountComponent()
      const { localSettings } = useLocalSettings()
      expect(localSettings.useUtcTime).toBe(false)
      const toggleSwitch = wrapper.find('.p-toggleswitch')
      await toggleSwitch.trigger('click')
      expect(localSettings.useUtcTime).toBe(true)
      await toggleSwitch.trigger('click')
      expect(localSettings.useUtcTime).toBe(false)
    })
  })
})
