<template>
  <div class="container main-hero">
    <div class="container white">
      <!-- seo header -->
      <h1 style="display: none">Бани и беседки под ключ</h1>
      <!-- actual description -->
      <div class="first-row">
        <p class="text-36">
          Строим <br />
          уникальные
        </p>
        <h2>Бани</h2>
      </div>
      <div class="second-row">
        <h2>и беседки</h2>
      </div>
      <div class="third-row">
        <h2>под ключ</h2>
      </div>
      <div class="btn-row">
        <UIButton @click="navigateTo('/catalog')">В каталог</UIButton>
        <p class="text-36">— наш профиль</p>
      </div>

      <div class="pros">
        <Swiper
          class="pros-slider"
          :modules="modules"
          :loop="true"
          :space-between="16"
          :slides-per-view="1"
          :autoplay="autoplayOptions"
          :observer="true"
          :observe-parents="true"
          :speed="550"
        >
          <SwiperSlide v-for="(item, index) in prosItems" :key="`about-hero-pros-${index}`">
            <div class="item">
              <NuxtImg class="img" :src="item.image" :alt="item.alt" format="webp" />
              <p class="text-48">{{ item.value }}</p>
              <p class="text-14">{{ item.description }}</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="mobile-image">
        <NuxtImg
          class="image"
          src="/images/About/hero-mobile.png"
          alt="Бани 21 века"
          format="webp"
        />
      </div>

      <div class="text-16">
        За 12 лет работы мы зарекомендовали себя как надежного поставщика садовых построек и мебели.
        География наших работ — это вся ральная часть России. <br /><br />

        Наши клиенты — это не только владельцы дачных участков, но и базы отдыха, оздоровительные
        центры, рестораны, летние кафе, детские лагеря и санатории.<br /><br />

        Сотрудники нашей компании за долгие годы сплотились в одну единую профессиональную команду.
        Поэтому мы гордимся качеством производимой нами продукции и точно в срок поставляем ее
        заказчику.
      </div>
    </div>
    <div class="container">
      <NuxtImg class="image" src="/images/About/hero.png" alt="Бани 21 века" format="webp" />
    </div>
  </div>
</template>

<script setup>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const modules = [Autoplay]

const autoplayOptions = {
  delay: 3500,
  disableOnInteraction: false,
}

const prosItems = [
  {
    image: '/images/MainHero/pros/1.png',
    alt: 'Объектов построено',
    value: '+300',
    description: 'Нами объектов построено',
  },
  {
    image: '/images/MainHero/pros/2.png',
    alt: 'Специалистов в одном проекте',
    value: '>15',
    description: 'Специалистов в одном проекте',
  },
  {
    image: '/images/MainHero/pros/3.png',
    alt: 'Лет минимальный стаж специалистов',
    value: '20',
    description: 'Лет минимальный стаж специалистов',
  },
]
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.main-hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    padding: 27px 10px 30px 10px;
    background-color: $white;

    h2 {
      font-size: 59px;
    }
  }

  .container.white {
    display: flex;
    justify-content: center;
    padding: 60px 120px 50px 60px;
    flex-direction: column;

    @media (max-width: $mobileBreakpoint) {
      padding: 0;
      background-color: transparent;
    }
  }
}

.image {
  position: relative;
  z-index: 2;
  width: calc(100% + 120px);
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  margin-left: -120px;

  @media (max-width: $mobileBreakpoint) {
    display: none;
    margin-left: 0;
    width: 100%;
    height: auto;
    border-radius: 10px;
    aspect-ratio: 373 / 345;
  }
}

.mobile-image {
  margin-top: 30px;
  display: none;

  @media (max-width: $mobileBreakpoint) {
    display: block !important;

    .image {
      display: block !important;
    }
  }
}

.first-row {
  display: flex;
  gap: 18px;
  justify-content: flex-end;

  @media (max-width: $mobileBreakpoint) {
    width: 95%;
    gap: 11px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    margin-left: auto;
    margin-top: 2px;
  }

  p {
    text-align: right;

    @media (max-width: $mobileBreakpoint) {
      font-size: 21px;
      margin-top: 2px;
    }
  }
}

.second-row {
  margin-top: 15px;
  margin-bottom: 5px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 3px;
    margin-bottom: 3px;
    width: 95%;
    text-align: center;
    margin-left: auto;
  }
}

.third-row {
  margin-bottom: 15px;

  @media (max-width: $mobileBreakpoint) {
    width: 95%;
    text-align: center;
    margin-left: auto;
  }
}

.btn-row {
  max-width: 530px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $mobileBreakpoint) {
    width: 90%;
    margin: auto;
    flex-direction: column-reverse;
    align-items: center;
    gap: 10px;

    p {
      display: none;
    }
  }
}

.pros {
  width: 100%;
  margin-top: 70px;
  margin-bottom: 20px;
}

.pros-slider {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  overflow: visible;

  :deep(.swiper-wrapper) {
    display: flex;
  }

  :deep(.swiper-slide) {
    height: auto;
    display: flex;
    overflow: visible;
  }
}

.pros .item {
  position: relative;
  height: 157px;
  padding: 28px 24px 40px;
  margin: 0 auto;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 20px;
  background: $background;
  gap: 6px;
  overflow: visible;
}

.pros .img {
  position: absolute;
  left: 50%;
  top: -37px;
  transform: translateX(-50%);
  width: 74px;
  height: 74px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.text-16 {
  margin-top: 40px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 10px;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
