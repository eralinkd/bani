<template>
  <div class="resolver">
    <ProductHeroDesktop class="desktop" />
    <ProductHeroMobile class="mobile" />
  </div>
</template>

<script setup>
import ProductHeroDesktop from './desktop.vue'
import ProductHeroMobile from './mobile.vue'
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
