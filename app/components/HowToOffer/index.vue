<template>
  <div class="container">
    <div class="left">
      <h2>Как заказать</h2>
      <p class="text-36">
        Для расчета стоимости проекта оставьте заявку на сайте или позвоните нам. Мы соберем и
        доставим материалы для объекта за один день.
      </p>
    </div>
    <div class="steps">
      <div class="item">
        <div class="number">
          <HowToOfferIconsOne />
        </div>
        <p class="text-16">Оставьте заявку на нашем сайте, чтобы начать процесс.</p>
      </div>
      <div class="item">
        <div class="number">
          <HowToOfferIconsTwo />
        </div>
        <p class="text-16">Согласуйте детали с менеджером, включая сроки и стоимость.</p>
      </div>
      <div class="item">
        <div class="number">
          <HowToOfferIconsThree />
        </div>
        <p class="text-16">Накануне работ мы созвонимся с вами. Оплатите и отдыхайте!</p>
      </div>
      <div class="item">
        <div class="number">
          <HowToOfferIconsFour />
        </div>
        <p class="text-16">Оформите заказ и подтвердите все условия работы и монтажа.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;

.container {
  display: grid;
  grid-template-columns: 600px auto;
  gap: 32px;
  padding: 0 60px;

  .left {
    .text-36 {
      margin-top: 10px;
    }
  }

  .steps {
    margin-top: 235px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 40px;

    .item {
      height: fit-content;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      border-radius: 15px;
      background: $white;
      cursor: pointer;
      transition:
        box-shadow 0.3s ease,
        transform 0.3s ease;

      &:hover {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
      }

      .number {
        width: 55px;
        height: 55px;
        background: $text;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }

      &:hover .number {
        transform: scale(1.05);
      }
    }
  }
}
</style>
