<template>
  <div class="container">
    <h2>
      Популярные <br />
      товары
    </h2>
    <div class="slider-wrapper">
      <Swiper
        :modules="modules"
        :space-between="32"
        :navigation="{
          nextEl: '.swiper-button-next-popular',
          prevEl: '.swiper-button-prev-popular',
        }"
        :breakpoints="breakpoints"
        class="slider"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(slideGroup, index) in slideGroups" :key="index" class="slide">
          <div class="slide-content">
            <div v-for="(item, itemIndex) in slideGroup" :key="itemIndex" class="item hover-card">
              <NuxtImg class="image" :src="item.image" :alt="item.title" format="webp" />
              <p class="text-24 text-white">{{ item.title }}</p>
              <p class="text-14 text-white">{{ item.description }}</p>
              <p class="text-24 text-white">{{ item.price }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="controls">
      <UIButton @click="navigateTo('/catalog')">В каталог</UIButton>
      <div class="slider-controls">
        <button class="swiper-button-prev-popular" type="button">
          <IconsArrowLeft />
        </button>
        <p class="text-18">{{ currentSlide + 1 }} / {{ slideGroups.length }}</p>
        <button class="swiper-button-next-popular" type="button">
          <IconsArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]

const items = Array.from({ length: 20 }, (_, index) => {
  const imageIndex = (index % 4) + 1
  return {
    image: `/images/Popular/${imageIndex}.png`,
    title: 'Баня бочка',
    description:
      'Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над входом.',
    price: '858 000 ₽',
  }
})

const slideGroups = computed(() => {
  const groups = []
  for (let i = 0; i < items.length; i += 4) {
    groups.push(items.slice(i, i + 4))
  }
  return groups
})

const currentSlide = ref(0)

const breakpoints = {
  769: {
    slidesPerView: 1,
    spaceBetween: 32,
  },
  320: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
}

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.activeIndex
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 32px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 20px;

    h2 {
      font-size: 50px;
    }
  }
}

.slider-wrapper {
  margin-top: 20px;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 10px;
  }
}

.slider {
  width: 100%;
  overflow: visible;

  :deep(.swiper-wrapper) {
    display: flex;
  }

  :deep(.swiper-slide) {
    height: auto;
    flex-shrink: 0;
  }

  .slide {
    width: 100%;
    height: auto;

    .slide-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      width: 100%;

      @media (max-width: $mobileBreakpoint) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    .item {
      border-radius: 20px;
      aspect-ratio: 328 / 481;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      padding: 20px 50px 20px 20px;
      width: 100%;
      height: 100%;

      p {
        position: relative;
        z-index: 1;
        margin-bottom: 10px;
      }

      .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 30px;
    flex-direction: column-reverse;
    align-items: center;
    gap: 20px;
  }

  .slider-controls {
    display: flex;
    align-items: center;
    gap: 20px;

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
      color: $text-secondary;
    }
  }
}
</style>
