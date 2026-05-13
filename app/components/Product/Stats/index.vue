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
        :class="{ 'tab-content--kit-bath': tab.key === 'kit' && isBath }"
      >
        <template v-if="tab.key === 'kit' && isBath">
          <div class="kit-bath-grid">
            <div v-if="product?.kitHtml" class="kit-bath-col" v-html="product.kitHtml" />
            <div v-if="product?.additionalHtml" class="kit-bath-col kit-bath-col--additional">
              <h3 class="kit-bath-additional-title">Дополнительно</h3>
              <div v-html="product.additionalHtml" />
            </div>
          </div>
        </template>
        <template v-else-if="tab.key === 'kit' && isGazeboCategory">
          <div class="kit-gazebo-stack">
            <div v-if="product?.kitHtml" v-html="product.kitHtml" />
            <div
              v-if="product?.additionalHtml"
              :class="{ 'kit-gazebo-stack__tail': product?.kitHtml }"
              v-html="product.additionalHtml"
            />
          </div>
        </template>
        <div v-else v-html="tab.html" />
      </div>
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

const CATEGORY_BATH = 'bani'
const CATEGORY_GAZEBOS = 'besedki-verandy'

const tabDefs = [
  { key: 'interior', label: 'Описание', field: 'interiorHtml' },
  { key: 'characteristics', label: 'Характеристики', field: 'characteristicsHtml' },
  { key: 'kit', label: 'Комплектация', labelGazebo: 'Дополнительно', field: 'kitHtml' },
]

const categorySlug = computed(() => props.product?.category?.slug ?? '')

const isBath = computed(() => categorySlug.value === CATEGORY_BATH)

const isGazeboCategory = computed(() => categorySlug.value === CATEGORY_GAZEBOS)

function tabHasContent(t) {
  const p = props.product
  if (!p) return false
  if (t.key !== 'kit') return Boolean(p[t.field])
  if (isBath.value || isGazeboCategory.value) return Boolean(p.kitHtml || p.additionalHtml)
  return Boolean(p.kitHtml)
}

const tabs = computed(() =>
  tabDefs.filter(tabHasContent).map((t) => ({
    key: t.key,
    label: t.key === 'kit' && isGazeboCategory.value ? t.labelGazebo : t.label,
    html: props.product[t.field],
  })),
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
  .kit-bath-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;

    @media (max-width: $mobileBreakpoint) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .kit-bath-col {
    min-width: 0;
  }

  .kit-gazebo-stack__tail {
    margin-top: 24px;

    @media (max-width: $mobileBreakpoint) {
      margin-top: 20px;
    }
  }

  .kit-bath-additional-title {
    margin: 0 0 12px;
    font-family: Inter, sans-serif;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.35;
    color: $text;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 10px;
      font-size: 15px;
    }
  }

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
