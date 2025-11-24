<template>
  <div class="container white">
    <div class="left">
      <h2>Уже построили</h2>
      <p class="text-36">
        Оцените наше мастерство и вдохновитесь примерами реальных работ, выполненных для наших
        клиентов.
      </p>
      <UIButton>В каталог</UIButton>
    </div>
    <div class="right">
      <div class="slider-wrapper">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="0"
          :navigation="{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }"
          class="slider"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="(slide, index) in slides" :key="index" class="slide">
            <div class="item hover-card">
              <NuxtImg
                class="image"
                src="/images/ProjectsSlider/1.png"
                alt="Проект"
                format="webp"
              />
              <p class="text-16">Баня бочка в Пензе</p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="slider-controls">
          <button class="swiper-button-prev-custom" type="button">
            <IconsArrowLeft />
          </button>
          <p class="text-18">{{ currentSlide + 1 }} / {{ slides.length }}</p>
          <button class="swiper-button-next-custom" type="button">
            <IconsArrowRight />
          </button>
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

const modules = [Navigation]

const slides = Array(5).fill(null) // 5 слайдов с одной картинкой
const currentSlide = ref(0)

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.activeIndex
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 50px 60px 50px 60px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 130px;
    grid-template-columns: 1fr;
    padding: 40px 20px;
    gap: 40px;
  }

  .text-36 {
    margin-top: 10px;
    margin-bottom: 40px;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 20px;
    }
  }
}

.right {
  position: relative;

  .slider-wrapper {
    aspect-ratio: 688 / 485;
    width: 100%;
    position: relative;

    @media (max-width: $mobileBreakpoint) {
      aspect-ratio: 333/474;
    }
  }

  .slider {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    :deep(.swiper-wrapper) {
      width: 100%;
      height: 100%;
      display: flex;
    }

    :deep(.swiper-slide) {
      width: 100% !important;
      height: 100% !important;
      display: flex;
      align-items: stretch;
      flex-shrink: 0;
    }

    .slide {
      width: 100%;
      height: 100%;
      display: flex;
      flex-shrink: 0;

      .item {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 20px;

        @media (max-width: $mobileBreakpoint) {
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      display: block;
      flex-shrink: 0;
    }

    .text-16 {
      color: $white;
      position: absolute;
      bottom: 40px;
      left: 40px;

      @media (max-width: $mobileBreakpoint) {
        bottom: 10px;
        left: 22px;
      }
    }
  }
}

.slider-controls {
  position: absolute;
  right: 0;
  bottom: -43px;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;

  @media (max-width: $mobileBreakpoint) {
    position: static;
    margin-top: 20px;
    justify-content: center;
  }

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
</style>
