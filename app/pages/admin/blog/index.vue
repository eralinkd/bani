<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Блог</h1>
      <UButton icon="i-lucide-plus" @click="navigateTo('/admin/blog/new')">Новый пост</UButton>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <UCard v-else>
      <div v-if="!data?.length" class="py-8 text-center text-gray-400">Пока нет постов</div>
      <ul v-else class="divide-y divide-gray-100">
        <li
          v-for="post in data"
          :key="post.id"
          class="flex items-center justify-between gap-4 px-1 py-3"
        >
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <div class="h-12 w-16 shrink-0 overflow-hidden rounded bg-gray-100">
              <img
                v-if="post.coverImage"
                :src="post.coverImage"
                alt=""
                class="h-full w-full object-cover"
              />
              <div v-else class="flex h-full w-full items-center justify-center">
                <UIcon name="i-lucide-image" class="size-4 text-gray-300" />
              </div>
            </div>
            <div class="min-w-0">
              <p class="truncate font-medium">{{ post.title }}</p>
              <p class="truncate text-xs text-gray-400">
                /{{ post.slug }} · {{ post.published ? 'опубликован' : 'черновик' }} ·
                {{ formatDate(post.updatedAt) }}
              </p>
            </div>
          </div>
          <div class="flex shrink-0 gap-2">
            <UButton
              size="sm"
              variant="ghost"
              icon="i-lucide-pencil"
              @click="navigateTo(`/admin/blog/${post.id}`)"
            />
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              :loading="deletingId === post.id"
              @click="remove(post.id)"
            />
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/blog-posts')
const deletingId = ref(null)

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

async function remove(id) {
  if (!confirm('Удалить пост?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/admin/blog-post/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    deletingId.value = null
  }
}
</script>
