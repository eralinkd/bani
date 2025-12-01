<template>
  <div class="container">
    <div class="left">
      <h2>Контакты</h2>
      <p class="text-36">Бани 21 века – производитель и поставщик садовых построек и мебели</p>
      <div class="contacts-grid">
        <a href="tel:+79374011990" target="_blank" class="item">
          <IconsContactsPhone />
          <p class="text-18">+7 (937) 401 19 90</p>
        </a>
        <a href="https://t.me/bani21veka" target="_blank" class="item">
          <IconsContactsTG />
          <p class="text-18">@bani21veka</p>
        </a>
        <a href="mailto:info@bani21veka.ru" target="_blank" class="item">
          <IconsContactsMail />
          <p class="text-18">info@bani21veka.ru</p>
        </a>
        <a href="https://wa.me/79251375856" target="_blank" class="item">
          <IconsContactsWhatsapp />
          <p class="text-18">+7 (925) 137-58-56</p>
        </a>
      </div>
      <p class="text-16">
        Оказываем услуги по проектированию, постройке и поставке садовых объектов.
      </p>
      <UIButton @click="navigateTo('/contacts#requisites')">Реквизиты</UIButton>
    </div>

    <div class="right">
      <div class="map">
        <iframe
          class="image"
          src="https://yandex.ru/map-widget/v1/?ll=37.683562%2C55.755819&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjM5MxIa0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAiCg14eBZCFfUFX0I%2C&sll=30.547764%2C50.449247&sspn=0.480652%2C0.183481&text=350059%2C%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9F%D1%83%D1%82%D0%B8%D0%BD%D0%B0%2C%2039&z=12"
          allowfullscreen="true"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }

  .left {
    h2 {
      max-width: 568px;
    }
    .text-36 {
      max-width: 551px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .text-16 {
      max-width: 463px;
      margin-top: 20px;
      margin-bottom: 40px;
      color: #000;

      @media (max-width: $mobileBreakpoint) {
        margin-bottom: 20px;
      }
    }

    .contacts-grid {
      max-width: 551px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 15px;
      column-gap: 40px;

      @media (max-width: $mobileBreakpoint) {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
  }

  .right {
    .map {
      .image {
        display: block;
        width: 100%;
        height: 100%;
        aspect-ratio: 688 / 497;
      }
    }
  }
}
</style>
