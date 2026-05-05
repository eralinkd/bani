<template>
  <div v-if="pending" class="flex justify-center py-20">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
  </div>
  <AdminBlogPostForm
    v-else
    page-title="Редактирование поста"
    :post-id="id"
    :initial-post="post"
    :saving
    :deleting
    @save="save"
    @delete="remove"
  />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const id = computed(() => String(route.params.id ?? ''))

const { data: post, pending, refresh } = await useFetch(
  () => `/api/admin/blog-post/${id.value}`,
  { watch: [id] },
)

const saving = ref(false)
const deleting = ref(false)

async function save(body) {
  saving.value = true
  try {
    await $fetch(`/api/admin/blog-post/${id.value}`, { method: 'PUT', body })
    await refresh()
  } catch (e) {
    console.error(e)
    const msg = e?.data?.message || e?.message || 'Ошибка сохранения'
    alert(msg)
  } finally {
    saving.value = false
  }
}

async function remove() {
  if (!confirm('Удалить пост?')) return
  deleting.value = true
  try {
    await $fetch(`/api/admin/blog-post/${id.value}`, { method: 'DELETE' })
    await navigateTo('/admin/blog')
  } catch (e) {
    console.error(e)
  } finally {
    deleting.value = false
  }
}
</script>
