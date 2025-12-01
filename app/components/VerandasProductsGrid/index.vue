<template>
  <div class="resolver">
    <VerandasProductsGridDesktop class="desktop" />
    <VerandasProductsGridMobile class="mobile" />
  </div>
</template>

<script setup>
import VerandasProductsGridDesktop from './desktop.vue'
import VerandasProductsGridMobile from './mobile.vue'
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
