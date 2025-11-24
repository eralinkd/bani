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
      <UIButton small>Нужна помощь</UIButton>
    </div>
    <div class="products">
      <div v-for="i in productsAmount" :key="i" class="item hover-card">
        <NuxtImg class="image" src="/images/Products/1.png" alt="Продукт" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-14 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <p class="text-24 text-white">858 000 ₽</p>
      </div>
      <UIButton v-if="!isShowAll" icon-position="none" small class="button" @click="showAll"
        >Еще</UIButton
      >
    </div>
  </div>
</template>

<script setup>
const productsAmount = ref(9)
const isShowAll = ref(false)

function showAll() {
  isShowAll.value = true
  productsAmount.value = 12
}

const selectedType = ref(null)
const selectedLength = ref(null)
const minPrice = ref('')
const maxPrice = ref('')

const typeOptions = [
  { label: 'Баня бочка', value: 'bochka' },
  { label: 'Квадро-бочка', value: 'quadro' },
  { label: 'Баня дом', value: 'house' },
]

const lengthOptions = [
  { label: '2 м', value: '2' },
  { label: '3 м', value: '3' },
  { label: '4 м', value: '4' },
  { label: '5 м', value: '5' },
]
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
</style>
