<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ReviewsDesktop from './desktop.vue'
import ReviewsMobile from './mobile.vue'

const isMobile = ref(false)

const checkIsMobile = () => {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', checkIsMobile)
})

const currentComponent = computed(() => (isMobile.value ? ReviewsMobile : ReviewsDesktop))
</script>
