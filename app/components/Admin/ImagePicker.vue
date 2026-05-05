<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="!pickOnly"
      class="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
    >
      <img v-if="modelValue" :src="modelValue" class="h-full w-full object-contain" :alt="label" />
      <div v-else class="flex flex-col items-center gap-1 text-gray-300">
        <UIcon name="i-lucide-image" class="size-8" />
        <span class="text-xs">Не выбрано</span>
      </div>
    </div>
    <div class="flex gap-2">
      <UButton size="sm" variant="outline" icon="i-lucide-images" @click="openPicker">
        {{ pickOnly ? 'Медиатека' : modelValue ? 'Изменить' : 'Выбрать' }}
      </UButton>
      <UButton
        v-if="modelValue && !pickOnly"
        size="sm"
        variant="outline"
        color="error"
        icon="i-lucide-x"
        @click="$emit('update:modelValue', '')"
      >
        Убрать
      </UButton>
    </div>
    <p v-if="modelValue && !pickOnly" class="break-all text-xs text-gray-400">{{ modelValue }}</p>
  </div>

  <Teleport to="body">
    <div v-if="pickerOpen" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/60">
      <div class="flex h-[80vh] w-[860px] max-w-[96vw] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="text-lg font-semibold">Выбрать изображение</h2>
          <UButton variant="ghost" icon="i-lucide-x" size="sm" @click="pickerOpen = false" />
        </div>

        <div class="flex flex-1 overflow-hidden">
          <div class="w-40 shrink-0 overflow-y-auto border-r p-3">
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Папки</p>
            <button
              :class="[
                'w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                pickerFolder === '' ? 'bg-blue-50 font-medium text-blue-700' : 'text-gray-700 hover:bg-gray-100',
              ]"
              @click="pickerFolder = ''"
            >
              Все файлы
            </button>
            <button
              v-for="f in pickerFolders"
              :key="f"
              :class="[
                'w-full truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                pickerFolder === f ? 'bg-blue-50 font-medium text-blue-700' : 'text-gray-700 hover:bg-gray-100',
              ]"
              @click="pickerFolder = f"
            >
              {{ f }}
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="pickerLoading" class="flex h-full items-center justify-center">
              <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
            </div>
            <div v-else-if="pickerImages.length === 0" class="flex h-full items-center justify-center">
              <p class="text-gray-400">Нет изображений</p>
            </div>
            <div v-else class="grid grid-cols-4 gap-3">
              <button
                v-for="img in pickerImages"
                :key="img.id"
                :class="[
                  'group relative aspect-square overflow-hidden rounded-lg border-2 transition-all',
                  pickerSelected?.id === img.id
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-transparent hover:border-gray-300',
                ]"
                @click="pickerSelected = img"
                @dblclick="confirmPicker"
              >
                <img :src="img.url" :alt="img.name" class="h-full w-full object-cover" />
                <div
                  v-if="pickerSelected?.id === img.id"
                  class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500"
                >
                  <UIcon name="i-lucide-check" class="size-3 text-white" />
                </div>
                <div
                  class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <p class="truncate text-xs text-white">{{ img.filename }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between border-t px-6 py-3">
          <p class="text-sm text-gray-500">
            <template v-if="pickerSelected">Выбрано: {{ pickerSelected.filename }}</template>
            <template v-else>Дважды кликните или выберите и нажмите «Вставить»</template>
          </p>
          <div class="flex gap-2">
            <UButton variant="ghost" @click="pickerOpen = false">Отмена</UButton>
            <UButton :disabled="!pickerSelected" @click="confirmPicker">Вставить</UButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Изображение' },
  /** Только кнопка выбора (без превью), для вставки в редактор */
  pickOnly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const pickerOpen = ref(false)
const pickerLoading = ref(false)
const pickerFolder = ref('')
const pickerSelected = ref(null)
const pickerData = ref(null)

const pickerFolders = computed(() => pickerData.value?.folders ?? [])
const pickerImages = computed(() => {
  const imgs = pickerData.value?.images ?? []
  return pickerFolder.value === '' ? imgs : imgs.filter((i) => i.folder === pickerFolder.value)
})

async function openPicker() {
  pickerOpen.value = true
  pickerSelected.value = null
  if (!pickerData.value) {
    pickerLoading.value = true
    try {
      pickerData.value = await $fetch('/api/admin/images')
    } finally {
      pickerLoading.value = false
    }
  }
}

function confirmPicker() {
  if (!pickerSelected.value) return
  emit('update:modelValue', pickerSelected.value.url)
  pickerOpen.value = false
}
</script>
