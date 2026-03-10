<template>
  <div :key="projectId">
    <AppHeader />
    <main>
      <Breadcrumbs />
      <div class="project-page">
        <section class="hero">
          <div class="hero-image">
            <NuxtImg
              v-if="firstImage"
              class="image"
              :src="firstImage"
              :alt="project?.title"
              format="webp"
            />
            <div class="hero-overlay">
              <h1 class="hero-title">{{ project?.title }}</h1>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="left">
            <p class="headline">{{ project?.description }}</p>
          </div>
          <div class="right">
            <div class="slider-wrapper">
              <Swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="0"
                :navigation="{
                  nextEl: '.swiper-button-next-project',
                  prevEl: '.swiper-button-prev-project',
                }"
                :loop="true"
                class="slider"
                @slide-change="onSlideChange"
              >
                <SwiperSlide v-for="(slide, index) in slides" :key="index" class="slide">
                  <div class="slide-item">
                    <NuxtImg
                      class="image"
                      :src="slide.url"
                      :alt="`${project?.title} - фото ${index + 1}`"
                      format="webp"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
              <div class="slider-controls">
                <button class="swiper-button-prev-project" type="button" aria-label="Назад">
                  <IconsArrowLeft />
                </button>
                <p class="text-18">{{ currentSlide + 1 }} / {{ slides.length }}</p>
                <button class="swiper-button-next-project" type="button" aria-label="Вперёд">
                  <IconsArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]
const route = useRoute()
const projectId = computed(() => String(route.params.id || ''))

const { data: projectResponse } = await useAsyncData(
  () => `project-${projectId.value}`,
  () => $fetch(`/api/project/${projectId.value}`),
  { watch: [projectId] }
)

const project = computed(() => projectResponse.value?.project ?? null)

const slides = computed(() => {
  const imgs = project.value?.images ?? []
  if (imgs.length) return imgs
  return [{ url: '/images/OurProducts/1.png' }]
})

const firstImage = computed(() => slides.value[0]?.url ?? '/images/OurProducts/1.png')

const currentSlide = ref(0)

function onSlideChange(swiper) {
  currentSlide.value = swiper.realIndex
}

if (!project.value && projectResponse.value !== undefined) {
  throw createError({ statusCode: 404, statusMessage: 'Проект не найден' })
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.project-page {
  padding: 0 60px 60px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 16px 40px;
  }
}

.hero {
  margin-bottom: 40px;

  @media (max-width: $mobileBreakpoint) {
    margin-bottom: 24px;
  }

  .hero-image {
    position: relative;
    width: 100%;
    aspect-ratio: 1920 / 600;
    border-radius: 20px;
    overflow: hidden;

    @media (max-width: $mobileBreakpoint) {
      aspect-ratio: 328 / 220;
      border-radius: 24px;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40px 60px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);

      @media (max-width: $mobileBreakpoint) {
        padding: 24px 20px;
      }
    }

    .hero-title {
      margin: 0;
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      color: #fff;
      text-transform: uppercase;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

      @media (max-width: $mobileBreakpoint) {
        font-size: 24px;
      }
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .left {
    .headline {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.5;
      color: #41424c;

      @media (max-width: $mobileBreakpoint) {
        font-size: 16px;
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
        aspect-ratio: 328 / 240;
      }
    }

    .slider {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      border-radius: 20px;

      @media (max-width: $mobileBreakpoint) {
        border-radius: 24px;
      }

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
      }

      .slide {
        width: 100%;
        height: 100%;

        .slide-item {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;

          @media (max-width: $mobileBreakpoint) {
            border-radius: 24px;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
  }
}
</style>
