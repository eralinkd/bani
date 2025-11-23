<template>
  <div class="container">
    <div class="filters">
      <div
        v-for="item in items"
        :key="item.value"
        class="item text-16"
        :class="{ selected: selected === item.value }"
        @click="selected = item.value"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="products">
      <div v-for="i in 8" :key="i" class="item">
        <NuxtImg class="image" src="/images/OurProducts/1.png" alt="Бани" format="webp" />
        <p class="text-24 text-white">Баня бочка</p>
        <p class="text-16 text-white">
          Простой вариант бани-бочки эконом-класса, в конструкции которой предусмотрен козырек над
          входом.
        </p>
        <div class="slider-controls">
          <IconsArrowLeft class="icon" />
          <p class="text-18">2 / 18</p>
          <IconsArrowRight class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selected = ref('бани')

const items = [
  {
    label: 'Бани',
    value: 'бани',
  },
  {
    label: 'Беседки',
    value: 'беседки',
  },
  {
    label: 'Веранды',
    value: 'веранды',
  },
  {
    label: 'Мягкие окна',
    value: 'мягкие окна',
  },
  {
    label: 'Садовая мебель',
    value: 'садовая мебель',
  },
  {
    label: 'Сваи',
    value: 'сваи',
  },
]
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  padding: 0 60px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    border-radius: 10px;
    background: $white;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    &.selected {
      background: $text;
      color: $white;
    }
  }
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 20px;

  .item {
    position: relative;
    aspect-ratio: 688 / 481;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px;
    gap: 10px;

    * {
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

    .text-16 {
      max-width: 249px;
    }

    .slider-controls {
      position: absolute;
      bottom: 30px;
      right: 13px;
      display: flex;
      align-items: center;
      gap: 20px;

      .text-18 {
        color: $white;
      }

      .icon {
        :deep(path) {
          fill: $white;
        }
      }
    }
  }
}
</style>
