<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-2 text-2xl font-bold">Разметка Organization</h1>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-4" @submit.prevent="save">
      <UCard>
        <template #header>
          <p class="font-semibold">Основное</p>
        </template>
        <div class="space-y-4">
          <UFormField label="Название компании (name)" class="w-full">
            <UInput v-model="form.name" class="w-full" placeholder="Бани 21 века" />
          </UFormField>
          <UFormField label="URL сайта (url)" class="w-full">
            <UInput v-model="form.url" class="w-full" placeholder="https://bani21veka.ru" />
          </UFormField>
          <UFormField label="URL логотипа (logo)" class="w-full">
            <UInput
              v-model="form.logo"
              class="w-full"
              placeholder="https://bani21veka.ru/favicon.svg"
            />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-semibold">Контакты (contactPoint)</p>
        </template>
        <div class="space-y-4">
          <UFormField label="Телефон (telephone)" class="w-full">
            <UInput v-model="form.telephone" class="w-full" placeholder="+7-936-122-66-88" />
          </UFormField>
          <UFormField label="Email" class="w-full">
            <UInput v-model="form.email" class="w-full" placeholder="info@bani21veka.ru" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <p class="font-semibold">Соцсети (sameAs)</p>
            <UButton size="sm" variant="ghost" icon="i-lucide-plus" @click="addSameAs"
              >Добавить</UButton
            >
          </div>
        </template>
        <div class="space-y-2">
          <p v-if="!form.sameAs.length" class="py-2 text-center text-sm text-gray-400">
            Нет ссылок
          </p>
          <div v-for="(_, i) in form.sameAs" :key="i" class="flex items-center gap-2">
            <UInput v-model="form.sameAs[i]" class="flex-1" placeholder="https://vk.com/..." />
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              @click="removeSameAs(i)"
            />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-semibold">Предпросмотр JSON-LD</p>
        </template>
        <pre class="overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-700">{{ preview }}</pre>
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

const { data, pending, refresh } = useFetch('/api/admin/org-schema')
const saving = ref(false)
const saved = ref(false)

const form = ref({ name: '', url: '', logo: '', telephone: '', email: '', sameAs: [] })

watch(
  data,
  (val) => {
    if (!val) return
    form.value = {
      name: val.name ?? '',
      url: val.url ?? '',
      logo: val.logo ?? '',
      telephone: val.telephone ?? '',
      email: val.email ?? '',
      sameAs: Array.isArray(val.sameAs) ? [...val.sameAs] : [],
    }
  },
  { immediate: true },
)

const preview = computed(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...(form.value.name && { name: form.value.name }),
    ...(form.value.url && { url: form.value.url }),
    ...(form.value.logo && { logo: form.value.logo }),
    ...(form.value.sameAs.filter(Boolean).length && { sameAs: form.value.sameAs.filter(Boolean) }),
    ...((form.value.telephone || form.value.email) && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        ...(form.value.telephone && { telephone: form.value.telephone }),
        ...(form.value.email && { email: form.value.email }),
      },
    }),
  }
  return JSON.stringify(schema, null, 2)
})

function addSameAs() {
  form.value.sameAs.push('')
}

function removeSameAs(i) {
  form.value.sameAs.splice(i, 1)
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/org-schema', { method: 'PUT', body: form.value })
    saved.value = true
    await refresh()
    setTimeout(() => {
      saved.value = false
    }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
