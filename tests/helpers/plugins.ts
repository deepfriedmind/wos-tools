import type { MountingOptions } from '@vue/test-utils'
import { vAutoAnimate } from '@formkit/auto-animate'

export function setupGlobalPlugins(config: Partial<MountingOptions<any>> = {}): Partial<MountingOptions<any>> {
  return {
    global: {
      directives: {
        'auto-animate': vAutoAnimate,
      },
      ...config.global,
    },
  }
}