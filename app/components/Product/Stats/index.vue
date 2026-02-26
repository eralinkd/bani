<template>
  <div class="container">
    <div class="item">
      <p class="title text-36">Описание</p>
      <div class="separator"></div>
      <div class="text-16" v-html="interiorHtml"></div>
    </div>
    <div class="item">
      <p class="title text-36">Характеристики</p>
      <div class="separator"></div>
      <div class="text-16" v-html="characteristicsHtml"></div>
    </div>
    <div class="item">
      <p class="title text-36">Комплектация</p>
      <div class="separator"></div>
      <div class="text-16" v-html="kitHtml"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
})

const interiorHtml = computed(() => props.product?.interiorHtml ?? '')
const characteristicsHtml = computed(() => props.product?.characteristicsHtml ?? '')
const kitHtml = computed(() => props.product?.kitHtml ?? '')
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.container {
  display: grid;
  padding: 0 60px;
  grid-template-columns: 568fr 328fr 448fr;
  gap: 32px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    padding: 0 16px 40px;
    gap: 0px;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: $mobileBreakpoint) {
      padding: 18px;
      gap: 12px;
    }

    .title {
      font-size: 36px;
      line-height: 1.2;

      @media (max-width: $mobileBreakpoint) {
        font-size: 24px;
      }
    }

    .separator {
      width: 100%;
      height: 1px;
      background: #d9d9d9;
    }

    .text-16.bold {
      font-weight: 700;
    }

    .text-16 {
      @media (max-width: $mobileBreakpoint) {
        font-size: 14px;
      }

      ul {
        padding-left: 20px;
        li {
          list-style: disc;
        }
      }
    }
  }
}
</style>
