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

    <section v-if="galleryUrls.length" class="works-gallery" aria-label="Галерея работ">
      <h2 style="margin-bottom: 20px">Галерея</h2>
      <div class="works-gallery__grid">
        <button
          v-for="(url, i) in visibleGalleryImages"
          :key="`${url}-${i}`"
          type="button"
          class="works-gallery__cell"
          :aria-label="`Открыть фото ${i + 1} из ${galleryUrls.length}`"
          @click="openLightbox(i)"
        >
          <NuxtImg class="works-gallery__img" :src="url" alt="" format="webp" />
        </button>
      </div>
      <div v-if="showGalleryMore" class="works-gallery__more-wrap">
        <UIButton
          secondary
          icon-position="none"
          :show-icon="false"
          @click="galleryVisibleRows += galleryRowsStep"
        >
          Ещё
        </UIButton>
      </div>
    </section>
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
const projectGallery = computed(() => {
  const raw = projectsResponse.value?.projectGallery
  return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
})

const currentSlides = ref({})
const selected = ref('')

const galleryCols = 4
const galleryRowsInitial = 2
const galleryRowsStep = 2
const galleryVisibleRows = ref(galleryRowsInitial)

const galleryUrls = computed(() => {
  const id = selected.value
  if (!id) return []
  const raw = projectGallery.value[id]
  if (!Array.isArray(raw)) return []
  return raw.map((u) => String(u ?? '').trim()).filter(Boolean)
})

const visibleGalleryImages = computed(() => {
  const max = galleryVisibleRows.value * galleryCols
  return galleryUrls.value.slice(0, max)
})

const showGalleryMore = computed(() => visibleGalleryImages.value.length < galleryUrls.value.length)

watch(selected, () => {
  galleryVisibleRows.value = galleryRowsInitial
})

async function openLightbox(sliceIndex) {
  if (!import.meta.client || !galleryUrls.value.length) return
  const [{ default: PhotoSwipe }] = await Promise.all([
    import('photoswipe'),
    import('photoswipe/style.css'),
  ])
  const dataSource = galleryUrls.value.map((src) => ({
    src,
    alt: 'Наши работы',
  }))
  const pswp = new PhotoSwipe({
    dataSource,
    index: sliceIndex,
  })
  pswp.init()
}

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
  if (project.images?.length) {
    return project.images.map((img) => (typeof img === 'string' ? { url: img } : img))
  }
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

.works-gallery {
  margin-top: 48px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 32px;
  }

  &__title {
    margin: 0 0 20px;
    font-weight: 600;
    color: $text;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 16px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }

  &__cell {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #e8e8e8;
    border-radius: 4px;

    &:focus-visible {
      outline: 2px solid $text;
      outline-offset: 2px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease;

    .works-gallery__cell:hover & {
      transform: scale(1.03);
    }
  }

  &__more-wrap {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    @media (max-width: $mobileBreakpoint) {
      margin-top: 20px;
    }
  }
}
</style>
