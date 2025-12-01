<template>
  <div class="container">
    <div class="grid">
      <div class="item hover-card">
        <NuxtImg class="image" src="/images/Catalog/Hero/1.png" alt="Бани" format="webp" />
        <UIButton class="button" secondary @click="navigateTo('/catalog/bathhouses')"
          >Бани</UIButton
        >
      </div>
      <div class="item hover-card">
        <NuxtImg class="image" src="/images/Catalog/Hero/2.png" alt="Бани" format="webp" />
        <UIButton class="button" secondary @click="navigateTo('/catalog/verandas')"
          >Беседки и веранды</UIButton
        >
      </div>
      <div class="item double hover-card desktop">
        <NuxtImg class="image" src="/images/Catalog/Hero/3.png" alt="Бани" format="webp" />
        <UIButton class="button" secondary>Другие садовые объекты</UIButton>
      </div>

      <div class="item double hover-card mobile">
        <NuxtImg class="image" src="/images/Catalog/Hero/3-mobile.png" alt="Бани" format="webp" />
        <UIButton class="button" secondary>Другие садовые объекты</UIButton>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    padding: 0 10px;
    gap: 10px;
  }

  .item {
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    .image {
      aspect-ratio: 688 / 400;
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media (max-width: $mobileBreakpoint) {
        aspect-ratio: 373 / 146;
      }
    }

    .button {
      position: absolute;
      bottom: 20px;
      left: 20px;

      @media (max-width: $mobileBreakpoint) {
        padding: 10.974px 24.692px;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: fit-content;
        bottom: 20px;
        left: 20px;
        gap: 0;

        :deep(.ui-button__icon svg) {
          width: 13.169px;
          height: 13.169px;
        }

        :deep(.ui-button__icon) {
          display: block;
          width: 13.169px;
          height: 13.169px;
        }
      }
    }
  }

  .double {
    grid-column: span 2;

    @media (max-width: $mobileBreakpoint) {
      grid-column: span 1;
    }

    .image {
      aspect-ratio: 1408 / 236;

      @media (max-width: $mobileBreakpoint) {
        aspect-ratio: auto;
      }
    }
  }
}

.mobile {
  display: none;

  @media (max-width: $mobileBreakpoint) {
    display: block;
  }
}

.desktop {
  display: block;

  @media (max-width: $mobileBreakpoint) {
    display: none;
  }
}
</style>
