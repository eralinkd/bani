<template>
  <div class="mobile-hero">
    <h1 class="heading">баня бочка</h1>
    <div class="gallery">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="16"
        :navigation="navigationOptions"
        :loop="true"
        class="slider"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <NuxtImg class="slide-image" :src="image" :alt="`Фото ${index + 1}`" format="webp" />
        </SwiperSlide>
      </Swiper>
      <div class="slider-controls">
        <button
          class="swiper-button-prev-product-mobile"
          type="button"
          aria-label="Предыдущий слайд"
        >
          <IconsArrowLeft />
        </button>
        <p class="text-16">{{ currentSlide + 1 }} / {{ images.length }}</p>
        <button
          class="swiper-button-next-product-mobile"
          type="button"
          aria-label="Следующий слайд"
        >
          <IconsArrowRight />
        </button>
      </div>
    </div>

    <div class="description">
      <p class="text-16 bold">Описание:</p>
      <p class="text-16">
        Корпус бани выполнен из качественной древесины ели, собранной по надежной системе «лунный
        паз», что обеспечивает отличную теплоизоляцию. Для долговечности и эстетики, корпус снаружи
        обработан защитными составами (цвет на выбор клиента), а верхняя часть бочки покрыта мягкой
        черепицей (доступны зеленый, красный или коричневый цвета).
      </p>
      <div class="stats">
        <div class="stat">
          <p class="name text-16">Материалы:</p>
          <p class="value text-16">Брус / металл / кирпичи</p>
        </div>
        <div class="stat">
          <p class="name text-16">Печь:</p>
          <p class="value text-16">Термофор Допропар -14</p>
        </div>
      </div>
    </div>

    <div class="filters-card">
      <UISelect v-model="selectedSize" :options="sizeOptions" placeholder="Выберите размер" />
      <p class="price">{{ formattedPrice }}</p>
      <p class="product-code">Код товара: {{ productCode }}</p>
    </div>

    <UIButton class="cta-button" @click="modal.open('default')">Отправить заявку</UIButton>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import IconsArrowLeft from '../../Icons/ArrowLeft.vue'
import IconsArrowRight from '../../Icons/ArrowRight.vue'

const modal = useModal()
const modules = [Navigation]

const images = [
  '/images/Product/1.png',
  '/images/Product/2.png',
  '/images/Product/3.png',
  '/images/Product/4.png',
  '/images/Product/5.png',
  '/images/Product/6.png',
]

const currentSlide = ref(0)

const navigationOptions = {
  nextEl: '.swiper-button-next-product-mobile',
  prevEl: '.swiper-button-prev-product-mobile',
}

function onSlideChange(swiper) {
  currentSlide.value = swiper.realIndex
}

const sizeOptions = [
  { label: '4,2х2,2х2,5 м.', value: '4.2x2.2x2.5', price: 2270000, code: '4197410' },
  { label: '5,0х2,2х2,5 м.', value: '5.0x2.2x2.5', price: 2580000, code: '4197411' },
  { label: '6,0х2,2х2,5 м.', value: '6.0x2.2x2.5', price: 2890000, code: '4197412' },
  { label: '7,0х2,2х2,5 м.', value: '7.0x2.2x2.5', price: 3200000, code: '4197413' },
]

const selectedSize = ref(sizeOptions[0].value)

const currentSize = computed(() => {
  return sizeOptions.find((option) => option.value === selectedSize.value) || sizeOptions[0]
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(currentSize.value.price) + ' ₽'
})

const productCode = computed(() => {
  return currentSize.value.code
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.mobile-hero {
  padding: 0 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.heading {
  margin-bottom: -10px;
  font-size: 50px;
  font-style: normal;
  font-weight: 900;
  line-height: 110%; /* 55px */
  text-transform: uppercase;
}

.gallery {
  border-radius: 24px;
  padding: 16px;

  .slider {
    border-radius: 20px;
    overflow: hidden;
  }

  :deep(.swiper-slide) {
    display: flex;
  }

  .slide-image {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-radius: 16px;
  }

  .slider-controls {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: none;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .text-16 {
      color: $text;
    }
  }
}

.description {
  border-radius: 24px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .text-16.bold {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .name {
      color: #afafaf;
    }
  }
}

.filters-card {
  background: $white;
  border-radius: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  :deep(.ui-select) {
    width: 100%;
  }

  .price {
    font-size: 28px;
    color: #41424c;
    margin: 0;
  }

  .product-code {
    font-size: 16px;
    color: #afafaf;
    margin: 0;
  }
}

.cta-button {
  width: 100%;
}
</style>
