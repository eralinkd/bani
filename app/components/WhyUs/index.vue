<template>
  <div class="container">
    <div class="left">
      <h2>Почему выбирают нас</h2>
      <p class="text-36">
        У нас многолетний опыт в сфере строительства садовых построек, поэтому наши изделия
        отличаются качеством, а сервис — оперативностью
      </p>
      <UIButton @click="modal.open('default')">Оставить заявку</UIButton>
    </div>
    <div class="right">
      <div class="item">
        <WhyUsIconsFirst />
        <p class="text-16">Нестандартные размеры бань и беседок</p>
      </div>
      <div class="item">
        <WhyUsIconsSecond />
        <p class="text-16">Собственный автопарк для доставки</p>
      </div>
      <div class="item">
        <WhyUsIconsThird />
        <p class="text-16">Гарантия на обслуживание 1 год</p>
      </div>
      <div class="item">
        <WhyUsIconsFourth />
        <p class="text-16">Не нужна предоплата для старта работ</p>
      </div>
      <div class="item">
        <WhyUsIconsFifth />
        <p class="text-16">Уникальные дизайн проекты</p>
      </div>
      <div class="item">
        <WhyUsIconsSixth />
        <p class="text-16">Собственное эко производство</p>
      </div>
      <div class="item">
        <WhyUsIconsSeventh />
        <p class="text-16">Возможна работа по эскизам</p>
      </div>
      <div class="item">
        <WhyUsIconsEighth />
        <p class="text-16">Поставка и установка изделий за 1 день</p>
      </div>
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

  .left {
    .text-36 {
      margin-top: 10px;
      margin-bottom: 40px;
    }
  }

  .right {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 33px;

    .item {
      border-radius: 15px;
      background: $white;
      padding: 20px 58px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      cursor: pointer;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        background-color: #fafafa;
      }
    }
  }
}

@media (max-width: $mobileBreakpoint) {
  .container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;

    .left {
      .text-36 {
        margin-top: 8px;
        margin-bottom: 16px;
      }

      :deep(.UIButton) {
        width: 100%;
      }
    }

    .right {
      grid-template-columns: 1fr;
      gap: 10px;

      .item {
        padding: 23px 32px;
        border-radius: 15px;
        gap: 16px;
      }
    }
  }
}
</style>
