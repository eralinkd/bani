<template>
  <div class="ui-price">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="inputs">
      <div class="field">
        <input
          type="text"
          :value="minLocal"
          placeholder="от"
          inputmode="numeric"
          @input="onMinInput"
        />
        <span class="currency">₽</span>
      </div>
      <div class="separator" />
      <div class="field">
        <input
          type="text"
          :value="maxLocal"
          placeholder="до"
          inputmode="numeric"
          @input="onMaxInput"
        />
        <span class="currency">₽</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  min: {
    type: [String, Number, null],
    default: '',
  },
  max: {
    type: [String, Number, null],
    default: '',
  },
})

const emit = defineEmits(['update:min', 'update:max'])

const minLocal = ref(String(props.min ?? ''))
const maxLocal = ref(String(props.max ?? ''))

watch(
  () => props.min,
  (v) => {
    const next = String(v ?? '')
    if (next !== minLocal.value) minLocal.value = next
  },
)
watch(
  () => props.max,
  (v) => {
    const next = String(v ?? '')
    if (next !== maxLocal.value) maxLocal.value = next
  },
)

function sanitizeDigits(value) {
  return String(value || '').replace(/\D/g, '')
}
function onMinInput(e) {
  const v = sanitizeDigits(e.target.value)
  minLocal.value = v
  emit('update:min', v)
}
function onMaxInput(e) {
  const v = sanitizeDigits(e.target.value)
  maxLocal.value = v
  emit('update:max', v)
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.ui-price {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  font-size: 14px;
  line-height: 1;
  color: $text;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: $white;
  gap: 8px;
}
.field {
  position: relative;
}
.field input {
  width: 100%;
  height: 38px;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 14px;
  color: #121212;
  padding-right: 18px;
}
.field input::placeholder {
  color: #9a9a9a;
}
.currency {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #9a9a9a;
}
.separator {
  width: 1px;
  height: 24px;
  background: #e6e6e6;
  justify-self: center;
}
</style>
