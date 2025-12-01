<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>Каталог</PageTitle>
      <CatalogHero />
      <ProjectsSlider class="slider" />
      <HowWeWork />
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
.slider {
  @media (max-width: $mobileBreakpoint) {
    margin-top: 0;
  }
}
</style>
