<template>
  <div class="container main-choose">
    <div class="container left">
      <h2>Выбирайте проект</h2>
      <p class="text-36">а мы реализуем его в короткие сроки</p>
      <NuxtImg class="image" src="/images/MainChoose/decor.png" alt="Беседка" format="webp" />
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
      </div>
      <div class="item">
        <NuxtImg
          class="image"
          src="/images/MainChoose/2.png"
          alt="Выбирайте проект"
          format="webp"
        />
        <UIButton class="button" secondary>Беседки и веранды</UIButton>
      </div>
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
}

.left {
  position: relative;

  .text-36 {
    margin-top: 10px;
  }

  .image {
    position: absolute;
    bottom: -220px;
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 673 / 475;
    width: 100%;
  }
}

.right {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;

  .item {
    position: relative;
    aspect-ratio: 719 / 281;
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
  }
}
</style>
