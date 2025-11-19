<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <section class="contacts">
        <div class="contacts__container">
          <div class="contacts__grid">
            <div class="contacts__left">
              <h1 class="contacts__title">Контакты</h1>

              <p class="contacts__lead text-36">
                Бани 21 века – производитель и поставщик садовых построек и мебели
              </p>

              <ul class="contacts__list">
                <li class="contacts__item">
                  <IconsContactsPhone
                    class="contacts__icon contacts__icon--phone"
                    aria-hidden="true"
                  />
                  <a href="tel:+79137668115" class="contacts__link text-18">+7(913) 766-81-15</a>
                </li>
                <li class="contacts__item">
                  <IconsContactsMail
                    class="contacts__icon contacts__icon--email"
                    aria-hidden="true"
                  />
                  <a href="mailto:info@bani21veka.ru" class="contacts__link text-18"
                    >info@bani21veka.ru</a
                  >
                </li>
                <li class="contacts__item">
                  <IconsContactsTG class="contacts__icon contacts__icon--tg" aria-hidden="true" />
                  <a
                    href="https://t.me/bani21veka"
                    target="_blank"
                    rel="noopener"
                    class="contacts__link text-18"
                    >@bani21veka</a
                  >
                </li>
                <li class="contacts__item">
                  <IconsContactsWhatsapp
                    class="contacts__icon contacts__icon--wa"
                    aria-hidden="true"
                  />
                  <a
                    href="https://wa.me/79137668115"
                    target="_blank"
                    rel="noopener"
                    class="contacts__link text-18"
                    >+7(913) 766-81-15</a
                  >
                </li>
              </ul>

              <p class="contacts__desc text-16">
                Оказываем услуги по проектированию, постройке и&nbsp;поставке садовых объектов.
              </p>

              <h2 class="contacts__subtitle">Реквизиты</h2>

              <div class="contacts__requisites">
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">Наименование:</span>
                  <span class="contacts__req-value text-16">ООО «Бани 21 века»</span>
                </div>
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">Юридический адрес:</span>
                  <span class="contacts__req-value text-16"
                    >350059, Россия, г. Москва, проспект Путина, 39</span
                  >
                </div>
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">ОГРН:</span>
                  <span class="contacts__req-value text-16">8948651646515</span>
                </div>
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">ОКПО:</span>
                  <span class="contacts__req-value text-16">15143540</span>
                </div>
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">ИНН:</span>
                  <span class="contacts__req-value text-16">684515465131</span>
                </div>
                <div class="contacts__req-row">
                  <span class="contacts__req-label text-16 muted">КПП:</span>
                  <span class="contacts__req-value text-16">53415646854</span>
                </div>
              </div>
            </div>

            <div class="contacts__right">
              <NuxtImg class="contacts__map" src="/images/Map.png" alt="Карта" format="webp" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.contacts {
  background: $background;

  &__container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 32px 100px;
  }

  &__breadcrumbs {
    margin-bottom: 24px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 688px;
    gap: 56px;
    align-items: start;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    font-family: Gilroy;
    color: $text;
    font-size: 91px;
    font-weight: 900;
    line-height: 1.1;
    text-transform: uppercase;
    margin: 0;
  }

  &__lead {
    color: $text;
    max-width: 551px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 12px 30px;
    margin: 10px 0 0;
    padding: 0;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    width: 22px;
    height: 22px;
    position: relative;
  }

  &__link {
    color: #000;
  }

  &__desc {
    color: #000;
    max-width: 463px;
    margin-top: 8px;
  }

  &__subtitle {
    font-family: Gilroy;
    color: $text;
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    margin-top: 20px;
  }

  &__requisites {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    max-width: 720px;
  }

  &__req-row {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 24px;
  }

  &__req-label {
    color: #aaaaaa;
  }

  &__req-value {
    color: #000;
  }

  &__right {
    width: 100%;
  }

  &__map {
    display: block;
    width: 100%;
    height: 669px;
    border-radius: 15px;
    object-fit: cover;
  }
}
</style>
