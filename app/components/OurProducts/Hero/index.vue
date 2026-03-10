<template>
  <div class="container">
    <div class="filters">
      <div
        v-for="item in items"
        :key="item.id"
        class="item text-16"
        :class="{ selected: selected === item.id }"
        @click="selected = item.id"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="products">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="product-item"
        @click="() => navigateTo(`/our-products/${project.id}`, { replace: false })"
      >
        <div class="slider-wrapper">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="0"
            :navigation="{
              nextEl: `.swiper-button-next-our-products-${project.id}`,
              prevEl: `.swiper-button-prev-our-products-${project.id}`,
            }"
            :loop="true"
            class="slider"
            @slide-change="(swiper) => onSlideChange(swiper, project.id)"
          >
            <SwiperSlide
              v-for="(slide, slideIndex) in getSlides(project)"
              :key="slideIndex"
              class="slide"
            >
              <div class="item hover-card">
                <NuxtImg class="image" :src="slide.url" alt="Проект" format="webp" />
                <p class="text-24 text-white">{{ project.title }}</p>
                <p class="text-16 text-white">
                  {{ project.description }}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="slider-controls" @click.stop>
            <button :class="`swiper-button-prev-our-products-${project.id}`" type="button">
              <IconsArrowLeftWhite />
            </button>
            <p class="text-18">
              {{ (currentSlides[project.id] ?? 0) + 1 }} / {{ getSlides(project).length }}
            </p>
            <button :class="`swiper-button-next-our-products-${project.id}`" type="button">
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

const placeholderImage = '/images/OurProducts/1.png'
const { data: projectsResponse } = await useAsyncData('projects', () => $fetch('/api/projects'))

const items = computed(() => projectsResponse.value?.projectCategories ?? [])
const projects = computed(() => projectsResponse.value?.projects ?? [])

const currentSlides = ref({})
const selected = ref('')

watchEffect(() => {
  if (!selected.value && items.value.length) {
    selected.value = items.value[0].id
  }
})

const onSlideChange = (swiper, id) => {
  currentSlides.value[id] = swiper.realIndex
}

const filteredProjects = computed(() => {
  if (!selected.value) return projects.value
  return projects.value.filter((project) => project.categoryId === selected.value)
})

const getSlides = (project) => {
  if (project.images?.length) return project.images
  return [{ url: placeholderImage }]
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 60px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 16px 40px;
  }
}

.filters {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;

  @media (max-width: $mobileBreakpoint) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }

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

    @media (max-width: $mobileBreakpoint) {
      border-radius: 12px;
      padding: 12px 18px;
      justify-content: flex-start;
    }
  }
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 20px;

  @media (max-width: $mobileBreakpoint) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .product-item {
    position: relative;
    aspect-ratio: 688 / 481;
    cursor: pointer;
    display: block;
    width: 100%;

    @media (max-width: $mobileBreakpoint) {
      aspect-ratio: auto;
    }

    .slider-wrapper {
      aspect-ratio: 688 / 481;
      width: 100%;
      position: relative;
      overflow: hidden;

      @media (max-width: $mobileBreakpoint) {
        aspect-ratio: 328 / 220;
        border-radius: 20px;
      }
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

          @media (max-width: $mobileBreakpoint) {
            padding: 20px;
            border-radius: 24px;
            gap: 8px;
          }

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

            @media (max-width: $mobileBreakpoint) {
              max-width: 100%;
              font-family: Inter;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 125%; /* 17.5px */
            }
          }

          .text-24 {
            @media (max-width: $mobileBreakpoint) {
              font-family: Inter;
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
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

      @media (max-width: $mobileBreakpoint) {
        position: static;
        margin-top: 12px;
        justify-content: flex-start;
        gap: 16px;
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
        color: $white;
      }
    }
  }
}
</style>
