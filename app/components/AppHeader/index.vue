<template>
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
        <!-- <li>
          <NuxtLink to="/" class="text-14">Блог</NuxtLink>
        </li> -->
        <li>
          <NuxtLink to="/" class="text-14">Отзывы</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contacts" class="text-14">Контакты</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="right">
      <div v-if="!isMain" class="icons">
        <NuxtLink to="https://t.me/bani21veka" target="_blank">
          <AppHeaderIconsTG class="icon" />
        </NuxtLink>
        <NuxtLink to="https://wa.me/79251375856" target="_blank">
          <AppHeaderIconsWhatsapp class="icon" />
        </NuxtLink>
      </div>

      <div v-if="isMain" class="icons">
        <NuxtLink to="https://t.me/bani21veka" target="_blank">
          <AppHeaderIconsTGWhite class="icon" />
        </NuxtLink>
        <NuxtLink to="https://wa.me/79251375856" target="_blank">
          <AppHeaderIconsWhatsappWhite class="icon" />
        </NuxtLink>
      </div>
      <div class="cta">
        <UIButton secondary small icon-position="left">
          8(800) 000 00 00
          <template #icon>
            <AppHeaderIconsPhone />
          </template>
        </UIButton>
        <UIButton secondary small icon-position="none">Заказать звонок</UIButton>
      </div>
      <!-- keep one desktop phone button for large screens only -->
      <!-- Burger button (mobile) -->
      <button class="burger" type="button" aria-label="Открыть меню" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }" />
      </button>
    </div>
  </header>
  <!-- Mobile menu -->
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
        <NuxtLink to="/" class="link text-18" @click="closeMenu">Отзывы</NuxtLink>
        <NuxtLink to="/contacts" class="link text-18" @click="closeMenu">Контакты</NuxtLink>
      </nav>
      <div class="mobile-contacts">
        <div class="icons" :class="{ light: isMain }">
          <NuxtLink to="https://t.me/bani21veka" target="_blank">
            <component :is="isMain ? 'AppHeaderIconsTGWhite' : 'AppHeaderIconsTG'" class="icon" />
          </NuxtLink>
          <NuxtLink to="https://wa.me/79251375856" target="_blank">
            <component
              :is="isMain ? 'AppHeaderIconsWhatsappWhite' : 'AppHeaderIconsWhatsapp'"
              class="icon"
            />
          </NuxtLink>
        </div>
        <UIButton secondary small icon-position="left" class="phone-btn">
          8(800) 000 00 00
          <template #icon>
            <AppHeaderIconsPhone />
          </template>
        </UIButton>
        <UIButton secondary small icon-position="none" class="cb-btn">Заказать звонок</UIButton>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import AppHeaderIconsPhone from './Icons/Phone.vue'
import AppHeaderIconsTGWhite from './Icons/TGWhite.vue'
import AppHeaderIconsWhatsappWhite from './Icons/WhatsappWhite.vue'

defineProps({
  isMain: {
    type: Boolean,
    default: false,
  },
})

const isMenuOpen = ref(false)
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

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

.icons {
  display: flex;
  align-items: center;
  gap: 22px;
}

.cta {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Burger button */
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

/* Mobile menu */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
}
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(88vw, 360px);
  background: $background;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);
}
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}
.mobile-nav .link {
  color: $text;
}
.mobile-contacts {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mobile-contacts .icons {
  gap: 16px;
}
.mobile-contacts .phone-btn,
.mobile-contacts .cb-btn {
  width: 100%;
}

/* Animations */
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

/* Responsive */
@media (max-width: $mobileBreakpoint) {
  header {
    background-color: $white;
    padding: 15px 20px;
    margin-top: 0;
  }
  ul.nav {
    display: none;
  }
  .icons,
  .cta {
    display: none;
  }
  .burger {
    display: inline-flex;
  }
}
</style>
