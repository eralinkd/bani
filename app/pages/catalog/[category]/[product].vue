<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <ProductHero class="mobile-margin" :product="product" />
      <ProductStats class="mobile-margin big" :product="product" />
      <HowToOffer />
      <Popular />
      <Reviews />
      <Promotions />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import HowToOffer from '../../../components/HowToOffer/index.vue'
import ProductHero from '../../../components/Product/Hero/index.vue'
import ProductStats from '../../../components/Product/Stats/index.vue'

const route = useRoute()
const categorySlug = computed(() => String(route.params.category || ''))
const productSlug = computed(() => String(route.params.product || ''))

const { data: productResponse } = await useAsyncData(
  () => `product-${categorySlug.value}-${productSlug.value}`,
  () =>
    $fetch('/api/product', {
      query: { categorySlug: categorySlug.value, productSlug: productSlug.value },
    }),
  { watch: [categorySlug, productSlug] },
)

const product = computed(() => {
  const val = productResponse.value
  if (!val) return null
  return val.product ?? val
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
}

const { data: orgSchema } = useNuxtData('org-schema')

const productJsonLd = computed(() => {
  const p = product.value
  if (!p) return null

  const baseUrl = orgSchema.value?.url || ''
  const productUrl = `${baseUrl}/catalog/${categorySlug.value}/${productSlug.value}`

  const prices = (p.sizes ?? []).map((s) => s.price).filter(Boolean)
  const minPrice = prices.length ? Math.min(...prices) : null
  const maxPrice = prices.length ? Math.max(...prices) : null
  const firstSku = p.sizes?.[0]?.code || p.id

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.description || undefined,
    image: p.images?.length ? p.images : undefined,
    sku: firstSku,
    ...(orgSchema.value?.name && {
      brand: { '@type': 'Brand', name: orgSchema.value.name },
    }),
    offers: {
      '@type': prices.length > 1 ? 'AggregateOffer' : 'Offer',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      ...(minPrice && { price: minPrice }),
      ...(prices.length > 1 && {
        lowPrice: minPrice,
        highPrice: maxPrice,
        offerCount: prices.length,
      }),
    },
  }

  return JSON.stringify(schema)
})

const requestUrl = useRequestURL()

const pageTitle = computed(() => product.value?.metaTitle || product.value?.title || '')
const pageDescription = computed(() => product.value?.metaDescription || product.value?.description || '')

useHead(() => ({
  title: pageTitle.value,
  meta: pageDescription.value ? [{ name: 'description', content: pageDescription.value }] : [],
  script: productJsonLd.value
    ? [{ type: 'application/ld+json', innerHTML: productJsonLd.value }]
    : [],
}))

useOgMeta(() => ({
  type: 'product',
  title: pageTitle.value,
  description: pageDescription.value,
  image: product.value?.images?.[0] ?? '',
  url: requestUrl.href,
}))
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.mobile-margin {
  @media (max-width: $mobileBreakpoint) {
    margin-top: -20px;
  }
}
.big {
  @media (max-width: $mobileBreakpoint) {
    margin-top: -50px;
  }
}
</style>
