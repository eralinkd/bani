<template>
  <div class="container">
    <NuxtImg class="bg" src="/images/Feedback/bg.png" alt="Feedback Form" format="webp" />

    <div class="content">
      <h2 class="text-white">Получите бесплатную консультацию</h2>
      <p class="text-36 text-white">
        Сообщите о вашей задумке и мы расскажем, как сможем ее реализовать
      </p>
      <UIButton secondary>Оставить заявку</UIButton>
    </div>
    <NuxtImg class="decor" src="/images/Feedback/decor.png" alt="Feedback Form" format="webp" />
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 50px 32px;
  position: relative;
  overflow: hidden;

  .bg {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    position: relative;
    z-index: 1;
    max-width: 808px;

    p {
      margin-top: 10px;
      max-width: 544px;
      margin-bottom: 40px;
    }
  }

  .decor {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 44%;
  }
}
</style>
