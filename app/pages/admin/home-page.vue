<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Контент главной страницы</h1>
      <p class="mt-1 text-sm text-gray-500">
        Блок «Уже построили» на главной и на страницах каталога (слайдер с фото).
      </p>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-6" @submit.prevent="save">
      <UCard>
        <template #header>
          <h2 class="font-semibold">Тексты</h2>
        </template>
        <div class="space-y-4">
          <UFormField label="Заголовок" class="w-full">
            <UInput v-model="form.title" class="w-full" placeholder="Уже построили" />
          </UFormField>
          <UFormField label="Подзаголовок" class="w-full">
            <UTextarea v-model="form.subtitle" class="w-full" :rows="5" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Слайды</h2>
            <UButton
              size="sm"
              variant="outline"
              icon="i-lucide-plus"
              type="button"
              @click="addSlide"
            >
              Добавить
            </UButton>
          </div>
        </template>
        <div v-if="!form.slides.length" class="py-4 text-center text-sm text-gray-400">
          Нет слайдов — добавьте фото
        </div>
        <div v-else class="space-y-6">
          <div
            v-for="(slide, i) in form.slides"
            :key="i"
            class="relative rounded-lg border border-gray-100 p-4"
          >
            <UButton
              size="xs"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              class="absolute right-2 top-2 z-2"
              type="button"
              @click="removeSlide(i)"
            />
            <AdminImagePicker v-model="slide.image" :label="`Фото ${i + 1}`" />
            <UFormField label="Подпись на слайде" class="mt-3 w-full">
              <UInput v-model="slide.caption" class="w-full" placeholder="Например: Баня в Пензе" />
            </UFormField>
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
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = await useAsyncData('admin-projects-slider', () =>
  $fetch('/api/admin/projects-slider'),
)

const form = ref({
  title: '',
  subtitle: '',
  slides: [],
})

watch(
  data,
  (val) => {
    if (!val) return
    form.value = {
      title: val.title ?? '',
      subtitle: val.subtitle ?? '',
      slides: Array.isArray(val.slides) ? val.slides.map((s) => ({ ...s })) : [],
    }
  },
  { immediate: true },
)

function addSlide() {
  form.value.slides.push({ image: '', caption: '' })
}

function removeSlide(i) {
  form.value.slides.splice(i, 1)
}

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/projects-slider', {
      method: 'PUT',
      body: {
        title: form.value.title,
        subtitle: form.value.subtitle,
        slides: form.value.slides,
      },
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
