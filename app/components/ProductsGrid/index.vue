<template>
  <div class="resolver">
    <ProductsGridDesktop class="desktop" />
    <ProductsGridMobile class="mobile" />
  </div>
</template>

<script setup>
import ProductsGridDesktop from './desktop.vue'
import ProductsGridMobile from './mobile.vue'
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
