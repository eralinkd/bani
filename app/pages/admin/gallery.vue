<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Галерея по категориям проектов</h1>
      <p class="mt-2 text-sm text-gray-500">
        Для каждой категории из раздела «Кат. проектов» можно задать набор изображений. Картинки
        выбираются из медиатеки, как у товаров и проектов.
      </p>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="space-y-6">
      <UCard v-for="section in sections" :key="section.id">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">{{ section.title }}</h2>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" @click="addImage(section.id)">
              Добавить
            </UButton>
          </div>
        </template>

        <div v-if="!section.images.length" class="py-4 text-center text-sm text-gray-400">
          Нет изображений
        </div>
        <div v-else class="grid grid-cols-2 gap-3">
          <div v-for="(_, i) in section.images" :key="`${section.id}-${i}`" class="relative">
            <AdminImagePicker v-model="section.images[i]" :label="`Изображение ${i + 1}`" />
            <UButton
              size="xs"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              class="absolute right-0 top-0"
              @click="removeImage(section.id, i)"
            />
          </div>
        </div>
      </UCard>

      <div v-if="!sections.length" class="rounded-lg border border-dashed border-gray-200 py-12 text-center text-gray-400">
        Категорий проектов нет. Сначала добавьте их в разделе «Кат. проектов».
      </div>

      <div v-if="sections.length" class="flex items-center gap-3">
        <UButton :loading="saving" @click="save">Сохранить</UButton>
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = await useAsyncData('admin-project-gallery', () =>
  $fetch('/api/admin/project-gallery'),
)

const sections = ref([])

watch(
  data,
  (val) => {
    if (!val) {
      sections.value = []
      return
    }
    sections.value = val.map((row) => ({
      id: row.id,
      title: row.title,
      sortOrder: row.sortOrder,
      images: [...row.images],
    }))
  },
  { immediate: true },
)

function sectionById(id) {
  return sections.value.find((s) => s.id === id)
}

function addImage(categoryId) {
  const s = sectionById(categoryId)
  if (s) s.images.push('')
}

function removeImage(categoryId, index) {
  const s = sectionById(categoryId)
  if (s) s.images.splice(index, 1)
}

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    const gallery = {}
    for (const s of sections.value) {
      gallery[s.id] = s.images.filter(Boolean)
    }
    await $fetch('/api/admin/project-gallery', {
      method: 'PUT',
      body: { gallery },
    })
    await refresh()
    saved.value = true
    setTimeout(() => {
      saved.value = false
    }, 2500)
  } finally {
    saving.value = false
  }
}
</script>
