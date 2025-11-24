<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click="close" />
    </Transition>
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-container"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <div class="modal-content">
          <button aria-label="Закрыть" class="modal-close" @click="close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#41424c"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.16998 14.83L14.83 9.16998"
                stroke="#41424c"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.83 14.83L9.16998 9.16998"
                stroke="#41424c"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <h2 class="modal-title">{{ modalConfig.title }}</h2>
          <p class="modal-description">
            {{ modalConfig.description }}
          </p>

          <form class="modal-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-field">
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Ваше имя"
                  class="form-input"
                  :class="{ error: errors.name }"
                  @blur="validateField('name')"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-field">
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+7 (000) 000-00-00"
                  class="form-input"
                  :class="{ error: errors.phone }"
                  @input="formatPhone"
                  @blur="validateField('phone')"
                />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>

            <div class="form-bottom-row">
              <UIButton small type="submit" :disabled="isSubmitting" class="submit-button">
                Отправить
              </UIButton>

              <div class="form-checkbox-wrapper">
                <label class="form-checkbox">
                  <input
                    v-model="formData.agreed"
                    type="checkbox"
                    class="checkbox-input"
                    :class="{ error: errors.agreed }"
                    @change="onCheckboxChange"
                  />
                  <span
                    class="checkbox-custom"
                    :class="{ checked: formData.agreed, error: errors.agreed }"
                  >
                    <svg
                      v-if="formData.agreed"
                      width="17"
                      height="17"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style="display: block"
                    >
                      <path d="M8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#ffffff" />
                    </svg>
                  </span>
                  <span class="checkbox-label"
                    >Я согласен с политикой <br />
                    конфиденциальности</span
                  >
                </label>
                <span v-if="errors.agreed" class="error-message">{{ errors.agreed }}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'discount', 'installment'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

const modalConfigs = {
  default: {
    title: 'Оставьте заявку',
    description: 'Оставьте свои контактные данные и наш менеджер свяжется с вами в ближайшее время',
  },
  discount: {
    title: 'Хотите получить скидку?',
    description: 'Оставьте свои контактные данные и наш менеджер свяжется с вами в ближайшее время',
  },
  installment: {
    title: 'Хотите воспользоваться беспроцентной рассрочкой?',
    description: 'Оставьте свои контактные данные и наш менеджер свяжется с вами в ближайшее время',
  },
}

const modalConfig = computed(() => modalConfigs[props.type] || modalConfigs.default)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const formData = reactive({
  name: '',
  phone: '',
  agreed: false,
})

const errors = reactive({
  name: '',
  phone: '',
  agreed: '',
})

const isSubmitting = ref(false)

function formatPhone(event) {
  const input = event.target
  let value = input.value.replace(/\D/g, '')

  // Если начинается с 8, заменяем на 7
  if (value.startsWith('8')) {
    value = '7' + value.slice(1)
  }

  // Если начинается с 7, убираем её (она будет добавлена в формате)
  if (value.startsWith('7')) {
    value = value.slice(1)
  }

  // Ограничиваем до 10 цифр
  if (value.length > 10) {
    value = value.slice(0, 10)
  }

  // Форматируем номер
  let formatted = '+7'
  if (value.length > 0) {
    formatted += ' (' + value.slice(0, 3)
  }
  if (value.length >= 4) {
    formatted += ') ' + value.slice(3, 6)
  }
  if (value.length >= 7) {
    formatted += '-' + value.slice(6, 8)
  }
  if (value.length >= 9) {
    formatted += '-' + value.slice(8, 10)
  }

  formData.phone = formatted
}

function onCheckboxChange() {
  if (formData.agreed) {
    errors.agreed = ''
  }
}

function validateField(field) {
  errors[field] = ''

  if (field === 'name') {
    if (!formData.name.trim()) {
      errors.name = 'Поле обязательно для заполнения'
    }
  }

  if (field === 'phone') {
    const phoneDigits = formData.phone.replace(/\D/g, '')
    // Проверяем, что есть минимум 10 цифр (после удаления 7 в начале должно остаться 10)
    const digitsCount = phoneDigits.length
    // Если начинается с 7, проверяем что всего 11 цифр, иначе минимум 10
    const isValid =
      (phoneDigits.startsWith('7') && digitsCount === 11) ||
      (!phoneDigits.startsWith('7') && digitsCount >= 10)
    if (!formData.phone || !isValid) {
      errors.phone = 'Введите корректный номер телефона'
    }
  }

  if (field === 'agreed') {
    if (!formData.agreed) {
      errors.agreed = 'Необходимо согласие с политикой конфиденциальности'
    }
  }
}

function validateForm() {
  validateField('name')
  validateField('phone')
  validateField('agreed')

  return !errors.name && !errors.phone && !errors.agreed
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  // Здесь можно добавить отправку данных на сервер
  console.log('Данные формы:', {
    name: formData.name.trim(),
    phone: formData.phone,
    agreed: formData.agreed,
  })

  setTimeout(() => {
    isSubmitting.value = false
    resetForm()
    close()
  }, 500)
}

function resetForm() {
  formData.name = ''
  formData.phone = ''
  formData.agreed = false
  errors.name = ''
  errors.phone = ''
  errors.agreed = ''
}

function close() {
  isOpen.value = false
  resetForm()
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      resetForm()
    }
  },
)
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

.modal-container {
  max-height: 100vh;
  height: 100vh;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  overflow: hidden;
}

.modal-content {
  background: $white;
  border-radius: 25px;
  padding: 60px 84px 50px;
  max-width: 688px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: $mobileBreakpoint) {
    padding: 40px 20px 30px;
    border-radius: 20px;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}

.modal-title {
  font-family: Inter, sans-serif;
  font-size: 36px;
  font-weight: 400;
  line-height: normal;
  color: $text;
  text-align: center;
  margin: 0 0 10px;

  @media (max-width: $mobileBreakpoint) {
    font-size: 28px;
  }
}

.modal-description {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  color: $text;
  text-align: center;
  margin: 0 0 30px;

  @media (max-width: $mobileBreakpoint) {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-input {
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  background: $white;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: $text;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #41424c;
  }

  &:focus {
    border-color: $text;
  }

  &.error {
    border-color: #ff4444;
  }
}

.error-message {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #ff4444;
  margin-top: 5px;
}

.form-bottom-row {
  display: flex;
  align-items: flex-start;
  // justify-content: space-between;
  gap: 20px;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column;
    align-items: stretch;
  }
}

.form-checkbox-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 27px;
  height: 27px;
  border: 1px solid #41424c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  background: $white;

  &.checked {
    border-color: $text;
    background: #41424c;
  }

  &.error {
    border-color: #ff4444;
  }

  svg {
    position: relative;
    left: -1px;
    top: 1px;
    width: 20px;
    height: 20px;
  }
}

.checkbox-label {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: $text;
  line-height: 1.5;
}

.submit-button {
  min-width: 200px;
  flex-shrink: 0;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>

<style>
body:has(.modal-container) {
  max-height: 100vh;
  height: 100vh;

  overflow: hidden !important;
}

html:has(.modal-container) {
  /* max-height: 100vh;
  height: 100vh; */

  /* overflow: hidden !important; */
}
</style>
