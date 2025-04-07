<script setup lang="ts">
defineProps<{
  activeMilestoneId: string | undefined
  milestones: Array<{ title: string }>
  timelineRefs: Array<HTMLElement | null>
}>()

function scrollToMilestone(event: Event, title: string) {
  event.preventDefault()
  const elementId = useKebabCase(title)
  const element = document.querySelector(`#${elementId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <aside>
    <ScrollPanel class="sticky top-28 h-[calc(100vh-7rem)] w-72 pb-8 pl-2">
      <ol class="space-y-2">
        <li
          v-for="{ title } in milestones"
          :key="useKebabCase(title)"
        >
          <a
            :href="`#${useKebabCase(title)}`"
            class="block hyphens-auto rounded px-2 py-1 text-sm transition-colors hover:bg-surface-800"
            :class="[
              activeMilestoneId === useKebabCase(title) ? 'font-bold text-primary-500' : 'text-surface-200',
            ]"
            @click="scrollToMilestone($event, title)"
          >
            {{ title }}
          </a>
        </li>
      </ol>
    </ScrollPanel>
  </aside>
</template>
