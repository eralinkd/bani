<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Отзывы</h1>
    </div>

    <!-- Ссылки на платформы -->
    <UCard class="mb-6">
      <template #header>
        <h2 class="font-semibold text-lg">Ссылки на отзывы</h2>
      </template>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UFormField label="2ГИС">
          <UInput v-model="links.gis2" placeholder="https://2gis.ru/..." class="w-full" />
        </UFormField>
        <UFormField label="Google Карты">
          <UInput v-model="links.google" placeholder="https://maps.google.com/..." class="w-full" />
        </UFormField>
        <UFormField label="Яндекс Карты">
          <UInput v-model="links.yandex" placeholder="https://yandex.ru/maps/..." class="w-full" />
        </UFormField>
      </div>

      <template #footer>
        <div class="flex items-center gap-3">
          <UButton :loading="savingLinks" @click="saveLinks">Сохранить ссылки</UButton>
          <span v-if="linksSaved" class="text-sm text-green-600">Сохранено</span>
        </div>
      </template>
    </UCard>

    <!-- Список отзывов -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-lg">Список отзывов ({{ reviews.length }})</h2>
          <UButton icon="i-heroicons-plus" size="sm" @click="addReview">Добавить отзыв</UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div
          v-for="(review, index) in reviews"
          :key="review.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <span class="text-sm text-gray-500 font-medium mt-1">№{{ index + 1 }}</span>
            <div class="flex gap-2 shrink-0">
              <UButton
                icon="i-heroicons-arrow-up"
                size="xs"
                variant="ghost"
                :disabled="index === 0"
                @click="moveUp(index)"
              />
              <UButton
                icon="i-heroicons-arrow-down"
                size="xs"
                variant="ghost"
                :disabled="index === reviews.length - 1"
                @click="moveDown(index)"
              />
              <UButton
                icon="i-heroicons-trash"
                size="xs"
                variant="ghost"
                color="error"
                @click="removeReview(index)"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <UFormField label="Имя автора">
              <UInput v-model="review.name" placeholder="Имя Фамилия" class="w-full" />
            </UFormField>
            <UFormField label="Дата">
              <UInput v-model="review.date" placeholder="30 июля 2025" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Текст отзыва" class="mt-3">
            <UTextarea
              v-model="review.content"
              placeholder="Текст отзыва... Поддерживаются переносы строк."
              :rows="4"
              class="w-full"
            />
          </UFormField>
        </div>

        <div v-if="reviews.length === 0" class="text-center text-gray-400 py-8">
          Нет отзывов. Нажмите «Добавить отзыв», чтобы создать первый.
        </div>
      </div>

      <template #footer>
        <div class="flex items-center gap-3">
          <UButton :loading="savingReviews" @click="saveReviews">Сохранить отзывы</UButton>
          <span v-if="reviewsSaved" class="text-sm text-green-600">Сохранено</span>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data: initialData } = await useAsyncData('admin-reviews', () => $fetch('/api/admin/reviews'))

const reviews = ref(
  (initialData.value?.reviews ?? []).map((r) => ({ ...r }))
)

const links = reactive({
  gis2: initialData.value?.links?.gis2 ?? '',
  google: initialData.value?.links?.google ?? '',
  yandex: initialData.value?.links?.yandex ?? '',
})

const savingLinks = ref(false)
const linksSaved = ref(false)
const savingReviews = ref(false)
const reviewsSaved = ref(false)

function addReview() {
  reviews.value.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: '',
    date: '',
    content: '',
    sortOrder: reviews.value.length,
  })
}

function removeReview(index) {
  reviews.value.splice(index, 1)
}

function moveUp(index) {
  if (index === 0) return
  const arr = reviews.value
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
}

function moveDown(index) {
  if (index === reviews.value.length - 1) return
  const arr = reviews.value
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
}

async function saveLinks() {
  savingLinks.value = true
  linksSaved.value = false
  try {
    await $fetch('/api/admin/review-links', {
      method: 'PUT',
      body: { gis2: links.gis2, google: links.google, yandex: links.yandex },
    })
    linksSaved.value = true
    setTimeout(() => { linksSaved.value = false }, 2500)
  } finally {
    savingLinks.value = false
  }
}

async function saveReviews() {
  savingReviews.value = true
  reviewsSaved.value = false
  try {
    await $fetch('/api/admin/reviews', {
      method: 'PUT',
      body: { reviews: reviews.value.map((r, i) => ({ ...r, sortOrder: i })) },
    })
    reviewsSaved.value = true
    setTimeout(() => { reviewsSaved.value = false }, 2500)
  } finally {
    savingReviews.value = false
  }
}
</script>
