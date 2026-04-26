<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>Наши работы</PageTitle>
      <OurProductsHero class="mobile-margin" />
      <WhyUs />
      <Reviews />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
useSeoPage('our-products', { title: 'Наши работы' })
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.mobile-margin {
  @media (max-width: $mobileBreakpoint) {
    margin-top: -20px;
  }
}
</style>
