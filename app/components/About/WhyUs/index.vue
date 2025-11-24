<template>
  <div class="container">
    <h2>
      Почему <br />
      выбирают <br />
      нас
    </h2>

    <div class="grid">
      <div class="item">
        <AboutWhyUsIcons1st />
        <p class="text-24">Наши преимущества и опыт</p>
        <p class="text-16">
          Мы обладаем многолетним опытом в сфере строительства садовых построек, что является
          гарантией высокого качества наших изделий. Мы ценим ваше время, поэтому наш сервис
          отличается оперативностью на всех этапах сотрудничества.
        </p>
      </div>
      <div class="item">
        <AboutWhyUsIcons2nd />
        <p class="text-24">Современный подход и качество</p>
        <p class="text-16">
          Ключевое преимущество нашей компании — это современный подход к каркасному строительству.
          При производстве мы используем только качественные, экологически чистые материалы,
          заботясь о долговечности и безопасности ваших построек.
        </p>
      </div>
      <div class="item">
        <AboutWhyUsIcons3rd />
        <p class="text-24">Собственное производство</p>
        <p class="text-16">
          Мы располагаем собственным производством полного цикла — от заготовки бревна до
          изготовления строганой доски. Это позволяет нам строго контролировать качество и
          поддерживать низкие цены на всю нашу продукцию.
        </p>
      </div>
      <div class="item">
        <AboutWhyUsIcons4th />
        <p class="text-24">Монтаж за один день</p>
        <p class="text-16">
          Наш многолетний опыт позволяет нам гарантировать не только качество продукции, но и
          оперативность поставки и установки. Мы выполняем полный монтаж приобретенных вами изделий
          на участке всего за один день.
        </p>
      </div>
      <div class="item">
        <AboutWhyUsIcons5th />
        <p class="text-24">Эффективная логистика</p>
        <p class="text-16">
          Наличие собственного парка автомобилей позволяет нам эффективно и оперативно решать все
          возникающие логистические задачи. Это обеспечивает своевременную доставку материалов и
          изделий прямо на ваш объект.
        </p>
      </div>
      <div class="item">
        <AboutWhyUsIcons6th />
        <p class="text-24">Условия оплаты</p>
        <p class="text-16">
          Мы работаем по простой и прозрачной схеме: полная оплата за наши изделия и услуги
          производится только после их установки на вашем участке и подтверждения вами качества
          выполненных работ.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 60px;
}

.grid {
  margin-top: 42px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  row-gap: 20px;

  .item {
    display: flex;
    border-radius: 20px;
    background: $white;
    flex-direction: column;
    padding: 31px 33px 30px 20px;
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

    .text-24 {
      margin-top: 44px;
      margin-bottom: 15px;
    }
  }
}
</style>
