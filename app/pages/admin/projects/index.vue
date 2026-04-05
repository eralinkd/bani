<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Проекты</h1>
      <UButton icon="i-lucide-plus" @click="navigateTo('/admin/projects/new')">Добавить</UButton>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <UCard v-else>
      <div v-if="!data?.length" class="py-8 text-center text-gray-400">Проектов пока нет</div>
      <ul v-else class="divide-y divide-gray-100">
        <li
          v-for="project in data"
          :key="project.id"
          class="flex items-center justify-between px-1 py-3"
        >
          <div class="flex items-center gap-3">
            <div class="h-12 w-16 shrink-0 overflow-hidden rounded bg-gray-100">
              <img
                v-if="project.images?.[0]"
                :src="project.images[0]"
                class="h-full w-full object-cover"
                alt=""
              />
              <div v-else class="flex h-full w-full items-center justify-center">
                <UIcon name="i-lucide-image" class="size-4 text-gray-300" />
              </div>
            </div>
            <div>
              <p class="font-medium">{{ project.title }}</p>
              <p class="text-xs text-gray-400">{{ project.category?.title ?? '—' }} · Порядок: {{ project.sortOrder }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <UButton size="sm" variant="ghost" icon="i-lucide-pencil" @click="navigateTo(`/admin/projects/${project.id}`)" />
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              :loading="deletingId === project.id"
              @click="deleteProject(project.id)"
            />
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/projects')
const deletingId = ref(null)

async function deleteProject(id) {
  if (!confirm('Удалить проект?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/admin/project/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    deletingId.value = null
  }
}
</script>

