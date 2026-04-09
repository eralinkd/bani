<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Заголовки страниц каталога</h1>
    </div>

    <p class="mb-4 text-sm text-gray-500">
      Заголовок отображается на странице категории (под навигацией). Если не заполнен — используется
      стандартное название категории.
    </p>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <UCard v-else>
      <div class="space-y-4">
        <div v-for="cat in categories" :key="cat.id" class="flex items-center gap-4">
          <div class="w-40 shrink-0">
            <p class="text-sm font-medium text-gray-700">{{ cat.title }}</p>
            <p class="text-xs text-gray-400">{{ cat.slug }}</p>
          </div>
          <UInput
            v-model="pageTitles[cat.slug]"
            class="flex-1"
            :placeholder="cat.title"
          />
        </div>

        <div v-if="!categories.length" class="py-6 text-center text-gray-400">
          Категорий нет
        </div>
      </div>

      <template #footer>
        <div class="flex items-center gap-3">
          <UButton :loading="saving" @click="save">Сохранить</UButton>
          <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending } = await useAsyncData('admin-category-page-titles', () =>
  $fetch('/api/admin/category-page-titles'),
)

const categories = computed(() => data.value ?? [])

const pageTitles = ref({})

watch(
  data,
  (val) => {
    if (!val) return
    const map = {}
    for (const cat of val) {
      map[cat.slug] = cat.pageTitle ?? ''
    }
    pageTitles.value = map
  },
  { immediate: true },
)

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/category-page-titles', {
      method: 'PUT',
      body: pageTitles.value,
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 2500)
  } finally {
    saving.value = false
  }
}
</script>
