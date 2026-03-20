<template>
  <div class="container">
    <div class="left">
      <h2>Контакты</h2>
      <p class="text-36">Бани 21 века – производитель и поставщик садовых построек и мебели</p>
      <div class="contacts-grid">
        <a href="tel:+79361226688" target="_blank" class="item">
          <IconsContactsPhone />
          <p class="text-18">+7 (936) 122 66 88</p>
        </a>
        <a href="mailto:info@bani21veka.ru" target="_blank" class="item">
          <IconsContactsMail />
          <p class="text-18">info@bani21veka.ru</p>
        </a>
        <a
          href="https://max.ru/u/f9LHodD0cOKjZx-VqJ7AY9a3Ihlo_T5LB8c44JXGQ_Nie8Yf2UeaSfp3Pc0"
          target="_blank"
          rel="noopener"
          class="item"
        >
          <img src="/max.png" alt="Max" width="22" height="22" />
          <p class="text-18">Max</p>
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
          src="https://yandex.ru/map-widget/v1/?ll=45.380579%2C52.893565&pt=45.380579%2C52.893565&z=16&l=map"
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
