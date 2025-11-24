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
        <UIButton class="button" secondary>Беседки и веранды</UIButton>
      </div>
      <div class="item double hover-card">
        <NuxtImg class="image" src="/images/Catalog/Hero/3.png" alt="Бани" format="webp" />
        <UIButton class="button" secondary>Другие садовые объекты</UIButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  .item {
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    .image {
      aspect-ratio: 688 / 400;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .button {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }

  .double {
    grid-column: span 2;

    .image {
      aspect-ratio: 1408 / 236;
    }
  }
}
</style>
