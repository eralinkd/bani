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
  '/our-products': 'Наши работы',
}

function humanize(segment) {
  const text = decodeURIComponent(segment).replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const { data: productsResponse } = await useAsyncData('breadcrumbs-products', () =>
  $fetch('/api/products'),
)

const routeId = computed(() => {
  const segments = (route.path || '').split('/').filter(Boolean)
  return segments[0] === 'our-products' && segments[1] ? segments[1] : ''
})

const routeBlogSlug = computed(() => {
  const segments = (route.path || '').split('/').filter(Boolean)
  return segments[0] === 'blog' && segments[1] ? segments[1] : ''
})

const { data: projectResponse } = await useAsyncData(
  () => (routeId.value ? `breadcrumbs-project-${routeId.value}` : 'breadcrumbs-project-none'),
  () => (routeId.value ? $fetch(`/api/project/${routeId.value}`) : { project: null }),
  { watch: [routeId] },
)

const projectTitleById = computed(() => {
  const val = projectResponse.value
  if (!val) return ''
  return val.project?.title ?? val.title ?? ''
})

const categoryTitleBySlug = computed(() => {
  const categories = productsResponse.value?.productCategories ?? []
  return new Map(categories.map((category) => [category.slug, category.title]))
})

const productTitleBySlug = computed(() => {
  const products = productsResponse.value?.products ?? []
  return new Map(products.map((product) => [product.slug, product.title]))
})

const { data: blogPostForCrumb } = await useAsyncData(
  () => (routeBlogSlug.value ? `breadcrumbs-blog-${routeBlogSlug.value}` : 'breadcrumbs-blog-none'),
  () => (routeBlogSlug.value ? $fetch(`/api/blog/${routeBlogSlug.value}`) : Promise.resolve(null)),
  { watch: [routeBlogSlug] },
)

const blogArticleTitleFromApi = computed(() => blogPostForCrumb.value?.title ?? '')

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
    const label =
      LABELS[acc] ||
      (segments[0] === 'our-products' && segments[1] && i === 1 ? projectTitleById.value : null) ||
      (segments[0] === 'blog' && segments[1] && i === 1 ? blogArticleTitleFromApi.value : null) ||
      categoryTitleBySlug.value.get(segments[i]) ||
      productTitleBySlug.value.get(segments[i]) ||
      humanize(segments[i])
    crumbs.push({
      to: isLast ? undefined : acc,
      label: label || humanize(segments[i]),
      current: isLast,
    })
  }

  return crumbs
})

const requestUrl = useRequestURL()

const breadcrumbJsonLd = computed(() => {
  const origin = requestUrl.origin
  const listItems = items.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.to ? `${origin}${item.to}` : requestUrl.href,
  }))

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  })
})

useHead(() => ({
  script: [{ type: 'application/ld+json', innerHTML: breadcrumbJsonLd.value }],
}))
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

  @media (max-width: $mobileBreakpoint) {
    padding-left: 20px;
  }

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
