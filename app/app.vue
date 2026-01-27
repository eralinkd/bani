<template>
  <NuxtLayout>
    <NuxtPage />
    <UIModal v-model="modalIsOpen" :type="modalTypeValue" />
  </NuxtLayout>
</template>

<script setup>
import { useModal } from './composables/useModal'

const modal = useModal()

const { data: seoResponse } = await useAsyncData('seo', () => $fetch('/api/seo'))

const seo = computed(() => {
  const raw = seoResponse.value?.seo
  if (raw && typeof raw === 'object') return raw
  return {}
})

useHead(() => ({
  title: seo.value.title || 'Бани 21 века',
  meta: [{ name: 'description', content: seo.value.description || '' }],
}))

const modalIsOpen = computed({
  get: () => modal.isOpen.value,
  set: (value) => {
    if (value) {
      modal.open(modal.modalType.value)
    } else {
      modal.close()
    }
  },
})

const modalTypeValue = computed(() => modal.modalType.value)
</script>
