<template>
  <div class="ui-select" :class="{ open: isOpen, disabled }">
    <label v-if="label" class="label">{{ label }}</label>
    <button
      type="button"
      class="control"
      :aria-expanded="isOpen"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="value" :class="{ placeholder: !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="chevron" />
    </button>
    <ul v-if="isOpen" class="menu" role="listbox">
      <li
        v-for="opt in options"
        :key="String(opt.value)"
        class="option"
        :class="{ selected: opt.value === internalValue }"
        role="option"
        @click="select(opt.value)"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, null],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Не выбрано',
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const internalValue = computed(() => props.modelValue)
const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === internalValue.value)
  return found ? found.label : ''
})

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}
function close() {
  isOpen.value = false
}
function select(val) {
  emit('update:modelValue', val)
  close()
}

function onClickOutside(e) {
  if (!(e.target instanceof Element)) return
  const root = rootEl.value
  if (root && !root.contains(e.target)) {
    close()
  }
}

const rootEl = ref(null)
onMounted(() => {
  document.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.ui-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  font-size: 14px;
  line-height: 1;
  color: $text;
}
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: $white;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.control:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
.control:hover {
  border-color: #d6d6d6;
}
.value {
  font-size: 14px;
  color: #121212;
  text-align: left;
}
.value.placeholder {
  color: #9a9a9a;
}
.chevron {
  position: relative;
  width: 10px;
  height: 10px;
}
.chevron::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #9a9a9a;
  border-bottom: 2px solid #9a9a9a;
  transform: rotate(45deg);
  transition: transform 0.15s ease;
}
.open .chevron::before {
  transform: rotate(-135deg);
}
.menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 10;
  background: $white;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 6px;
  display: flex;
  flex-direction: column;
  max-height: 260px;
  overflow: auto;
}
.option {
  padding: 10px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #121212;
  cursor: pointer;
}
.option.selected {
  background: #f1f5ff;
}
.option:hover {
  background: #f6f6f6;
}
</style>
