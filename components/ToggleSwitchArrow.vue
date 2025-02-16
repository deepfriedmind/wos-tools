<template>
  <ToggleSwitch>
    <template #handle="{ checked }">
      <i
        class="pi text-xs"
        :class="{ 'pi-arrow-right': checked, 'pi-arrow-left': !checked }"
      />
    </template>
  </ToggleSwitch>
</template>
