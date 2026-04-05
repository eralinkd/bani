<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-2 text-2xl font-bold">LocalBusiness</h1>
    <p class="mb-6 text-sm text-gray-500">
      Структурированные данные для страниц «Контакты» и «О нас». Помогают поисковикам показывать адрес, телефон и часы работы прямо в выдаче.
    </p>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-4" @submit.prevent="save">
      <UCard>
        <template #header>
          <p class="font-semibold">Основное</p>
        </template>
        <div class="space-y-4">
          <UFormField label="Название (name)" class="w-full">
            <UInput v-model="form.name" class="w-full" placeholder="Бани 21 века" />
          </UFormField>
          <UFormField label="URL сайта (url)" class="w-full">
            <UInput v-model="form.url" class="w-full" placeholder="https://bani21veka.ru" />
          </UFormField>
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
          <p class="font-semibold">Адрес (address)</p>
        </template>
        <div class="space-y-4">
          <UFormField label="Улица, дом (streetAddress)" class="w-full">
            <UInput v-model="form.streetAddress" class="w-full" placeholder="ул. Примерная, д. 1" />
          </UFormField>
          <div class="grid grid-cols-2 gap-3">
            <UFormField label="Город (addressLocality)" class="w-full">
              <UInput v-model="form.addressLocality" class="w-full" placeholder="Пенза" />
            </UFormField>
            <UFormField label="Индекс (postalCode)" class="w-full">
              <UInput v-model="form.postalCode" class="w-full" placeholder="440000" />
            </UFormField>
          </div>
          <UFormField label="Страна (addressCountry)" class="w-full">
            <UInput v-model="form.addressCountry" class="w-full" placeholder="RU" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-semibold">Координаты (geo)</p>
        </template>
        <p class="mb-3 text-xs text-gray-400">Найти координаты можно на maps.yandex.ru — правый клик → «Что здесь?»</p>
        <div class="grid grid-cols-2 gap-3">
          <UFormField label="Широта (latitude)" class="w-full">
            <UInput v-model="form.latitude" class="w-full" placeholder="53.195038" />
          </UFormField>
          <UFormField label="Долгота (longitude)" class="w-full">
            <UInput v-model="form.longitude" class="w-full" placeholder="45.018316" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">Часы работы (openingHours)</p>
              <p class="text-xs text-gray-400">Формат: «Mo-Fr 09:00-18:00», «Sa 10:00-16:00»</p>
            </div>
            <UButton size="sm" variant="ghost" icon="i-lucide-plus" @click="addHours">Добавить</UButton>
          </div>
        </template>
        <div class="space-y-2">
          <p v-if="!form.openingHours.length" class="py-2 text-center text-sm text-gray-400">
            Нет записей
          </p>
          <div v-for="(_, i) in form.openingHours" :key="i" class="flex items-center gap-2">
            <UInput v-model="form.openingHours[i]" class="flex-1" placeholder="Mo-Fr 09:00-18:00" />
            <UButton size="sm" variant="ghost" color="error" icon="i-lucide-trash-2" @click="removeHours(i)" />
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

const { data, pending, refresh } = useFetch('/api/admin/local-business')
const saving = ref(false)
const saved = ref(false)

const form = ref({
  name: '', url: '', telephone: '', email: '',
  streetAddress: '', addressLocality: '', postalCode: '', addressCountry: 'RU',
  latitude: '', longitude: '',
  openingHours: [],
})

watch(data, (val) => {
  if (!val) return
  form.value = {
    name: val.name ?? '',
    url: val.url ?? '',
    telephone: val.telephone ?? '',
    email: val.email ?? '',
    streetAddress: val.streetAddress ?? '',
    addressLocality: val.addressLocality ?? '',
    postalCode: val.postalCode ?? '',
    addressCountry: val.addressCountry ?? 'RU',
    latitude: val.latitude ?? '',
    longitude: val.longitude ?? '',
    openingHours: Array.isArray(val.openingHours) ? [...val.openingHours] : [],
  }
}, { immediate: true })

const preview = computed(() => {
  const f = form.value
  const hasAddress = f.streetAddress || f.addressLocality || f.postalCode
  const hasGeo = f.latitude && f.longitude
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    ...(f.name && { name: f.name }),
    ...(f.url && { url: f.url }),
    ...(f.telephone && { telephone: f.telephone }),
    ...(f.email && { email: f.email }),
    ...(f.openingHours.filter(Boolean).length && { openingHours: f.openingHours.filter(Boolean) }),
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        ...(f.streetAddress && { streetAddress: f.streetAddress }),
        ...(f.addressLocality && { addressLocality: f.addressLocality }),
        ...(f.postalCode && { postalCode: f.postalCode }),
        ...(f.addressCountry && { addressCountry: f.addressCountry }),
      },
    }),
    ...(hasGeo && {
      geo: { '@type': 'GeoCoordinates', latitude: f.latitude, longitude: f.longitude },
    }),
  }
  return JSON.stringify(schema, null, 2)
})

function addHours() { form.value.openingHours.push('') }
function removeHours(i) { form.value.openingHours.splice(i, 1) }

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/local-business', { method: 'PUT', body: form.value })
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

