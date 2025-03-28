<script lang="ts" setup>
import type { ButtonProps } from 'primevue/button'

interface Props extends /* @vue-ignore */ ButtonProps {
  /** String to copy - either 'currentUrl' or any string */
  copyString: string
  /** CSS class to apply when copy is successful */
  successClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  successClass: 'text-green-500',
})

const toast = useToast()
const { copied, copy } = useClipboard({ legacy: true })

async function clipboardWrite() {
  try {
    if (props.copyString === '') {
      return
    }

    let textToCopy = props.copyString
    if (props.copyString === 'currentUrl') {
      const { href } = useRequestURL()
      textToCopy = href
    }

    await copy(textToCopy)
  }
  catch (error) {
    toast.add({ detail: 'Could not copy to clipboard.', life: 3000, severity: 'error', summary: 'Error' })
    console.error(error)
  }
}
</script>

<template>
  <Button
    :class="{ [props.successClass]: copied }"
    :data-copy-success="copied"
    @click="clipboardWrite"
  >
    <slot />
  </Button>
</template>

<style lang="postcss">
/* If there's an icon in the slot, apply the same success color.
Needs to be global to affect Button internals */
[data-copy-success='true'] .p-button-icon {
  @apply text-inherit transition-colors;
}
</style>
