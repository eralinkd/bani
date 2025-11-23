<template>
  <div class="container">
    <h1 class="text-white">Создаем объекты для отличного загородного отдыха</h1>
    <UIButton class="button" secondary>Обсудить проект</UIButton>
    <NuxtImg class="image" src="/images/About/Banner.png" alt="Фоновое изображение" format="webp" />
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 70px 32px 50px 32px;

  * {
    position: relative;
    z-index: 2;
  }

  .button {
    margin-top: 30px;
  }

  .image {
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
