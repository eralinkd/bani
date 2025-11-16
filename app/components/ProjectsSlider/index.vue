<template>
  <div class="container white">
    <div class="left">
      <h2>Уже построили</h2>
      <p class="text-36">
        Оцените наше мастерство и вдохновитесь примерами реальных работ, выполненных для наших
        клиентов.
      </p>
      <UIButton>В каталог</UIButton>
    </div>
    <div class="right">
      <div class="slider">
        <div class="item">
          <NuxtImg class="image" src="/images/ProjectsSlider/1.png" alt="Проект" format="webp" />
          <p class="text-16">Баня бочка в Пензе</p>
        </div>

        <div class="slider-controls">
          <IconsArrowLeft />
          <p class="text-18">2 / 18</p>
          <IconsArrowRight />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 50px 60px 50px 60px;

  .text-36 {
    margin-top: 10px;
    margin-bottom: 40px;
  }
}

.right {
  position: relative;

  .slider {
    aspect-ratio: 688 / 485;
    width: 100%;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    .text-16 {
      color: $white;
      position: absolute;
      bottom: 40px;
      left: 40px;
    }

    .slider-controls {
      position: absolute;
      right: 0;
      bottom: -43px;
      display: flex;
      align-items: center;
      gap: 20px;

      .text-18 {
        color: $text-secondary;
      }
    }
  }
}
</style>
