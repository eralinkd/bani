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
          <NuxtLink to="/" class="text-14">Наши работы</NuxtLink>
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
        <NuxtLink to="https://wa.me/79137668115" target="_blank">
          <AppHeaderIconsWhatsapp class="icon" />
        </NuxtLink>
      </div>

      <div v-if="isMain" class="icons">
        <NuxtLink to="https://t.me/bani21veka" target="_blank">
          <AppHeaderIconsTGWhite class="icon" />
        </NuxtLink>
        <NuxtLink to="https://wa.me/79137668115" target="_blank">
          <AppHeaderIconsWhatsappWhite class="icon" />
        </NuxtLink>
      </div>
      <UIButton secondary small icon-position="left"
        >8(800) 000 00 00
        <template #icon>
          <AppHeaderIconsPhone />
        </template>
      </UIButton>
      <UIButton secondary small icon-position="none">Заказать звонок</UIButton>
    </div>
  </header>
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
}

.icons {
  display: flex;
  align-items: center;
  gap: 22px;
}
</style>
