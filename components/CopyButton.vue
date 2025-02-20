<script lang="ts" setup>
import type { ButtonProps } from 'primevue/button'

interface Properties extends /* @vue-ignore */ ButtonProps {
  /** String to copy - either 'currentUrl' or any string */
  copyString: string
  /** CSS class to apply when copy is successful */
  successClass?: string
}

const props = withDefaults(defineProps<Properties>(), {
  successClass: 'text-green-500',
})

const clipboardSuccess = ref(false)

const toast = useToast()

async function clipboardWrite() {
  try {
    if (props.copyString === '') {
      return
    }

    if (props.copyString === 'currentUrl') {
      const { href } = useRequestURL()
      await navigator.clipboard.writeText(href)
    }
    else {
      await navigator.clipboard.writeText(props.copyString)
    }

    clipboardSuccess.value = true
    setTimeout(() => {
      clipboardSuccess.value = false
    }, 2000)
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
