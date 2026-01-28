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
        :loop="true"
        :breakpoints="breakpoints"
        class="slider"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(slideGroup, index) in slideGroups" :key="index" class="slide">
          <div class="slide-content">
            <NuxtLink
              v-for="(item, itemIndex) in slideGroup"
              :key="item.id || itemIndex"
              :to="productLink(item)"
              class="item hover-card"
            >
              <NuxtImg class="image" :src="getImage(item)" :alt="item.title" format="webp" />
              <p class="text-24 text-white">{{ item.title }}</p>
              <p class="text-14 text-white">{{ item.description }}</p>
              <p class="text-24 text-white">{{ formatPrice(getPrice(item)) }}</p>
            </NuxtLink>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]

const placeholderImage = '/images/Popular/1.png'
const { data: productsResponse } = await useAsyncData('popular-products', () =>
  $fetch('/api/products'),
)

const items = computed(() => {
  const products = productsResponse.value?.products ?? []
  return products.filter((product) => product.isPopular)
})

const isMobile = ref(false)

const updateIsMobile = () => {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', updateIsMobile)
})

const slideGroups = computed(() => {
  const chunkSize = isMobile.value ? 1 : 4
  const groups = []
  for (let i = 0; i < items.value.length; i += chunkSize) {
    groups.push(items.value.slice(i, i + chunkSize))
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
  currentSlide.value = swiper.realIndex
}

const productLink = (product) => {
  const categorySlug = product.category?.slug
  if (categorySlug && product.slug) return `/catalog/${categorySlug}/${product.slug}`
  return '/catalog'
}

const getImage = (product) => {
  if (product.images?.length) return product.images[0].url
  return placeholderImage
}

const getPrice = (product) => {
  if (!product.sizes?.length) return 0
  return product.sizes[0].price ?? 0
}

const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
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
