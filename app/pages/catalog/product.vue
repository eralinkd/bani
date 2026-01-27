<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <ProductHero class="mobile-margin" :product="product" />
      <ProductStats class="mobile-margin big" :product="product" />
      <HowToOffer />
      <Popular />
      <Reviews />
      <Promotions />
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>

<script setup>
import HowToOffer from '../../components/HowToOffer/index.vue'
import ProductHero from '../../components/Product/Hero/index.vue'
import ProductStats from '../../components/Product/Stats/index.vue'

const { data: productResponse } = await useAsyncData('product-page', () => $fetch('/api/product'))
const product = computed(() => productResponse.value?.product ?? null)
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
    margin-top: -50px;
  }
}
</style>
