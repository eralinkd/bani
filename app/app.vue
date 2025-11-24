<template>
  <NuxtLayout>
    <NuxtPage />
    <UIModal v-model="modalIsOpen" :type="modalTypeValue" />
  </NuxtLayout>
</template>

<script setup>
import { useModal } from './composables/useModal'

const modal = useModal()

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

