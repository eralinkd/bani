<template>
  <div class="container">
    <h2>
      Популярные <br />
      товары
    </h2>
    <div class="slider">
      <div class="item">
        <NuxtImg class="image" src="/images/Popular/1.png" alt="Баня бочка" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-14 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <p class="text-24 text-white">858 000 ₽</p>
      </div>
      <div class="item">
        <NuxtImg class="image" src="/images/Popular/2.png" alt="Баня бочка" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-14 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <p class="text-24 text-white">858 000 ₽</p>
      </div>
      <div class="item">
        <NuxtImg class="image" src="/images/Popular/3.png" alt="Баня бочка" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-14 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <p class="text-24 text-white">858 000 ₽</p>
      </div>
      <div class="item">
        <NuxtImg class="image" src="/images/Popular/4.png" alt="Баня бочка" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-14 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <p class="text-24 text-white">858 000 ₽</p>
      </div>
    </div>
    <div class="controls">
      <UIButton>В каталог</UIButton>
      <div class="slider-controls">
        <IconsArrowLeft />
        <p class="text-18">2 / 18</p>
        <IconsArrowRight />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 32px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 20px;

    h2 {
      font-size: 50px;
    }
  }
}

.slider {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 10px;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .item {
    border-radius: 20px;
    aspect-ratio: 328 / 481;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    padding: 20px 50px 20px 20px;

    @media (max-width: $mobileBreakpoint) {
      display: none;

      &:nth-child(1) {
        display: flex;
      }
    }

    p {
      position: relative;
      z-index: 1;
      margin-bottom: 10px;
    }

    .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 30px;
    flex-direction: column-reverse;
    align-items: center;
    gap: 20px;
  }

  .slider-controls {
    display: flex;
    align-items: center;
    gap: 20px;

    .text-18 {
      color: $text-secondary;
    }
  }
}
</style>
