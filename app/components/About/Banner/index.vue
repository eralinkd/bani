<template>
  <div class="container hover-card">
    <h1 class="text-white">Создаем объекты для отличного загородного отдыха</h1>
    <UIButton class="button" secondary @click="modal.open('default')">Обсудить проект</UIButton>
    <NuxtImg class="image" src="/images/About/banner.png" alt="Фоновое изображение" format="webp" />
  </div>
</template>

<script setup>
const modal = useModal()
</script>

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

@media (max-width: $mobileBreakpoint) {
  .container {
    padding: 40px 30px;
    position: relative;
  }

  h1 {
    font-family: Gilroy;
    font-size: 35px;
    font-style: normal;
    font-weight: 900;
    line-height: 100%; /* 35px */
    text-transform: uppercase;
    margin-bottom: 100px;
  }

  .image {
    width: 95% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    border-radius: 20px;
  }

  .button {
    width: fit-content;

    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
