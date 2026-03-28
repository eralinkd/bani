<template>
  <div class="mobile-hero">
    <h1 class="heading">{{ title }}</h1>
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
      <p class="text-16 bold">Краткое описание:</p>
      <p class="text-16">{{ description }}</p>
      <div v-if="materials || stove" class="stats">
        <div v-if="materials" class="stat">
          <p class="name text-16">Материалы:</p>
          <p class="value text-16">{{ materials }}</p>
        </div>
        <div v-if="stove" class="stat">
          <p class="name text-16">Печь:</p>
          <p class="value text-16">{{ stove }}</p>
        </div>
      </div>
    </div>

    <div class="filters-card">
      <UISelect v-model="selectedSize" :options="sizeOptions" placeholder="Выберите размер" />
      <p class="price">{{ formattedPrice }}</p>
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
const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
})

const placeholderImages = [
  '/images/Product/1.png',
  '/images/Product/2.png',
  '/images/Product/3.png',
  '/images/Product/4.png',
  '/images/Product/5.png',
  '/images/Product/6.png',
]

const images = computed(() => {
  const items = props.product?.images ?? []
  if (items.length) return items.map((item) => (typeof item === 'string' ? item : item.url))
  return placeholderImages
})

const currentSlide = ref(0)

const navigationOptions = {
  nextEl: '.swiper-button-next-product-mobile',
  prevEl: '.swiper-button-prev-product-mobile',
}

function onSlideChange(swiper) {
  currentSlide.value = swiper.realIndex
}

const sizeOptions = computed(() => props.product?.sizes ?? [])
const selectedSize = ref('')

watchEffect(() => {
  if (!selectedSize.value && sizeOptions.value.length) {
    selectedSize.value = sizeOptions.value[0].value
  }
})

const currentSize = computed(() => {
  return sizeOptions.value.find((option) => option.value === selectedSize.value)
})

const formattedPrice = computed(() => {
  if (!currentSize.value?.price) return ''
  return new Intl.NumberFormat('ru-RU').format(currentSize.value.price) + ' ₽'
})

const productCode = computed(() => {
  return currentSize.value?.code ?? ''
})

const title = computed(() => props.product?.title ?? '')
const description = computed(() => props.product?.description ?? '')
const materials = computed(() => props.product?.materials ?? '')
const stove = computed(() => props.product?.stove ?? '')
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
