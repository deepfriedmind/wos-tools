<script setup lang="ts">
defineProps<{
  activeMilestoneId: string | undefined
  milestones: { title: string }[]
  timelineRefs: ReturnType<typeof unrefElement>[]
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
          :data-active="activeMilestoneId === useKebabCase(title) ? '' : undefined"
          class="relative"
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

<style scoped lang="postcss">
[data-active]:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: rem(2);
  background-color: var(--p-surface-800);
}

[data-active]:hover:before {
  display: none;
}
</style>
