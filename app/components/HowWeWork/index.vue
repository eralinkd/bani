<template>
  <div class="container">
    <div class="left">
      <h2>как мы работаем</h2>
      <p class="text-16 intro">
        Для расчета стоимости проекта оставьте заявку на сайте или позвоните нам. Мы соберем и
        доставим материалы для объекта за один день.
      </p>
      <div class="steps">
        <div class="item">
          <div class="number">
            <HowWeWorkIconsOne />
          </div>
          <p class="text-16">Оставьте заявку на нашем сайте, чтобы начать процесс.</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsTwo />
          </div>
          <p class="text-16">Согласуйте детали с менеджером, включая сроки и стоимость.</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsThree />
          </div>
          <p class="text-16">Накануне работ мы созвонимся с вами. Оплатите и отдыхайте!</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsFour />
          </div>
          <p class="text-16">Оформите заказ и подтвердите все условия работы и монтажа.</p>
        </div>
      </div>
      <UIButton>Оставить заявку</UIButton>
    </div>
    <div class="right">
      <h2 class="text-64 text-white">Воспользуйтесь беспроцентной рассрочкой</h2>
      <p class="text-36 text-white">от Т-Банка и банков партнеров</p>
      <UIButton secondary class="button">Оставить заявку</UIButton>
      <NuxtImg class="image" src="/images/HowWeWork/bg.png" alt="Как мы работаем" format="webp" />
      <NuxtImg
        class="decor"
        src="/images/HowWeWork/cards.png"
        alt="Карточки банков"
        format="webp"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding-left: 60px;

  .left {
    .text-16.intro {
      margin-top: 10px;
      margin-bottom: 40px;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 40px;

      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border-radius: 15px;
        background: $white;

        .number {
          width: 63px;
          height: 63px;
          background: $text;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      }
    }
  }

  .right {
    position: relative;
    padding: 40px;

    * {
      position: relative;
      z-index: 2;
    }

    .image {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 30px;
    }

    .text-36 {
      margin: 20px 0;
    }

    .decor {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 78%;
    }

    .button {
      z-index: 3;
    }
  }
}
</style>
