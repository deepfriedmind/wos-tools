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

const clipboardSuccess = computed(() => copied.value)

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
    :class="{ [props.successClass]: clipboardSuccess }"
    @click="clipboardWrite"
  >
    <slot />
  </Button>
</template>
