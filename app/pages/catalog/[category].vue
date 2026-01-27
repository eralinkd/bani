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
    <!-- <AppFooter /> -->
  </div>
</template>

<script setup>
const route = useRoute()

const categoryId = computed(() => String(route.params.category || ''))

const { data: productsResponse } = await useAsyncData('catalog-category', () =>
  $fetch('/api/products')
)

const category = computed(() => {
  const categories = productsResponse.value?.productCategories ?? []
  return categories.find((item) => item.id === categoryId.value) || null
})

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' })
}

const pageTitle = computed(() => category.value?.title ?? 'Категория')
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
