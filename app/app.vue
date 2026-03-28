<template>
  <NuxtLayout>
    <NuxtPage />
    <UIModal v-model="modalIsOpen" :type="modalTypeValue" />
  </NuxtLayout>
</template>

<script setup>
import { useModal } from './composables/useModal'

const route = useRoute()
const modal = useModal()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const { data: seoResponse } = await useAsyncData('seo', () => $fetch('/api/seo'))

const seo = computed(() => {
  const val = seoResponse.value
  if (!val || typeof val !== 'object') return {}
  return val
})

useHead(() => ({
  htmlAttrs: {
    class: isAdmin.value ? 'admin-root' : 'site-content',
  },
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
