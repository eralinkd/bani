<template>
  <AdminProductForm title="Новый товар" :categories="categories" :saving="saving" @submit="create" />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const saving = ref(false)
const { data: categories } = useFetch('/api/admin/product-categories')

async function create(form) {
  saving.value = true
  try {
    const product = await $fetch('/api/admin/products', { method: 'POST', body: form })
    await navigateTo(`/admin/products/${product.id}`)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>

