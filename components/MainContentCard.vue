<script lang="ts" setup>
const { copyUrlButton, copyUrlButtonLabel = 'Copy link to current settings', heading, icon, iconColorClass = 'text-surface-500', imagePath, subHeading } = defineProps<{
  /** Whether to show a button to copy the current URL */
  copyUrlButton?: boolean
  /** Label for the copy URL button tooltip */
  copyUrlButtonLabel?: string
  /** Main heading text for the card */
  heading?: string
  /** Icon name to display next to the heading (uses Icon component) */
  icon?: string
  /** Tailwind CSS class for setting the icon color */
  iconColorClass?: string
  /** Image path to display instead of an icon */
  imagePath?: string
  /** Secondary heading text displayed below the main heading */
  subHeading?: string
}>()
</script>

<template>
  <div class="animate-fadeinright rounded-3xl bg-surface-950/95 p-4 shadow-2xl shadow-blue-950 backdrop-blur-md animate-once sm:p-8">
    <CopyButton
      v-if="copyUrlButton"
      v-tooltip="copyUrlButtonLabel"
      copy-string="currentUrl"
      variant="text"
      rounded
      class="!absolute right-0 top-0 size-12 animate-zoomin animate-once md:right-[rem(18)] md:top-[rem(18)]"
    >
      <Icon
        name="fluent:copy-link-24-regular"
        size="24"
        :aria-label="copyUrlButtonLabel"
      />
    </CopyButton>
    <div
      v-if="heading || subHeading"
      class="mb-12 w-11/12 space-y-4"
    >
      <slot name="heading">
        <div class="flex items-center gap-1.5">
          <img
            v-if="imagePath"
            :src="imagePath"
            :alt="heading"
            class="size-6 drop-shadow-md md:size-9"
          >
          <Icon
            v-else-if="icon"
            :name="icon"
            :class="`${iconColorClass} text-2xl drop-shadow-md md:text-4xl`"
          />
          <h2
            v-if="heading"
            class="text-xl font-semibold text-shadow md:text-2xl"
          >
            {{ heading }}
          </h2>
        </div>
      </slot>
      <slot name="subHeading">
        <h3
          v-if="subHeading"
          class="text-lg md:text-xl"
        >
          {{ subHeading }}
        </h3>
      </slot>
    </div>
    <slot />
  </div>
</template>
