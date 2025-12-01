<template>
  <div class="container">
    <div class="filters">
      <UISelect
        v-model="selectedType"
        label="Тип изделия"
        :options="typeOptions"
        placeholder="Не выбрано"
      />
      <UISelect
        v-model="selectedLength"
        label="Длина"
        :options="lengthOptions"
        placeholder="Не выбрано"
      />
      <UIPriceInput v-model:min="minPrice" v-model:max="maxPrice" label="Цена, ₽" />
      <UIButton icon-position="none" class="help-button">Применить</UIButton>
      <button v-if="hasActiveFilters" class="reset-button" @click="resetFilters">
        Сбросить фильтры
      </button>
    </div>

    <div class="slider-wrapper">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="16"
        :navigation="navigationOptions"
        :loop="true"
        class="slider"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(product, index) in products" :key="index">
          <NuxtLink to="/catalog/product" class="item">
            <NuxtImg class="image" src="/images/Products/1.png" alt="Продукт" format="webp" />
            <div class="item-content">
              <p class="text-24 text-white">Баня бочка</p>
              <p class="text-14 text-white">
                Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек
                над входом.
              </p>
              <p class="text-24 text-white">858 000 ₽</p>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>

      <div class="slider-controls">
        <button class="swiper-button-prev-products-mobile" type="button">
          <IconsArrowLeft />
        </button>
        <p class="text-18">{{ currentSlide + 1 }} / {{ products.length }}</p>
        <button class="swiper-button-next-products-mobile" type="button">
          <IconsArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import IconsArrowLeft from '../Icons/ArrowLeft.vue'
import IconsArrowRight from '../Icons/ArrowRight.vue'

const modules = [Navigation]

const products = Array(12).fill(null)
const currentSlide = ref(0)

const navigationOptions = {
  nextEl: '.swiper-button-next-products-mobile',
  prevEl: '.swiper-button-prev-products-mobile',
}

const selectedType = ref(null)
const selectedLength = ref(null)
const minPrice = ref('')
const maxPrice = ref('')

const typeOptions = [
  { label: 'Баня бочка', value: 'bochka' },
  { label: 'Квадро-бочка', value: 'quadro' },
  { label: 'Баня дом', value: 'house' },
]

const lengthOptions = [
  { label: '2 м', value: '2' },
  { label: '3 м', value: '3' },
  { label: '4 м', value: '4' },
  { label: '5 м', value: '5' },
]

const hasActiveFilters = computed(() => {
  return (
    selectedType.value !== null ||
    selectedLength.value !== null ||
    minPrice.value !== '' ||
    maxPrice.value !== ''
  )
})

function resetFilters() {
  selectedType.value = null
  selectedLength.value = null
  minPrice.value = ''
  maxPrice.value = ''
}

function onSlideChange(swiper) {
  currentSlide.value = swiper.realIndex
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.filters {
  border-radius: 20px;
  background: $white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .help-button {
    width: 100%;
  }
}

.slider-wrapper {
  width: 100%;
  position: relative;
}

.slider {
  width: 100%;

  :deep(.swiper-slide) {
    display: flex;
  }
}

.item {
  border-radius: 24px;
  overflow: hidden;
  width: 100%;
  min-height: 420px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;

  .image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
  }

  p {
    max-width: 100%;
  }
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

  .text-18 {
    color: $text-secondary;
  }
}

.reset-button {
  background: none;
  border: none;
  padding: 0;
  color: #6f6f6f;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  width: fit-content;
  margin: 0 auto;
}
</style>
