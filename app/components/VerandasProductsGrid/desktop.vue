<template>
  <div class="container">
    <div class="filters">
      <UISelect
        v-model="selectedType"
        label="Тип изделия"
        :options="typeOptions"
        placeholder="Не выбрано"
      />
      <UISelect
        v-model="selectedLength"
        label="Длина"
        :options="lengthOptions"
        placeholder="Не выбрано"
      />
      <UIPriceInput v-model:min="minPrice" v-model:max="maxPrice" label="Цена, ₽" />
      <UIButton small icon-position="none">Применить</UIButton>
      <button v-if="hasActiveFilters" class="reset-button" @click="resetFilters">
        Сбросить фильтры
      </button>
    </div>
    <div class="products">
      <NuxtLink
        v-for="product in visibleProducts"
        :key="product.id"
        to="/catalog/product"
        class="item hover-card"
      >
        <NuxtImg class="image" :src="getImage(product)" :alt="product.title" format="webp" />
        <p class="text-24 text-white">{{ product.title }}</p>
        <p class="text-14 text-white">
          {{ product.description }}
        </p>
        <p class="text-24 text-white">{{ formatPrice(getPrice(product)) }}</p>
      </NuxtLink>
      <UIButton v-if="!isShowAll && canShowMore" icon-position="none" small class="button" @click="showAll"
        >Еще</UIButton
      >
    </div>
  </div>
</template>

<script setup>
const placeholderImage = '/images/Products/1.png'

const { data: productsResponse } = await useAsyncData('products-grid-verandas', () =>
  $fetch('/api/products')
)

const productCategories = computed(() => productsResponse.value?.productCategories ?? [])
const products = computed(() => productsResponse.value?.products ?? [])

const verandasCategory = computed(() => {
  return productCategories.value.find((category) => category.title === 'Веранды') || null
})

const filteredProducts = computed(() => {
  if (!verandasCategory.value) return products.value
  return products.value.filter((product) => product.categoryId === verandasCategory.value.id)
})

const productsAmount = ref(9)
const isShowAll = ref(false)

function showAll() {
  isShowAll.value = true
  productsAmount.value = filteredProducts.value.length
}

const selectedType = ref(null)
const selectedLength = ref(null)
const minPrice = ref('')
const maxPrice = ref('')

const typeOptions = [
  { label: 'Открытая веранда', value: 'open' },
  { label: 'Закрытая веранда', value: 'closed' },
  { label: 'Веранда с остеклением', value: 'glazed' },
  { label: 'Веранда с навесом', value: 'canopy' },
]

const lengthOptions = [
  { label: '2 м', value: '2' },
  { label: '3 м', value: '3' },
  { label: '4 м', value: '4' },
  { label: '5 м', value: '5' },
]

const hasActiveFilters = computed(() => {
  return (
    selectedType.value !== null ||
    selectedLength.value !== null ||
    minPrice.value !== '' ||
    maxPrice.value !== ''
  )
})

function resetFilters() {
  selectedType.value = null
  selectedLength.value = null
  minPrice.value = ''
  maxPrice.value = ''
}

const visibleProducts = computed(() => {
  if (isShowAll.value) return filteredProducts.value
  return filteredProducts.value.slice(0, productsAmount.value)
})

const canShowMore = computed(() => filteredProducts.value.length > productsAmount.value)

const getImage = (product) => {
  if (product.images?.length) return product.images[0].url
  return placeholderImage
}

const getPrice = (product) => {
  if (!product.sizes?.length) return 0
  return product.sizes[0].price ?? 0
}

const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 60px;
  display: flex;
  gap: 32px;
}

.filters {
  width: 328px;
  border-radius: 20px;
  background: $white;
  padding: 20px;
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.item {
  border-radius: 20px;
  aspect-ratio: 328 / 481;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;

  p {
    max-width: 85%;
    position: relative;
    z-index: 2;
  }

  .image {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.button {
  grid-column: span 3;
  width: fit-content;
  margin: 0 auto;
}

.filters-preview {
  color: #6f6f6f;
}

.reset-button {
  margin: auto;
  background: none;
  border: none;
  padding: 0;
  margin-top: 2px;
  color: #6f6f6f;
  font-size: 14px;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  transition: color 0.3s ease;
  margin-bottom: 8px;

  &:hover {
    color: $text;
  }
}
</style>
