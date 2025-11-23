<template>
  <div class="container main-choose">
    <div class="container left">
      <h2>Выбирайте проект</h2>
      <p class="text-36">а мы реализуем его в короткие сроки</p>
      <NuxtImg class="decor-image" src="/images/MainChoose/decor.png" alt="Беседка" format="webp" />
    </div>
    <div class="container right">
      <div class="item">
        <NuxtImg
          class="image"
          src="/images/MainChoose/1.png"
          alt="Выбирайте проект"
          format="webp"
        />
        <UIButton class="button" secondary>Бани</UIButton>
        <UIButton small class="button mobile" secondary>Бани</UIButton>
      </div>
      <div class="item">
        <NuxtImg
          class="image"
          src="/images/MainChoose/2.png"
          alt="Выбирайте проект"
          format="webp"
        />
        <UIButton class="button" secondary>Беседки и веранды</UIButton>
        <UIButton small class="button mobile" secondary>Беседки и веранды</UIButton>
      </div>

      <NuxtImg
        class="decor-image mobile"
        src="/images/MainChoose/decor.png"
        alt="Беседка"
        format="webp"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.main-choose {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding-left: 32px;
  position: relative;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 20px;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.left {
  position: relative;

  .text-36 {
    margin-top: 10px;
  }
}

.decor-image {
  position: absolute;
  bottom: -220px;
  left: 50%;
  transform: translateX(-50%);
  aspect-ratio: 673 / 475;
  width: 100%;

  .mobile {
    display: none;
  }

  @media (max-width: $mobileBreakpoint) {
    display: none;
    aspect-ratio: 377 / 266;
    bottom: -270px;

    .mobile {
      display: block;
    }
  }
}

.right {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-rows: 1fr;
    gap: 10px;
  }

  .item {
    position: relative;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  .button {
    position: absolute;
    bottom: 20px;
    left: 20px;

    @media (max-width: $mobileBreakpoint) {
      display: none;
    }
  }

  .mobile {
    display: none;
  }

  @media (max-width: $mobileBreakpoint) {
    .mobile {
      width: fit-content;
      display: inline-flex;
    }
  }
}
</style>
