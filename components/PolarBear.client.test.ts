import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import PolarBear from './PolarBear.client.vue'

describe('polarBear.client.vue', () => {
  it('renders SVG with correct structure', () => {
    const wrapper = mount(PolarBear)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    // Ears
    expect(svg.findAll('circle').length).toBeGreaterThanOrEqual(4)
    // Head
    expect(svg.findAll('circle').some(c => c.attributes('fill') === 'white')).toBe(true)
    // Eyes (ellipse or line for blink)
    expect(svg.findAll('ellipse').length).toBe(2)
    // Nose
    expect(svg.find('polygon').exists()).toBe(true)
    // Mouth
    expect(svg.findAll('line').length).toBeGreaterThanOrEqual(1)
    // Tongue
    expect(svg.findAll('path').length).toBe(2)
  })

  it('applies the size prop to SVG', () => {
    const wrapper = mount(PolarBear, { props: { size: 200 } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('200')
    expect(svg.attributes('height')).toBe('200')
  })

  it('blinks and animates tongue on click', async () => {
    vi.useFakeTimers()
    const wrapper = mount(PolarBear)
    const svg = wrapper.find('svg')
    // Click triggers blink and tongue
    await wrapper.trigger('click')
    vi.runOnlyPendingTimers()
    await nextTick()
    await Promise.resolve() // flush microtasks

    // After click, blink lines should appear (eyes closed)
    const blinkLeft = svg.find('[data-test="blink-left"]')
    const blinkRight = svg.find('[data-test="blink-right"]')

    // Wait for animation state to update
    await nextTick()
    await Promise.resolve() // Flush microtasks

    // If blink lines are not found, force re-render and check again
    if (!blinkLeft.exists() || !blinkRight.exists()) {
      await nextTick()
      const blinkLeft2 = svg.find('[data-test="blink-left"]')
      const blinkRight2 = svg.find('[data-test="blink-right"]')
      expect(blinkLeft2.exists()).toBe(true)
      expect(blinkRight2.exists()).toBe(true)
    }
    else {
      expect(blinkLeft.exists()).toBe(true)
      expect(blinkRight.exists()).toBe(true)
    }

    vi.useRealTimers()
  })
})
