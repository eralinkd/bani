<template>
  <AdminProjectForm title="Новый проект" :categories="categories" :saving="saving" @submit="create" />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const saving = ref(false)
const { data: categories } = useFetch('/api/admin/project-categories')

async function create(form) {
  saving.value = true
  try {
    const project = await $fetch('/api/admin/projects', { method: 'POST', body: form })
    await navigateTo(`/admin/projects/${project.id}`)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
