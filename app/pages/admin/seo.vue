<template>
  <div class="mx-auto max-w-xl">
    <h1 class="mb-6 text-2xl font-bold">SEO</h1>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-4" @submit.prevent="save">
      <UCard>
        <div class="space-y-4">
          <UFormField label="Заголовок сайта" class="w-full">
            <UInput v-model="form.title" class="w-full" placeholder="Бани 21 века" />
          </UFormField>
          <UFormField label="Мета-описание" class="w-full">
            <UTextarea v-model="form.description" class="w-full" :rows="4" placeholder="Описание сайта для поисковых систем" />
          </UFormField>
        </div>
        <template #footer>
          <div class="flex items-center gap-3">
            <UButton type="submit" :loading="saving">Сохранить</UButton>
            <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
          </div>
        </template>
      </UCard>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/seo')
const saving = ref(false)
const saved = ref(false)

const form = ref({ title: '', description: '' })

watch(data, (val) => {
  if (!val) return
  form.value = { title: val.title ?? '', description: val.description ?? '' }
}, { immediate: true })

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/seo', { method: 'PUT', body: form.value })
    saved.value = true
    await refresh()
    setTimeout(() => { saved.value = false }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
