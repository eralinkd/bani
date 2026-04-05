<template>
  <div v-if="tabs.length" class="stats-container">
    <div class="tabs-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        type="button"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.key"
        :key="tab.key"
        class="text-16"
        v-html="tab.html"
      />
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

const tabDefs = [
  { key: 'interior', label: 'Описание', field: 'interiorHtml' },
  { key: 'characteristics', label: 'Характеристики', field: 'characteristicsHtml' },
  { key: 'kit', label: 'Комплектация', field: 'kitHtml' },
]

const tabs = computed(() =>
  tabDefs
    .filter((t) => props.product?.[t.field])
    .map((t) => ({ key: t.key, label: t.label, html: props.product[t.field] })),
)

const activeTab = ref(tabs.value[0]?.key ?? '')

watch(tabs, (val) => {
  if (!val.find((t) => t.key === activeTab.value)) {
    activeTab.value = val[0]?.key ?? ''
  }
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.stats-container {
  padding: 0 60px 40px;

  @media (max-width: $mobileBreakpoint) {
    padding: 0 16px 32px;
  }
}

.tabs-bar {
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  gap: 0;
  margin-bottom: 28px;

  @media (max-width: $mobileBreakpoint) {
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.tab-btn {
  position: relative;
  padding: 18px 40px;
  font-size: 18px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  color: #8e8e8e;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #41a3db;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    color: $text;
  }

  &.active {
    color: $text;
    font-weight: 600;

    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: $mobileBreakpoint) {
    padding: 14px 24px;
    font-size: 15px;
  }
}

.tab-content {
  .text-16 {
    font-size: 16px;
    line-height: 1.7;
    color: $text;

    @media (max-width: $mobileBreakpoint) {
      font-size: 14px;
    }

    :deep(p) {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(ul) {
      padding-left: 20px;
      margin-bottom: 10px;

      li {
        list-style: disc;
        margin-bottom: 5px;
      }
    }

    :deep(ol) {
      padding-left: 20px;
      margin-bottom: 10px;

      li {
        list-style: decimal;
        margin-bottom: 5px;
      }
    }

    :deep(strong),
    :deep(b) {
      font-weight: 700;
    }

    :deep(em),
    :deep(i) {
      font-style: italic;
    }

    :deep(a) {
      color: #41a3db;
      text-decoration: underline;
    }
  }
}
</style>
