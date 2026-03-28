<template>
  <div v-if="pending" class="flex justify-center py-20">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
  </div>
  <AdminProjectForm
    v-else
    title="Редактировать проект"
    :initial="data"
    :categories="categories"
    :saving="saving"
    :saved="saved"
    @submit="update"
  />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const { data, pending, refresh } = useFetch(`/api/admin/project/${route.params.id}`)
const { data: categories } = useFetch('/api/admin/project-categories')
const saving = ref(false)
const saved = ref(false)

async function update(form) {
  saving.value = true
  saved.value = false
  try {
    await $fetch(`/api/admin/project/${route.params.id}`, { method: 'PUT', body: form })
    saved.value = true
    await refresh()
    setTimeout(() => { saved.value = false }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
