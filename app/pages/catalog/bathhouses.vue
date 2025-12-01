<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>Бани</PageTitle>
      <ProductsGrid class="mobile-margin" />
      <ProjectsSlider class="mobile-margin big" />
      <HowWeWork no-button />
      <Reviews />
      <Promotions />
      <WhyUs />
      <FAQ />
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
.big {
  @media (max-width: $mobileBreakpoint) {
    margin-top: -30px;
  }
}
</style>
