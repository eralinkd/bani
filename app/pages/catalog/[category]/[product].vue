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
import HowToOffer from '../../../components/HowToOffer/index.vue'
import ProductHero from '../../../components/Product/Hero/index.vue'
import ProductStats from '../../../components/Product/Stats/index.vue'

const route = useRoute()
const categorySlug = computed(() => String(route.params.category || ''))
const productSlug = computed(() => String(route.params.product || ''))

const { data: productResponse } = await useAsyncData(
  () => `product-${categorySlug.value}-${productSlug.value}`,
  () =>
    $fetch('/api/product', {
      query: { categorySlug: categorySlug.value, productSlug: productSlug.value },
    }),
  { watch: [categorySlug, productSlug] }
)

const product = computed(() => productResponse.value?.product ?? null)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
}
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
