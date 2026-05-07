<template>
  <div class="header-root">
    <div class="header-shell">
      <header>
        <div class="left">
          <NuxtLink to="/">
            <AppHeaderLogo />
          </NuxtLink>
          <ul class="nav">
            <li>
              <NuxtLink to="/catalog" class="text-14">Каталог объектов</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-14">О нас</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/our-products" class="text-14">Наши работы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-14">Блог</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#reviews" class="text-14">Отзывы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacts" class="text-14">Контакты</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="cta">
            <UIButton secondary small icon-position="left" @click="openPhoneLink">
              {{ SITE_CONTACTS.phoneDisplay }}
              <template #icon>
                <AppHeaderIconsPhone />
              </template>
            </UIButton>
            <UIButton secondary small icon-position="none" @click="modal.open('default')"
              >Заказать звонок</UIButton
            >
          </div>
          <div class="mobile-header-actions">
            <a
              :href="SITE_CONTACTS.phoneTel"
              class="mobile-icon-btn"
              aria-label="Позвонить"
              @click="closeMenu"
            >
              <AppHeaderIconsPhone class="mobile-icon-btn__svg" />
            </a>
            <a
              :href="SITE_CONTACTS.maxUrl"
              class="mobile-icon-btn mobile-icon-btn--img"
              target="_blank"
              rel="noopener"
              aria-label="Max"
              @click="closeMenu"
            >
              <img src="/max.png" alt="" width="22" height="22" />
            </a>
            <a
              v-if="vkUrl"
              :href="vkUrl"
              class="mobile-icon-btn mobile-icon-btn--img mobile-icon-btn--vk"
              target="_blank"
              rel="noopener"
              aria-label="ВКонтакте"
              @click="closeMenu"
            >
              <img src="/vk.png" alt="" width="22" height="22" />
            </a>
            <button class="burger" type="button" aria-label="Открыть меню" @click="toggleMenu">
              <span :class="{ open: isMenuOpen }" />
            </button>
          </div>
        </div>
      </header>
    </div>
    <div class="header-mobile-spacer" aria-hidden="true" />
  </div>
  <transition name="fade">
    <div v-if="isMenuOpen" class="backdrop" @click="closeMenu" />
  </transition>
  <transition name="slide">
    <aside v-if="isMenuOpen" class="mobile-menu">
      <div class="mobile-header">
        <NuxtLink to="/" @click="closeMenu">
          <AppHeaderLogo />
        </NuxtLink>
        <button class="close" type="button" aria-label="Закрыть меню" @click="closeMenu">
          <span class="x" />
        </button>
      </div>
      <nav class="mobile-nav">
        <NuxtLink to="/catalog" class="link text-18" @click="closeMenu">Каталог объектов</NuxtLink>
        <NuxtLink to="/about" class="link text-18" @click="closeMenu">О нас</NuxtLink>
        <NuxtLink to="/our-products" class="link text-18" @click="closeMenu">Наши работы</NuxtLink>
        <NuxtLink to="/blog" class="link text-18" @click="closeMenu">Блог</NuxtLink>
        <NuxtLink to="/#reviews" class="link text-18" @click="closeMenu">Отзывы</NuxtLink>
        <NuxtLink to="/contacts" class="link text-18" @click="closeMenu">Контакты</NuxtLink>
      </nav>
      <div class="mobile-menu-map">
        <iframe
          class="mobile-menu-map__iframe"
          :src="SITE_CONTACTS.mapWidgetSrc"
          title="Карта"
          allowfullscreen="true"
        />
      </div>
      <div class="mobile-contacts">
        <UIButton secondary small icon-position="left" class="phone-btn" @click="openPhoneLink">
          {{ SITE_CONTACTS.phoneDisplay }}
          <template #icon>
            <AppHeaderIconsPhone />
          </template>
        </UIButton>
        <UIButton secondary small icon-position="none" class="cb-btn" @click="modal.open('default')"
          >Заказать звонок</UIButton
        >
      </div>
    </aside>
  </transition>
</template>

<script setup>
import AppHeaderIconsPhone from './Icons/Phone.vue'
import { SITE_CONTACTS } from '~/app/utils/siteContacts'

defineProps({
  isMain: {
    type: Boolean,
    default: false,
  },
})

const modal = useModal()

const vkUrl = computed(() => SITE_CONTACTS.vkUrl.trim())

const isMenuOpen = ref(false)
function openPhoneLink() {
  window.location.href = SITE_CONTACTS.phoneTel
}
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.header-root {
  position: relative;
}

.header-mobile-spacer {
  display: none;
}

@media (max-width: $mobileBreakpoint) {
  .header-shell {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: $white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding-top: env(safe-area-inset-top, 0px);
  }

  .header-mobile-spacer {
    display: block;
    height: calc(64px + env(safe-area-inset-top, 0px));
  }
}

header {
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  position: relative;
  z-index: 1;
}

.left {
  display: flex;
  align-items: center;
  gap: 36px;
}

ul {
  display: flex;
  align-items: center;
  gap: 20px;

  li .text-14 {
    transition: color 0.2s ease;

    &:hover {
      color: #41a3db;
    }
  }
}

.right {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.cta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.mobile-header-actions {
  display: none;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.mobile-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: $white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #121212;
  flex-shrink: 0;

  &:active {
    opacity: 0.85;
  }

  &--img img {
    display: block;
  }

  &--vk img {
    border-radius: 30%;
  }
}

.mobile-icon-btn__svg {
  display: block;
}

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: $white;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}
.burger span {
  position: relative;
  display: block;
  width: 18px;
  height: 2px;
  background: #121212;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}
.burger span::before,
.burger span::after {
  content: '';
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: #121212;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.burger span::before {
  top: -6px;
}
.burger span::after {
  top: 6px;
}
.burger span.open {
  background: transparent;
}
.burger span.open::before {
  transform: translateY(6px) rotate(45deg);
}
.burger span.open::after {
  transform: translateY(-6px) rotate(-45deg);
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;
}
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(88vw, 360px);
  background: $background;
  z-index: 200;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);
  max-height: 100dvh;
  overflow-y: auto;
  box-sizing: border-box;
}
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.close {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: $white;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.close .x {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
}
.close .x::before,
.close .x::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 2px;
  background: #121212;
  transform-origin: center;
}
.close .x::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.close .x::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  flex-shrink: 0;
}
.mobile-nav .link {
  color: $text;
}

.mobile-menu-map {
  margin-top: 20px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
  background: #e8e8e8;
}

.mobile-menu-map__iframe {
  display: block;
  width: 100%;
  height: 200px;
  border: 0;
}

.mobile-contacts {
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}
.mobile-contacts .phone-btn,
.mobile-contacts .cb-btn {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: $mobileBreakpoint) {
  header {
    margin-top: 0;
    padding: 10px 20px;
    min-height: 64px;
    box-sizing: border-box;
  }
  ul.nav {
    display: none;
  }
  .cta {
    display: none;
  }
  .mobile-header-actions {
    display: flex;
  }
  .burger {
    display: inline-flex;
  }
}
</style>
