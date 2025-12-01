<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>Веранды</PageTitle>
      <VerandasProductsGrid class="mobile-margin" />
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

<script setup>
import VerandasProductsGrid from '../../components/VerandasProductsGrid/index.vue'
</script>

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
