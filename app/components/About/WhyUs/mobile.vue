<template>
  <div class="container">
    <h2>
      Почему <br />
      выбирают <br />
      нас
    </h2>

    <Swiper
      class="slider"
      :modules="modules"
      :loop="true"
      :space-between="16"
      :slides-per-view="1"
      :autoplay="autoplayOptions"
      :observer="true"
      :observe-parents="true"
    >
      <SwiperSlide v-for="(card, index) in cards" :key="index">
        <div class="item">
          <component :is="card.icon" class="item-icon" aria-hidden="true" />
          <div class="item-content">
            <p class="text-24">{{ card.title }}</p>
            <p class="text-16">{{ card.description }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import AboutWhyUsIcons1st from './Icons/1st.vue'
import AboutWhyUsIcons2nd from './Icons/2nd.vue'
import AboutWhyUsIcons3rd from './Icons/3rd.vue'
import AboutWhyUsIcons4th from './Icons/4th.vue'
import AboutWhyUsIcons5th from './Icons/5th.vue'
import AboutWhyUsIcons6th from './Icons/6th.vue'

const modules = [Autoplay]

const autoplayOptions = {
  delay: 3500,
  disableOnInteraction: false,
}

const cards = [
  {
    icon: AboutWhyUsIcons1st,
    title: 'Наши преимущества и опыт',
    description:
      'Мы обладаем многолетним опытом в сфере строительства садовых построек, что является гарантией высокого качества наших изделий. Мы ценим ваше время, поэтому наш сервис отличается оперативностью на всех этапах сотрудничества.',
  },
  {
    icon: AboutWhyUsIcons2nd,
    title: 'Современный подход и качество',
    description:
      'Ключевое преимущество нашей компании — это современный подход к каркасному строительству. При производстве мы используем только качественные, экологически чистые материалы, заботясь о долговечности и безопасности ваших построек.',
  },
  {
    icon: AboutWhyUsIcons3rd,
    title: 'Собственное производство',
    description:
      'Мы располагаем собственным производством полного цикла — от заготовки бревна до изготовления строганой доски. Это позволяет нам строго контролировать качество и поддерживать низкие цены на всю нашу продукцию.',
  },
  {
    icon: AboutWhyUsIcons4th,
    title: 'Монтаж за один день',
    description:
      'Наш многолетний опыт позволяет нам гарантировать не только качество продукции, но и оперативность поставки и установки. Мы выполняем полный монтаж приобретенных вами изделий на участке всего за один день.',
  },
  {
    icon: AboutWhyUsIcons5th,
    title: 'Эффективная логистика',
    description:
      'Наличие собственного парка автомобилей позволяет нам эффективно и оперативно решать все возникающие логистические задачи. Это обеспечивает своевременную доставку материалов и изделий прямо на ваш объект.',
  },
  {
    icon: AboutWhyUsIcons6th,
    title: 'Условия оплаты',
    description:
      'Мы работаем по простой и прозрачной схеме: полная оплата за наши изделия и услуги производится только после их установки на вашем участке и подтверждения вами качества выполненных работ.',
  },
]
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 20px;
}

.slider {
  margin-top: 32px;
  width: 100%;

  :deep(.swiper-wrapper) {
    display: flex;
  }

  :deep(.swiper-slide) {
    height: auto;
    display: flex;
  }
}

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 20px;
  background: $white;
  padding: 28px 24px 32px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.item-icon {
  width: 55.802px;
  height: 55.802px;
  margin-bottom: 20px;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.item-content .text-24 {
  margin: 0;
  line-height: 1.2;
}

.item-content .text-16 {
  color: $text-secondary;
  line-height: 1.45;
}
</style>
