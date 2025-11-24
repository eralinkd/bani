<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <ProductHero />
      <ProductStats />
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
</script>
