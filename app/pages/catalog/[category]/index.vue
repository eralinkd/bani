<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <PageTitle>{{ pageTitle }}</PageTitle>
      <ProductsGrid class="mobile-margin" :category-id="categoryId" />
      <ProjectsSlider class="mobile-margin big" />
      <HowWeWork no-button />
      <Reviews />
      <Promotions />
      <WhyUs />
      <FAQ />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute()

const categorySlug = computed(() => String(route.params.category || ''))

const [{ data: productsResponse }, { data: categoryPageTitles }] = await Promise.all([
  useAsyncData('catalog-category', () => $fetch('/api/products')),
  useAsyncData('category-page-titles', () => $fetch('/api/category-page-titles')),
])

const category = computed(() => {
  const categories = productsResponse.value?.productCategories ?? []
  return categories.find((item) => item.slug === categorySlug.value) || null
})

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' })
}

const pageTitle = computed(() => {
  const custom = categoryPageTitles.value?.[categorySlug.value]
  return custom || category.value?.title || 'Категория'
})
const categoryId = computed(() => category.value?.id ?? '')

const { data: seoData } = useNuxtData('seo')
const catSeoKey = computed(() => `catalog-${categorySlug.value}`)
const catSeo = computed(() => seoData.value?.[catSeoKey.value])
const catTitle = computed(() => catSeo.value?.title || pageTitle.value)
const catDesc = computed(() => catSeo.value?.description || '')

useHead(() => ({
  title: catTitle.value,
  meta: catDesc.value ? [{ name: 'description', content: catDesc.value }] : [],
}))

useOgMeta(() => ({
  title: catTitle.value,
  description: catDesc.value,
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
    margin-top: -30px;
  }
}
</style>
