<template>
  <div class="container">
    <div class="left">
      <div class="thumbnails">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="thumbnail"
          :class="{ active: selectedImageIndex === index }"
          @click="selectImage(index)"
        >
          <NuxtImg class="image" :src="image" :alt="`Thumbnail ${index + 1}`" format="webp" />
        </div>
      </div>
      <div class="main-image">
        <NuxtImg class="image" :src="currentImage" alt="Main Image" format="webp" />
      </div>
    </div>
    <div class="right">
      <h2>Баня бочка</h2>
      <div class="content">
        <div class="text">
          <p class="text-16 bold">Описание:</p>
          <p class="text-16">
            Корпус бани выполнен из качественной древесины ели, собранной по надежной системе
            «лунный паз», что обеспечивает отличную теплоизоляцию. Для долговечности и эстетики,
            корпус снаружи обработан защитными составами (цвет на выбор клиента), а верхняя часть
            бочки покрыта мягкой черепицей (доступны зеленый, красный или коричневый цвета).
          </p>
          <div class="stats">
            <p class="name text-16">Материалы:</p>
            <div class="value text-16">Брус / металл / кирпичи</div>
            <div class="name text-16">Печь:</div>
            <div class="value text-16">Термофор Допропар -14</div>
          </div>
        </div>
        <div class="filters">
          <div class="size-select-wrapper">
            <UISelect v-model="selectedSize" :options="sizeOptions" placeholder="Выберите размер" />
          </div>
          <p class="price">{{ formattedPrice }}</p>
          <p class="product-code">Код товара: {{ productCode }}</p>
        </div>
      </div>
      <UIButton class="button" @click="modal.open('default')">Отправить заявку</UIButton>
    </div>
  </div>
</template>

<script setup>
const modal = useModal()
const images = [
  '/images/Product/1.png',
  '/images/Product/2.png',
  '/images/Product/3.png',
  '/images/Product/4.png',
  '/images/Product/5.png',
  '/images/Product/6.png',
]

const selectedImageIndex = ref(0)

const currentImage = computed(() => {
  return images[selectedImageIndex.value]
})

function selectImage(index) {
  selectedImageIndex.value = index
}

const sizeOptions = [
  { label: '4,2х2,2х2,5 м.', value: '4.2x2.2x2.5', price: 2270000, code: '4197410' },
  { label: '5,0х2,2х2,5 м.', value: '5.0x2.2x2.5', price: 2580000, code: '4197411' },
  { label: '6,0х2,2х2,5 м.', value: '6.0x2.2x2.5', price: 2890000, code: '4197412' },
  { label: '7,0х2,2х2,5 м.', value: '7.0x2.2x2.5', price: 3200000, code: '4197413' },
]

const selectedSize = ref(sizeOptions[0].value)

const currentSize = computed(() => {
  return sizeOptions.find((option) => option.value === selectedSize.value) || sizeOptions[0]
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(currentSize.value.price) + ' ₽'
})

const productCode = computed(() => {
  return currentSize.value.code
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.container {
  display: flex;
  align-items: stretch;
  gap: 32px;
  width: 100%;
  max-width: 100%;
  padding: 0 60px;
}

.left {
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  gap: 32px;
  width: fit-content;

  .thumbnails {
    display: flex;
    gap: 9px;
    flex-direction: column;

    .thumbnail {
      flex-shrink: 0;
      border-radius: 15px;
      overflow: hidden;
      width: 88px;
      height: 88px;
      cursor: pointer;
      border: 2px solid transparent;
      transition:
        border-color 0.3s ease,
        opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        border-color: #41a3db;
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .main-image {
    width: 448px;
    flex: 1;
    flex-shrink: 0;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: stretch;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }
  }
}

.right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .content {
    display: flex;
    gap: 32px;
    margin-top: 20px;
    flex: 1;

    .text .text-16.bold {
      margin-bottom: 10px;
      font-weight: 600;
    }

    .filters {
      height: fit-content;
      width: fit-content;
      background: $white;
      border-radius: 20px;
      padding: 15px 15px 20px 15px;
      display: flex;
      flex-direction: column;
      gap: 0;
      position: relative;

      .price,
      .product-code {
        text-align: center;
      }

      .size-select-wrapper {
        margin-bottom: -5px;

        :deep(.ui-select) {
          .control {
            background: #f5f6fb;
            border: none;
            padding: 15px;
            border-radius: 15px;
            width: 188px;
          }

          .value {
            font-size: 16px;
            color: #787878;
            line-height: 1.5;
          }

          .chevron::before {
            border-color: #787878;
          }
        }
      }

      .price {
        font-size: 28px;
        font-weight: 400;
        color: #41424c;
        line-height: normal;
        margin: 0;
        margin-top: 20px;
      }

      .product-code {
        font-size: 16px;
        color: #afafaf;
        line-height: normal;
        margin: 0;
        margin-top: 15px;
      }
    }
  }

  .stats {
    margin-top: 20px;
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr auto;
    row-gap: 10px;
    column-gap: 40px;

    .name {
      color: #afafaf;
    }
  }

  .button {
    margin-top: auto;
    align-self: flex-start;
  }
}
</style>
