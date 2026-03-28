<template>
  <div class="mx-auto max-w-3xl">
    <div class="mb-6 flex items-center gap-3">
      <UButton variant="ghost" icon="i-lucide-arrow-left" size="sm" @click="navigateTo('/admin/products')" />
      <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>

    <form class="space-y-4" @submit.prevent="submit">
      <!-- Main fields -->
      <UCard>
        <template #header><h2 class="font-semibold">Основное</h2></template>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Название" class="w-full">
              <UInput v-model="form.title" class="w-full" />
            </UFormField>
            <UFormField label="Slug" class="w-full">
              <UInput v-model="form.slug" class="w-full" placeholder="my-product" />
            </UFormField>
          </div>

          <UFormField label="Категория" class="w-full">
            <select v-model="form.categoryId" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="" disabled>Выберите категорию</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
            </select>
          </UFormField>

          <UFormField label="Описание" class="w-full">
            <UTextarea v-model="form.description" class="w-full" :rows="4" />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Материалы" class="w-full">
              <UInput v-model="form.materials" class="w-full" />
            </UFormField>
            <UFormField label="Печь" class="w-full">
              <UInput v-model="form.stove" class="w-full" />
            </UFormField>
          </div>

          <div class="flex items-center gap-2">
            <input id="isPopular" v-model="form.isPopular" type="checkbox" class="rounded border-gray-300" />
            <label for="isPopular" class="text-sm font-medium text-gray-700">Популярный товар</label>
          </div>

          <UFormField label="Порядок сортировки" class="w-full">
            <UInput v-model.number="form.sortOrder" type="number" class="w-full" />
          </UFormField>
        </div>
      </UCard>

      <!-- HTML sections -->
      <UCard>
        <template #header><h2 class="font-semibold">HTML-блоки</h2></template>
        <div class="space-y-4">
          <UFormField label="Интерьер (HTML)" class="w-full">
            <UTextarea v-model="form.interiorHtml" class="w-full font-mono text-xs" :rows="5" />
          </UFormField>
          <UFormField label="Характеристики (HTML)" class="w-full">
            <UTextarea v-model="form.characteristicsHtml" class="w-full font-mono text-xs" :rows="5" />
          </UFormField>
          <UFormField label="Комплектация (HTML)" class="w-full">
            <UTextarea v-model="form.kitHtml" class="w-full font-mono text-xs" :rows="5" />
          </UFormField>
        </div>
      </UCard>

      <!-- Sizes -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Размеры и цены</h2>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" @click="addSize">Добавить</UButton>
          </div>
        </template>
        <div v-if="!form.sizes.length" class="py-4 text-center text-sm text-gray-400">Нет размеров</div>
        <div v-else class="space-y-3">
          <div v-for="(size, i) in form.sizes" :key="i" class="flex items-end gap-2 rounded-lg border border-gray-100 p-3">
            <UFormField label="Метка" class="w-full">
              <UInput v-model="size.label" class="w-full" placeholder="3×4 м" />
            </UFormField>
            <UFormField label="Значение" class="w-full">
              <UInput v-model="size.value" class="w-full" placeholder="3x4" />
            </UFormField>
            <UFormField label="Цена (₽)" class="w-full">
              <UInput v-model.number="size.price" type="number" class="w-full" />
            </UFormField>
            <UFormField label="Артикул" class="w-full">
              <UInput v-model="size.code" class="w-full" placeholder="BN-001" />
            </UFormField>
            <UButton
              variant="ghost"
              color="error"
              icon="i-lucide-trash-2"
              size="sm"
              class="mb-0.5 shrink-0"
              @click="removeSize(i)"
            />
          </div>
        </div>
      </UCard>

      <!-- Images -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Изображения</h2>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" @click="addImage">Добавить</UButton>
          </div>
        </template>
        <div v-if="!form.images.length" class="py-4 text-center text-sm text-gray-400">Нет изображений</div>
        <div v-else class="grid grid-cols-2 gap-3">
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
  slug: '',
  description: '',
  materials: '',
  stove: '',
  interiorHtml: '',
  characteristicsHtml: '',
  kitHtml: '',
  isPopular: false,
  categoryId: '',
  sortOrder: 0,
  images: [],
  sizes: [],
})

const form = ref(emptyForm())

watch(() => props.initial, (val) => {
  if (!val) return
  form.value = {
    title: val.title ?? '',
    slug: val.slug ?? '',
    description: val.description ?? '',
    materials: val.materials ?? '',
    stove: val.stove ?? '',
    interiorHtml: val.interiorHtml ?? '',
    characteristicsHtml: val.characteristicsHtml ?? '',
    kitHtml: val.kitHtml ?? '',
    isPopular: val.isPopular ?? false,
    categoryId: val.categoryId ?? '',
    sortOrder: val.sortOrder ?? 0,
    images: Array.isArray(val.images) ? [...val.images] : [],
    sizes: Array.isArray(val.sizes)
      ? val.sizes.map((s) => ({ ...s }))
      : [],
  }
}, { immediate: true })

function addSize() {
  form.value.sizes.push({ label: '', value: '', price: 0, code: '', sortOrder: form.value.sizes.length })
}

function removeSize(i) {
  form.value.sizes.splice(i, 1)
}

function addImage() {
  form.value.images.push('')
}

function removeImage(i) {
  form.value.images.splice(i, 1)
}

function submit() {
  const data = {
    ...form.value,
    images: form.value.images.filter(Boolean),
    sizes: form.value.sizes.map((s, i) => ({ ...s, sortOrder: i })),
  }
  emit('submit', data)
}
</script>
