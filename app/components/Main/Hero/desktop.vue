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
        <p class="text-36">с гарантией</p>
      </div>
      <div class="btn-row">
        <UIButton @click="navigateTo('/catalog')">В каталог</UIButton>
        <p class="text-36">с гарантией</p>
      </div>

      <div class="mobile-image">
        <NuxtImg class="image" src="/images/MainHero/image.png" alt="Бани 21 века" format="webp" />
      </div>

      <div class="pros">
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/1.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">+300</p>
          <p class="text-14">Нами объектов построено</p>
        </div>
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/2.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">>15</p>
          <p class="text-14">Специалистов в одном проекте</p>
        </div>
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/3.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">20</p>
          <p class="text-14">Лет минимальный стаж специалистов</p>
        </div>
      </div>
    </div>
    <div class="container">
      <NuxtImg
        class="image desktop"
        src="/images/MainHero/image.png"
        alt="Бани 21 века"
        format="webp"
      />
      <NuxtImg
        class="image mobile"
        src="/images/MainHero/image-mobile.png"
        alt="Бани 21 века"
        format="webp"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.desktop {
  display: block;
}

.mobile {
  display: none;
}

@media (max-width: $mobileBreakpoint) {
  .desktop {
    display: none !important;
  }

  .mobile {
    display: block !important;
  }
}

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
    padding: 60px 120px 0 60px;
    flex-direction: column;

    @media (max-width: $mobileBreakpoint) {
      padding: 0;
      background-color: transparent;
    }
  }

  .mobile-image {
    margin-top: 30px;
    display: none;
  }
}

.image {
  width: calc(100% + 120px);
  height: 100%;
  object-fit: cover;
  margin-left: -120px;

  @media (max-width: $mobileBreakpoint) {
    display: none;
    border-radius: 10px;
    aspect-ratio: 373/345;
    margin-left: 0;
    width: 100%;
    height: auto;
  }
}

.first-row {
  display: flex;
  gap: 18px;
  justify-content: flex-end;
  margin-bottom: -15px;

  @media (max-width: $mobileBreakpoint) {
    width: 95%;
    gap: 11px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    margin-left: auto;
    margin-top: 2px;
    margin-bottom: 0;
  }

  p {
    text-align: right;
    margin-top: 12px;

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
  .text-36 {
    display: none;
  }

  @media (max-width: $mobileBreakpoint) {
    width: 95%;
    text-align: center;
    margin-left: auto;

    .text-36 {
      text-align: right;
      padding-right: 30px;
      margin-left: auto;
      display: block;
    }
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
  max-width: 530px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 70px;

  @media (max-width: $mobileBreakpoint) {
    max-width: 90%;
    width: 100%;
    margin: 60px auto 0 auto;
    grid-template-columns: 1fr;
  }

  .item {
    position: relative;
    height: 157px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 20px;
    background: $background;
    gap: 3px;

    @media (max-width: $mobileBreakpoint) {
      align-items: center;
      padding-bottom: 37px;
      &:nth-child(2),
      &:nth-child(3) {
        display: none;
      }
    }
  }

  .img {
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    border-radius: 50%;

    @media (max-width: $mobileBreakpoint) {
      width: 74px;
      height: 74px;
      flex-shrink: 0;
    }
  }
}
</style>
