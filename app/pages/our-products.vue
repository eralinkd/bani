<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <OurProductsHero class="mobile-margin" />
      <WhyUs />
      <Reviews />
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.mobile-margin {
  @media (max-width: $mobileBreakpoint) {
    margin-top: -20px;
  }
}
</style>
