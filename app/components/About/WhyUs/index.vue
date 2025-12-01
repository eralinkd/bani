<template>
  <div class="wrapper">
    <AboutWhyUsDesktop class="desktop" />
    <ClientOnly>
      <AboutWhyUsMobile class="mobile" />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.wrapper {
  width: 100%;
}

.desktop {
  display: block;
}

.mobile {
  display: none;
}

@media (max-width: $mobileBreakpoint) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}
</style>
