<template>
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <template v-for="(item, index) in items" :key="item.to || item.label">
      <NuxtLink v-if="!item.current" :to="item.to" class="breadcrumbs__link">{{
        item.label
      }}</NuxtLink>
      <span v-else class="breadcrumbs__current">{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="breadcrumbs__sep">/</span>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const LABELS = {
  '/': 'Главная',
  '/contacts': 'Контакты',
  '/catalog': 'Каталог объектов',
  '/about': 'О нас',
  '/projects': 'Наши работы',
  '/blog': 'Блог',
  '/reviews': 'Отзывы',
  '/catalog/bathhouses': 'Бани',
  '/our-products': 'Наши работы',
  '/catalog/verandas': 'Веранды',
}

function humanize(segment) {
  const text = decodeURIComponent(segment).replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const items = computed(() => {
  const path = route.path || '/'
  const segments = path.split('/').filter(Boolean)

  const crumbs = []

  // Root
  crumbs.push({
    to: '/',
    label: LABELS['/'] || 'Главная',
    current: segments.length === 0,
  })

  // Build cumulative paths
  let acc = ''
  for (let i = 0; i < segments.length; i++) {
    acc += '/' + segments[i]
    const isLast = i === segments.length - 1
    crumbs.push({
      to: isLast ? undefined : acc,
      label: LABELS[acc] || humanize(segments[i]),
      current: isLast,
    })
  }

  return crumbs
})
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 60px;

  &__link,
  &__current {
    color: $text;
    text-decoration: none;
  }

  &__current {
    color: #41a3db;
  }

  &__sep {
    color: $text;
  }
}
</style>
