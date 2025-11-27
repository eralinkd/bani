<template>
  <div id="reviews" class="container">
    <div class="left">
      <h2>Отзывы</h2>
      <p class="text-36">
        Почему клиенты <br />
        возвращаются именно к нам
      </p>
      <div class="icons">
        <a href="#" target="_blank">
          <ReviewsIcons2gis />
        </a>
        <a href="#" target="_blank">
          <ReviewsIconsGoogle />
        </a>
        <a href="#" target="_blank">
          <ReviewsIconsYandex />
        </a>
      </div>
      <UIButton>Прочитать все отзывы</UIButton>
    </div>
    <div class="right">
      <div class="slider-wrapper">
        <Swiper
          :modules="modules"
          :space-between="12"
          :navigation="{
            nextEl: '.swiper-button-next-reviews',
            prevEl: '.swiper-button-prev-reviews',
          }"
          :loop="true"
          :breakpoints="breakpoints"
          class="slider"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="(slideGroup, index) in slideGroups" :key="index" class="slide">
            <div class="slide-content">
              <div
                v-for="(review, reviewIndex) in slideGroup"
                :key="reviewIndex"
                class="review-card"
              >
                <div class="header">
                  <div class="avatar" aria-hidden="true"></div>
                  <div class="meta">
                    <div class="name">{{ review.name }}</div>
                    <div class="date">{{ review.date }}</div>
                  </div>
                </div>
                <p class="content">{{ review.content }}</p>
                <div class="footer">
                  <ReviewsIcons2gisGrey />
                  <div class="stars" aria-label="Оценка 5 из 5">
                    <ReviewsIconsStar />
                    <ReviewsIconsStar />
                    <ReviewsIconsStar />
                    <ReviewsIconsStar />
                    <ReviewsIconsStar />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="slider-controls">
        <button class="swiper-button-prev-reviews" type="button">
          <IconsArrowLeft />
        </button>
        <p class="text-18">{{ currentSlide + 1 }} / {{ slideGroups.length }}</p>
        <button class="swiper-button-next-reviews" type="button">
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

const reviews = [
  {
    name: 'Анна Кондрашова',
    date: '30 июля 2025',
    content:
      'Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее. Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде не течёт, пар держит отлично. Спасибо за качественную работу!',
  },
  {
    name: 'Татьяна Голованова',
    date: '18 июля 2025',
    content:
      'Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна, подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось даже лучше, чем на визуализации!',
  },
  {
    name: 'Анна Кондрашова',
    date: '30 июля 2025',
    content:
      'Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее. Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде не течёт, пар держит отлично. Спасибо за качественную работу!',
  },
  {
    name: 'Татьяна Голованова',
    date: '18 июля 2025',
    content:
      'Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна, подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось даже лучше, чем на визуализации!',
  },
  {
    name: 'Анна Кондрашова',
    date: '30 июля 2025',
    content:
      'Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее. Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде не течёт, пар держит отлично. Спасибо за качественную работу!',
  },
  {
    name: 'Татьяна Голованова',
    date: '18 июля 2025',
    content:
      'Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна, подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось даже лучше, чем на визуализации!',
  },
  {
    name: 'Анна Кондрашова',
    date: '30 июля 2025',
    content:
      'Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее. Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде не течёт, пар держит отлично. Спасибо за качественную работу!',
  },
  {
    name: 'Татьяна Голованова',
    date: '18 июля 2025',
    content:
      'Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна, подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось даже лучше, чем на визуализации!',
  },
  {
    name: 'Анна Кондрашова',
    date: '30 июля 2025',
    content:
      'Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее. Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде не течёт, пар держит отлично. Спасибо за качественную работу!',
  },
  {
    name: 'Татьяна Голованова',
    date: '18 июля 2025',
    content:
      'Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна, подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось даже лучше, чем на визуализации!',
  },
]

const slideGroups = computed(() => {
  const groups = []
  for (let i = 0; i < reviews.length; i += 2) {
    groups.push(reviews.slice(i, i + 2))
  }
  return groups
})

const currentSlide = ref(0)

const breakpoints = {
  769: {
    slidesPerView: 1,
    spaceBetween: 12,
  },
  320: {
    slidesPerView: 1,
    spaceBetween: 12,
  },
}

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.realIndex
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  .left {
    .text-36 {
      margin-top: 10px;
      margin-bottom: 40px;
    }

    .icons {
      display: flex;
      gap: 10px;
      margin-bottom: 40px;
    }
  }

  .right {
    height: fit-content;
    position: relative;
    width: 100%;

    .slider-wrapper {
      width: 100%;
      overflow: hidden;
      position: relative;
    }

    .slider {
      width: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;

      :deep(.swiper-wrapper) {
        display: flex;
        width: 100%;
        align-items: stretch;
      }

      :deep(.swiper-slide) {
        width: 100% !important;
        height: auto;
        flex-shrink: 0;
        box-sizing: border-box;
        display: flex;
        align-items: stretch;
      }

      .slide {
        width: 100% !important;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        .slide-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          flex: 1;

          @media (max-width: $mobileBreakpoint) {
            grid-template-columns: 1fr;
          }
        }
      }
    }

    .slider-controls {
      position: absolute;
      right: 0;
      bottom: -50px;
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

    .review-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 20px;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(180deg, #d9d9d9 0%, #c7c7c7 100%);
          flex: 0 0 auto;
        }

        .meta {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: 600;
            font-size: 18px;
            line-height: 1.5;
            color: #000000;
          }
          .date {
            font-size: 14px;
            line-height: 1.5;
            color: #8e8e8e;
          }
        }
      }

      .content {
        font-size: 16px;
        line-height: 1.5;
        color: #000000;
        margin-bottom: 16px;
      }

      .footer {
        display: flex;
        align-items: center;
        gap: 12px;

        .stars {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 18px;
        }
      }
    }
  }
}
</style>
