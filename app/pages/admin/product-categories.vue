<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Категории товаров</h1>
      <UButton icon="i-lucide-plus" @click="openCreate">Добавить</UButton>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <UCard v-else>
      <div v-if="!data?.length" class="py-8 text-center text-gray-400">Категорий пока нет</div>
      <ul v-else class="divide-y divide-gray-100">
        <li v-for="cat in data" :key="cat.id" class="flex items-center justify-between px-1 py-3">
          <div>
            <p class="font-medium">{{ cat.title }}</p>
            <p class="text-xs text-gray-400">slug: {{ cat.slug }} · Порядок: {{ cat.sortOrder }}</p>
          </div>
          <div class="flex gap-2">
            <UButton size="sm" variant="ghost" icon="i-lucide-pencil" @click="openEdit(cat)" />
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              :loading="deletingId === cat.id"
              @click="deleteCategory(cat.id)"
            />
          </div>
        </li>
      </ul>
    </UCard>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-[400px] rounded-xl bg-white p-6 shadow-2xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ editItem ? 'Редактировать' : 'Новая категория' }}</h2>
            <UButton variant="ghost" icon="i-lucide-x" size="sm" @click="showModal = false" />
          </div>
          <div class="space-y-3">
            <UFormField label="Название" class="w-full">
              <UInput v-model="form.title" class="w-full" />
            </UFormField>
            <UFormField label="Slug (латиница, дефис)" class="w-full">
              <UInput v-model="form.slug" class="w-full" placeholder="my-category" />
            </UFormField>
            <UFormField label="Порядок сортировки" class="w-full">
              <UInput v-model.number="form.sortOrder" type="number" class="w-full" />
            </UFormField>
          </div>
          <div class="mt-4 flex justify-end gap-2">
            <UButton variant="ghost" @click="showModal = false">Отмена</UButton>
            <UButton :loading="saving" :disabled="!form.title.trim() || !form.slug.trim()" @click="saveCategory">
              {{ editItem ? 'Сохранить' : 'Создать' }}
            </UButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/product-categories')

const showModal = ref(false)
const editItem = ref(null)
const saving = ref(false)
const deletingId = ref(null)
const form = ref({ title: '', slug: '', sortOrder: 0 })

function openCreate() {
  editItem.value = null
  form.value = { title: '', slug: '', sortOrder: 0 }
  showModal.value = true
}

function openEdit(cat) {
  editItem.value = cat
  form.value = { title: cat.title, slug: cat.slug, sortOrder: cat.sortOrder }
  showModal.value = true
}

async function saveCategory() {
  saving.value = true
  try {
    if (editItem.value) {
      await $fetch(`/api/admin/product-categories/${editItem.value.id}`, { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/admin/product-categories', { method: 'POST', body: form.value })
    }
    await refresh()
    showModal.value = false
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

async function deleteCategory(id) {
  if (!confirm('Удалить категорию?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/admin/product-categories/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    deletingId.value = null
  }
}
</script>
