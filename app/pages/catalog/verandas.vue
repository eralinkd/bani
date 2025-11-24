<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>Веранды</PageTitle>
      <VerandasProductsGrid />
      <ProjectsSlider />
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
