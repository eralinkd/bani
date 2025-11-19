<template>
  <div class="container">
    <div class="left">
      <h2>Контакты</h2>
      <p class="text-36">Бани 21 века – производитель и поставщик садовых построек и мебели</p>
      <div class="contacts-grid">
        <a href="tel:+79137668115" target="_blank" class="item">
          <IconsContactsPhone />
          <p class="text-18">+7(913) 766-81-15</p>
        </a>
        <a href="https://t.me/bani21veka" target="_blank" class="item">
          <IconsContactsTG />
          <p class="text-18">@bani21veka</p>
        </a>
        <a href="mailto:info@bani21veka.ru" target="_blank" class="item">
          <IconsContactsMail />
          <p class="text-18">info@bani21veka.ru</p>
        </a>
        <a href="https://wa.me/79137668115" target="_blank" class="item">
          <IconsContactsWhatsapp />
          <p class="text-18">+7(913) 766-81-15</p>
        </a>
      </div>
      <p class="text-16">
        Оказываем услуги по проектированию, постройке и поставке садовых объектов.
      </p>
      <UIButton>Реквизиты</UIButton>
    </div>

    <div class="right">
      <div class="map">
        <NuxtImg class="image" src="/images/MainContacts/map.png" alt="Карта" format="webp" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding-left: 60px;

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
    }

    .contacts-grid {
      max-width: 551px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 15px;
      column-gap: 40px;

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
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
