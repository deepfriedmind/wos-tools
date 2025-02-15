<script lang="ts" setup>
const { copyString, successClass } = defineProps<{
  copyString: string // 'currentUrl' or any string
  successClass: string
}>()

const clipboardSuccess = ref(false)

const toast = useToast()

async function clipboardWrite() {
  try {
    if (copyString === '') {
      return
    }

    if (copyString === 'currentUrl') {
      const { href } = useRequestURL()
      await navigator.clipboard.writeText(href)
    }
    else {
      await navigator.clipboard.writeText(copyString)
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
    :class="{ [successClass]: clipboardSuccess }"
    @click="clipboardWrite"
  >
    <slot />
  </Button>
</template>
