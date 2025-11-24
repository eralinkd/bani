<template>
  <div class="container">
    <div class="item">
      <NuxtImg
        class="image"
        src="/images/Promotions/bg.png"
        alt="Фоновое изображение"
        format="webp"
      />
      <NuxtImg class="decor" src="/images/Promotions/decor-1.png" alt="Декор" format="webp" />
      <h2 class="text-52 text-white">Скидка 5% на полный комплект беседки</h2>
      <p class="text-36 text-white">с установкой в день обращения</p>
      <UIButton class="button" secondary @click="modal.open('default')">Оставить заявку</UIButton>
    </div>
    <div class="item">
      <NuxtImg
        class="image"
        src="/images/Promotions/bg.png"
        alt="Фоновое изображение"
        format="webp"
      />
      <NuxtImg class="decor" src="/images/Promotions/decor-2.png" alt="Декор" format="webp" />
      <h2 class="text-52 text-white">Дрова на первую топку в подарок на бани в каменку</h2>
      <UIButton class="button" secondary @click="modal.open('default')">Оставить заявку</UIButton>
    </div>
  </div>
</template>

<script setup>
const modal = useModal()
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  .item {
    border-radius: 20px;
    position: relative;
    padding: 40px 35px 200px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;

    * {
      z-index: 2;
    }
  }

  .text-36 {
    margin-top: -10px;
  }

  .button {
    width: fit-content;
  }

  .image {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .decor {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
  }
}
</style>
