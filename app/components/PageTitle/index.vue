<template>
  <h1 class="page-title"><slot /></h1>
</template>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.page-title {
  padding-left: 60px;
  margin-top: -20px;
  margin-bottom: -10px;

  @media (max-width: $mobileBreakpoint) {
    padding-left: 20px;
  }
}
</style>
