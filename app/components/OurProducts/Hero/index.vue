<template>
  <div class="container">
    <div class="filters">
      <div
        v-for="item in items"
        :key="item.value"
        class="item text-16"
        :class="{ selected: selected === item.value }"
        @click="selected = item.value"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="products">
      <div v-for="i in 8" :key="i" class="product-item">
        <div class="slider-wrapper">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="0"
            :navigation="{
              nextEl: `.swiper-button-next-our-products-${i}`,
              prevEl: `.swiper-button-prev-our-products-${i}`,
            }"
            class="slider"
            @slide-change="(swiper) => onSlideChange(swiper, i)"
          >
            <SwiperSlide v-for="(slide, slideIndex) in slides" :key="slideIndex" class="slide">
              <div class="item hover-card">
                <NuxtImg class="image" src="/images/OurProducts/1.png" alt="Бани" format="webp" />
                <p class="text-24 text-white">{{ productTitle }}</p>
                <p class="text-16 text-white">
                  Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен
                  козырек над входом.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="slider-controls">
            <button :class="`swiper-button-prev-our-products-${i}`" type="button">
              <IconsArrowLeftWhite />
            </button>
            <p class="text-18">{{ (currentSlides[i] ?? 0) + 1 }} / {{ slides.length }}</p>
            <button :class="`swiper-button-next-our-products-${i}`" type="button">
              <IconsArrowRightWhite />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import IconsArrowLeftWhite from '../../Icons/ArrowLeftWhite.vue'
import IconsArrowRightWhite from '../../Icons/ArrowRightWhite.vue'

const modules = [Navigation]

const slides = Array(5).fill(null) // 5 слайдов с одной картинкой
const currentSlides = ref({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
})

const selected = ref('бани')

const onSlideChange = (swiper, index) => {
  currentSlides.value[index] = swiper.activeIndex
}

const items = [
  {
    label: 'Бани',
    value: 'бани',
  },
  {
    label: 'Беседки',
    value: 'беседки',
  },
  {
    label: 'Веранды',
    value: 'веранды',
  },
  {
    label: 'Мягкие окна',
    value: 'мягкие окна',
  },
  {
    label: 'Садовая мебель',
    value: 'садовая мебель',
  },
  {
    label: 'Сваи',
    value: 'сваи',
  },
]

const productTitles = {
  бани: 'Баня бочка',
  беседки: 'Беседка',
  веранды: 'Веранда',
  'мягкие окна': 'Мягкие окна',
  'садовая мебель': 'Садовая мебель',
  сваи: 'Сваи',
}

const productTitle = computed(() => {
  return productTitles[selected.value] || 'Товар'
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 60px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    border-radius: 10px;
    background: $white;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    &.selected {
      background: $text;
      color: $white;
    }
  }
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 20px;

  .product-item {
    position: relative;
    aspect-ratio: 688 / 481;
    width: 100%;

    .slider-wrapper {
      aspect-ratio: 688 / 481;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .slider {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      :deep(.swiper-wrapper) {
        width: 100%;
        height: 100%;
        display: flex;
      }

      :deep(.swiper-slide) {
        width: 100% !important;
        height: 100% !important;
        flex-shrink: 0;
        display: flex;
        align-items: stretch;
      }

      .slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-shrink: 0;

        .item {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px;
          gap: 10px;

          * {
            position: relative;
            z-index: 2;
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

          .text-16 {
            max-width: 249px;
          }
        }
      }
    }

    .slider-controls {
      position: absolute;
      bottom: 24px;
      right: 22px;
      display: flex;
      align-items: center;
      gap: 20px;
      z-index: 10;

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .text-18 {
        color: $white;
      }
    }
  }
}
</style>
