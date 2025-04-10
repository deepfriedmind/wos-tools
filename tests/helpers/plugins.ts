import { vAutoAnimate } from '@formkit/auto-animate'
import type { MountingOptions } from '@vue/test-utils'
import { vTooltip } from 'floating-vue'

export function setupGlobalPlugins(config: Partial<MountingOptions<unknown>> = {}): Partial<MountingOptions<unknown>> {
  return {
    global: {
      directives: {
        'auto-animate': vAutoAnimate,
        tooltip: vTooltip,
      },
      ...config.global,
    },
  }
}
