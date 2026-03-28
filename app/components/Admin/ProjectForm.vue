<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-6 flex items-center gap-3">
      <UButton
        variant="ghost"
        icon="i-lucide-arrow-left"
        size="sm"
        @click="navigateTo('/admin/projects')"
      />
      <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>

    <form class="space-y-4" @submit.prevent="submit">
      <UCard>
        <div class="space-y-4">
          <UFormField label="Название" class="w-full">
            <UInput v-model="form.title" class="w-full" placeholder="Название проекта" />
          </UFormField>

          <UFormField label="Категория" class="w-full">
            <select
              v-model="form.categoryId"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="" disabled>Выберите категорию</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.title }}
              </option>
            </select>
          </UFormField>

          <UFormField label="Описание" class="w-full">
            <UTextarea v-model="form.description" class="w-full" :rows="6" />
          </UFormField>

          <UFormField label="Текстовый блок 1" class="w-full">
            <UTextarea v-model="form.textBlock1" class="w-full" :rows="10" />
          </UFormField>

          <UFormField label="Текстовый блок 2" class="w-full">
            <UTextarea v-model="form.textBlock2" class="w-full" :rows="10" />
          </UFormField>

          <UFormField label="Ссылка на видео" class="w-full">
            <UInput v-model="form.videoUrl" class="w-full" placeholder="https://youtube.com/..." />
          </UFormField>

          <UFormField label="Порядок сортировки" class="w-full">
            <UInput v-model.number="form.sortOrder" type="number" class="w-full" />
          </UFormField>
        </div>
      </UCard>

      <!-- Images -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Изображения</h2>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" @click="addImage"
              >Добавить</UButton
            >
          </div>
        </template>
        <div v-if="!form.images.length" class="py-4 text-center text-sm text-gray-400">
          Нет изображений
        </div>
        <div v-else class="space-y-3">
          <div v-for="(_, i) in form.images" :key="i" class="relative">
            <AdminImagePicker v-model="form.images[i]" :label="`Изображение ${i + 1}`" />
            <UButton
              size="xs"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              class="absolute right-0 top-0"
              @click="removeImage(i)"
            />
          </div>
        </div>
      </UCard>

      <div class="flex items-center gap-3">
        <UButton type="submit" :loading="saving">Сохранить</UButton>
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  initial: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
  saving: { type: Boolean, default: false },
  saved: { type: Boolean, default: false },
})

const emit = defineEmits(['submit'])

const emptyForm = () => ({
  title: '',
  description: '',
  textBlock1: '',
  textBlock2: '',
  videoUrl: '',
  categoryId: '',
  sortOrder: 0,
  images: [],
})

const form = ref(emptyForm())

watch(
  () => props.initial,
  (val) => {
    if (!val) return
    form.value = {
      title: val.title ?? '',
      description: val.description ?? '',
      textBlock1: val.textBlock1 ?? '',
      textBlock2: val.textBlock2 ?? '',
      videoUrl: val.videoUrl ?? '',
      categoryId: val.categoryId ?? '',
      sortOrder: val.sortOrder ?? 0,
      images: Array.isArray(val.images) ? [...val.images] : [],
    }
  },
  { immediate: true },
)

function addImage() {
  form.value.images.push('')
}

function removeImage(i) {
  form.value.images.splice(i, 1)
}

function submit() {
  const data = { ...form.value, images: form.value.images.filter(Boolean) }
  emit('submit', data)
}
</script>
