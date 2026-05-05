<template>
  <AdminBlogPostForm page-title="Новый пост" :saving @save="create" />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const saving = ref(false)

async function create(body) {
  saving.value = true
  try {
    const post = await $fetch('/api/admin/blog-posts', { method: 'POST', body })
    await navigateTo(`/admin/blog/${post.id}`)
  } catch (e) {
    console.error(e)
    const msg = e?.data?.message || e?.message || 'Ошибка сохранения'
    alert(msg)
  } finally {
    saving.value = false
  }
}
</script>
