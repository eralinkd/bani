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
                  <a href="tel:+79374011990" class="contacts__link text-18">+7 (937) 401 19 90</a>
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
                    href="https://wa.me/79251375856"
                    target="_blank"
                    rel="noopener"
                    class="contacts__link text-18"
                    >+7 (925) 137-58-56</a
                  >
                </li>
              </ul>

              <p class="contacts__desc text-16">
                Оказываем услуги по проектированию, постройке и&nbsp;поставке садовых объектов.
              </p>

              <h2 id="requisites" class="contacts__subtitle">Реквизиты</h2>

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
              <div style="position: relative; overflow: hidden">
                <a
                  href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
                  style="color: #eee; font-size: 12px; position: absolute; top: 0px"
                  >Москва</a
                ><a
                  href="https://yandex.ru/maps/geo/moskva/53166393/?ll=37.683562%2C55.755819&mode=search&sll=30.547764%2C50.449247&sspn=0.480652%2C0.183481&text=350059%2C%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9F%D1%83%D1%82%D0%B8%D0%BD%D0%B0%2C%2039&utm_medium=mapframe&utm_source=maps&z=12"
                  style="color: #eee; font-size: 12px; position: absolute; top: 14px"
                  >Москва — Яндекс Карты</a
                ><iframe
                  class="contacts__map"
                  src="https://yandex.ru/map-widget/v1/?ll=37.683562%2C55.755819&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjM5MxIa0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAiCg14eBZCFfUFX0I%2C&sll=30.547764%2C50.449247&sspn=0.480652%2C0.183481&text=350059%2C%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9F%D1%83%D1%82%D0%B8%D0%BD%D0%B0%2C%2039&z=12"
                  allowfullscreen="true"
                  frameborder="0"
                ></iframe>
              </div>
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

    @media (max-width: $mobileBreakpoint) {
      padding: 0 16px 60px;
    }
  }

  &__breadcrumbs {
    margin-bottom: 24px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 688px;
    gap: 56px;
    align-items: start;

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: $mobileBreakpoint) {
      gap: 16px;
    }
  }

  &__title {
    font-family: Gilroy;
    color: $text;
    font-size: 91px;
    font-weight: 900;
    line-height: 1.1;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: $mobileBreakpoint) {
      font-size: 48px;
      line-height: 110%;
    }
  }

  &__lead {
    color: $text;
    max-width: 551px;

    @media (max-width: $mobileBreakpoint) {
      font-size: 18px;
      line-height: 140%;
      max-width: 100%;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 12px 30px;
    margin: 10px 0 0;
    padding: 0;

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: 1fr;
      gap: 12px;
    }
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

    @media (max-width: $mobileBreakpoint) {
      font-size: 14px;
      line-height: 140%;
      max-width: 100%;
    }
  }

  &__subtitle {
    font-family: Gilroy;
    color: $text;
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    margin-top: 20px;

    @media (max-width: $mobileBreakpoint) {
      font-size: 28px;
    }
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

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: 1fr;
      gap: 6px;
    }
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

    @media (max-width: $mobileBreakpoint) {
      height: 320px;
    }
  }
}
</style>
