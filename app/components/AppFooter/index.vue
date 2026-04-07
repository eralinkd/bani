<template>
  <footer class="footer">
    <div class="footer__inner">
      <!-- Left: logo + description + socials -->
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo w-fit">
          <AppFooterLogo />
        </NuxtLink>
        <p class="footer__desc">Строим уникальные бани<br />и беседки под ключ</p>
        <div class="footer__socials">
          <a href="tel:+79361226688" aria-label="Телефон">
            <svg
              width="20"
              height="20"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4812 7.61458C12.1766 7.61458 11.9357 7.36667 11.9357 7.06917C11.9357 6.80708 11.6737 6.26167 11.2345 5.78708C10.8024 5.32667 10.3278 5.0575 9.93116 5.0575C9.62658 5.0575 9.38574 4.80958 9.38574 4.51208C9.38574 4.21458 9.63366 3.96667 9.93116 3.96667C10.6395 3.96667 11.3832 4.34917 12.0349 5.03625C12.6441 5.68083 13.0337 6.48125 13.0337 7.06208C13.0337 7.36667 12.7857 7.61458 12.4812 7.61458Z"
                fill="white"
              />
              <path
                d="M15.038 7.61458C14.7334 7.61458 14.4926 7.36666 14.4926 7.06916C14.4926 4.55458 12.4455 2.51458 9.93799 2.51458C9.63341 2.51458 9.39258 2.26666 9.39258 1.96916C9.39258 1.67166 9.63341 1.41666 9.93091 1.41666C13.0476 1.41666 15.5834 3.9525 15.5834 7.06916C15.5834 7.36666 15.3355 7.61458 15.038 7.61458Z"
                fill="white"
              />
              <path
                d="M7.82741 10.5896L6.51699 11.9C6.24074 12.1762 5.80158 12.1762 5.51824 11.9071C5.44033 11.8292 5.36241 11.7583 5.28449 11.6804C4.55491 10.9437 3.89616 10.1717 3.30824 9.36416C2.72741 8.55666 2.25991 7.74916 1.91991 6.94875C1.58699 6.14125 1.41699 5.36916 1.41699 4.6325C1.41699 4.15083 1.50199 3.69041 1.67199 3.26541C1.84199 2.83333 2.11116 2.43666 2.48658 2.0825C2.93991 1.63625 3.43574 1.41666 3.95991 1.41666C4.15824 1.41666 4.35658 1.45916 4.53366 1.54416C4.71783 1.62916 4.88074 1.75666 5.00824 1.94083L6.65158 4.25708C6.77908 4.43416 6.87116 4.59708 6.93491 4.75291C6.99866 4.90166 7.03408 5.05041 7.03408 5.185C7.03408 5.355 6.98449 5.525 6.88533 5.68791C6.79324 5.85083 6.65866 6.02083 6.48866 6.19083L5.95033 6.75041C5.87241 6.82833 5.83699 6.92041 5.83699 7.03375C5.83699 7.09041 5.84408 7.14 5.85824 7.19666C5.87949 7.25333 5.90074 7.29583 5.91491 7.33833C6.04241 7.57208 6.26199 7.87666 6.57366 8.245C6.89241 8.61333 7.23241 8.98875 7.60074 9.36416C7.67158 9.435 7.74949 9.50583 7.82033 9.57666C8.10366 9.85291 8.11074 10.3062 7.82741 10.5896Z"
                fill="white"
              />
              <path
                d="M15.5619 12.9837C15.5619 13.1821 15.5265 13.3875 15.4556 13.5858C15.4344 13.6425 15.4131 13.6992 15.3848 13.7558C15.2644 14.0108 15.1086 14.2517 14.9031 14.4783C14.5561 14.8608 14.1736 15.1371 13.7415 15.3142C13.7344 15.3142 13.7273 15.3212 13.7202 15.3212C13.3023 15.4912 12.849 15.5833 12.3602 15.5833C11.6377 15.5833 10.8656 15.4133 10.0511 15.0663C9.23647 14.7192 8.42189 14.2517 7.61439 13.6638C7.33814 13.4583 7.06189 13.2529 6.7998 13.0333L9.11605 10.7171C9.31439 10.8658 9.49147 10.9792 9.64022 11.0571C9.67564 11.0712 9.71814 11.0925 9.76772 11.1137C9.82439 11.135 9.88105 11.1421 9.9448 11.1421C10.0652 11.1421 10.1573 11.0996 10.2352 11.0217L10.7736 10.4904C10.9506 10.3133 11.1206 10.1787 11.2836 10.0937C11.4465 9.99458 11.6094 9.945 11.7865 9.945C11.9211 9.945 12.0627 9.97333 12.2186 10.0371C12.3744 10.1008 12.5373 10.1929 12.7144 10.3133L15.059 11.9779C15.2431 12.1054 15.3706 12.2542 15.4486 12.4312C15.5194 12.6083 15.5619 12.7854 15.5619 12.9837Z"
                fill="white"
              />
            </svg>
          </a>
          <a href="mailto:info@bani21veka.ru" aria-label="Email">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 6l-10 7L2 6"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://max.ru/u/f9LHodD0cOKjZx-VqJ7AY9a3Ihlo_T5LB8c44JXGQ_Nie8Yf2UeaSfp3Pc0"
            target="_blank"
            rel="noopener"
            aria-label="Max"
            class="social-link--max"
          >
            <img src="/max.png" alt="Max" width="22" height="22" />
          </a>
        </div>
      </div>

      <!-- Nav -->
      <nav class="footer__nav">
        <div class="footer__col">
          <NuxtLink to="/catalog" class="footer__link">Каталог</NuxtLink>
          <NuxtLink to="/about" class="footer__link">О нас</NuxtLink>
          <NuxtLink to="/our-products" class="footer__link">Наши работы</NuxtLink>
        </div>
        <div class="footer__col">
          <NuxtLink to="/#reviews" class="footer__link">Отзывы</NuxtLink>
          <NuxtLink to="/contacts" class="footer__link">Контакты</NuxtLink>
        </div>
      </nav>

      <!-- Contacts column -->
      <div class="footer__contacts">
        <p class="footer__contact-item">г. Пенза, ул. Московская, 7</p>
        <p class="footer__contact-item">Пн-Сб 09:00-19:00</p>
        <p class="footer__contact-item">Вс &nbsp; Выходной</p>
        <a href="tel:+79361226688" class="footer__phone">+7 (936) 122 66 88</a>
        <a href="mailto:info@bani21veka.ru" class="footer__email">info@bani21veka.ru</a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <p class="footer__copy">{{ year }}. Все права защищены.</p>
      <div class="footer__legal">
        <NuxtLink to="/privacy" class="footer__legal-link">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/personal-data" class="footer__legal-link"
          >Обработка персональных данных</NuxtLink
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.footer {
  background: #2c2c2c;
  color: rgba(255, 255, 255, 0.85);
  font-family: Inter, sans-serif;
  padding: 60px 60px 0;
  margin-top: 80px;

  @media (max-width: $mobileBreakpoint) {
    padding: 40px 20px 0;
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  &__logo {
    display: inline-block;
    margin-bottom: 16px;
    transform: scale(1.5);
    transform-origin: left center;
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 20px;
    margin-top: 28px;
  }

  &__socials {
    display: flex;
    gap: 12px;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      transition: background 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.18);
      }
    }
  }

  &__nav {
    display: flex;
    gap: 40px;

    @media (max-width: $mobileBreakpoint) {
      gap: 24px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__link {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__contact-item {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
  }

  &__hours {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
  }

  &__phone {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    margin-top: 8px;
    display: block;

    &:hover {
      color: #41a3db;
    }
  }

  &__email {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    margin-top: 4px;
    display: block;

    &:hover {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 0;
    flex-wrap: wrap;

    @media (max-width: $mobileBreakpoint) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  &__copy {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  &__legal {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__legal-link {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &__license {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }
}

.social-icon {
  width: 20px;
  height: 20px;
}

.social-link--max {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.2s;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    border-radius: 4px;
  }
}
</style>
