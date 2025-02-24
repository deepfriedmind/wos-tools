import { vAutoAnimate } from '@formkit/auto-animate'
import type { MountingOptions } from '@vue/test-utils'

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
