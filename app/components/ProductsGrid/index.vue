<template>
  <div class="resolver">
    <ProductsGridDesktop class="desktop" :products="filteredProducts" />
    <ProductsGridMobile class="mobile" :products="filteredProducts" />
  </div>
</template>

<script setup>
import ProductsGridDesktop from './desktop.vue'
import ProductsGridMobile from './mobile.vue'

const props = defineProps({
  categoryId: {
    type: String,
    default: '',
  },
})

const { data: productsResponse } = await useAsyncData('products-grid', () => $fetch('/api/products'))

const products = computed(() => productsResponse.value?.products ?? [])

const filteredProducts = computed(() => {
  if (!props.categoryId) return products.value
  return products.value.filter((product) => product.categoryId === props.categoryId)
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.resolver {
  width: 100%;
}

.desktop {
  display: flex;
}

.mobile {
  display: none;
}

@media (max-width: $mobileBreakpoint) {
  .desktop {
    display: none;
  }

  .mobile {
    display: flex;
  }
}
</style>
