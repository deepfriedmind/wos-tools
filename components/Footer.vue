<template>
  <footer class="bg-[linear-gradient(0,_rgb(23_41_64_/_33%),_transparent)] pb-24 pt-2.5 text-center">
    <div class="container [text-shadow:1px_1px_0px_rgb(36_65_102_/_50%)]">
      <p class="space-y-2 font-medium">
        &copy;{{ $dayjs().year() }}
        <RouterLink
          to="/"
          aria-label="Home"
        >
          <Logo class="text-xl" />
        </RouterLink>
      </p>
      <p class="mt-2 text-xs">
        This website has no affiliation with Century Games Pte. Ltd.
      </p>
    </div>
  </footer>
</template>
