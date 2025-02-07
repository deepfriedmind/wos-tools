<template>
  <header class="mb-8">
    <div class="mb-4 flex items-center justify-between">
      <RouterLink
        to="/"
        class="inline-block"
      >
        <Logo />
      </RouterLink>
      <div class="flex flex-col items-end">
        <div>
          <Icon
            class="inline align-sub"
            size="18"
            name="openmoji:hourglass-not-done"
          />Reset in:
        </div>
        <ResetCountdown class="text-xl font-semibold" />
      </div>
    </div>
  </header>
</template>
