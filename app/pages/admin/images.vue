<template>
  <div class="flex h-full flex-col">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Медиатека</h1>
      <div class="flex gap-2">
        <UButton icon="i-lucide-folder-plus" variant="outline" @click="openNewFolder">Новая папка</UButton>
        <UButton icon="i-lucide-upload" @click="openUpload">Загрузить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="flex flex-1 gap-4 overflow-hidden">
      <!-- Folder sidebar -->
      <div class="w-44 shrink-0">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Папки</p>
        <button
          :class="[
            'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
            selectedFolder === '' ? 'bg-blue-100 font-medium text-blue-700' : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="selectedFolder = ''"
        >
          Все файлы
        </button>
        <button
          v-for="folder in allFolders"
          :key="folder"
          :class="[
            'w-full truncate rounded-lg px-3 py-2 text-left text-sm transition-colors',
            selectedFolder === folder ? 'bg-blue-100 font-medium text-blue-700' : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="selectedFolder = folder"
        >
          {{ folder }}
        </button>
      </div>

      <!-- Image grid + detail panel -->
      <div class="flex flex-1 gap-4 overflow-hidden">
        <div class="flex-1 overflow-y-auto">
          <p class="mb-3 text-sm text-gray-500">
            {{ filteredImages.length }} {{ filteredImages.length === 1 ? 'файл' : 'файлов' }}
          </p>
          <div v-if="filteredImages.length === 0" class="py-16 text-center text-gray-400">
            <UIcon name="i-lucide-image" class="mx-auto mb-2 size-12" />
            <p>Нет изображений</p>
          </div>
          <div class="grid grid-cols-3 gap-3 xl:grid-cols-4">
            <button
              v-for="img in filteredImages"
              :key="img.id"
              :class="[
                'group relative aspect-square overflow-hidden rounded-lg border-2 transition-all',
                selectedImage?.id === img.id ? 'border-blue-500' : 'border-transparent hover:border-gray-300',
              ]"
              @click="selectedImage = img"
            >
              <img :src="img.url" :alt="img.name" class="h-full w-full object-cover" />
              <div
                class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <span class="truncate text-xs text-white">{{ img.filename }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Detail panel -->
        <div v-if="selectedImage" class="w-64 shrink-0 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img :src="selectedImage.url" :alt="selectedImage.name" class="h-full w-full object-contain" />
          </div>
          <p class="mb-1 truncate text-sm font-semibold">{{ selectedImage.filename }}</p>
          <p class="mb-1 text-xs text-gray-400">{{ selectedImage.folder || 'Корень' }}</p>
          <p class="mb-3 text-xs text-gray-400">{{ formatSize(selectedImage.size) }}</p>
          <div class="mb-4 rounded bg-gray-50 px-3 py-2">
            <p class="mb-1 text-xs font-medium text-gray-500">URL</p>
            <p class="break-all text-xs text-gray-700">{{ selectedImage.url }}</p>
          </div>

          <div v-if="!isRenaming" class="space-y-2">
            <UButton block variant="outline" icon="i-lucide-pencil" size="sm" @click="startRename">
              Переименовать
            </UButton>
            <UButton
              block
              variant="outline"
              color="error"
              icon="i-lucide-trash-2"
              size="sm"
              :loading="isDeleting"
              @click="deleteImage"
            >
              Удалить
            </UButton>
          </div>
          <div v-else class="space-y-2">
            <UInput
              v-model="renameValue"
              size="sm"
              class="w-full"
              @keyup.enter="confirmRename"
              @keyup.escape="isRenaming = false"
            />
            <p class="text-xs text-gray-400">Без расширения. Допустимы буквы, цифры, _ -</p>
            <div class="flex gap-2">
              <UButton size="sm" :loading="isRenamingLoading" @click="confirmRename">OK</UButton>
              <UButton size="sm" variant="ghost" @click="isRenaming = false">Отмена</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload modal -->
    <Teleport to="body">
      <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-[480px] rounded-xl bg-white p-6 shadow-2xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">Загрузить изображение</h2>
            <UButton variant="ghost" icon="i-lucide-x" size="sm" @click="showUploadModal = false" />
          </div>
          <div class="space-y-3">
            <div>
              <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="onFileSelected" />
              <div
                class="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
                @click="fileInputRef?.click()"
              >
                <UIcon name="i-lucide-image-plus" class="mx-auto mb-2 size-8 text-gray-400" />
                <p class="text-sm text-gray-500">
                  {{ uploadFile ? uploadFile.name : 'Нажмите для выбора файла' }}
                </p>
              </div>
            </div>
            <UFormField label="Имя файла (без расширения)" class="w-full">
              <UInput v-model="uploadName" class="w-full" placeholder="Оставьте пустым — оригинальное имя" />
            </UFormField>
            <UFormField label="Папка" class="w-full">
              <select v-model="uploadFolder" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option value="">Корень</option>
                <option v-for="f in allFolders" :key="f" :value="f">{{ f }}</option>
              </select>
            </UFormField>
          </div>
          <div class="mt-4 flex justify-end gap-2">
            <UButton variant="ghost" @click="showUploadModal = false">Отмена</UButton>
            <UButton :loading="isUploading" :disabled="!uploadFile" @click="confirmUpload">Загрузить</UButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- New folder modal -->
    <Teleport to="body">
      <div v-if="showFolderModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-[360px] rounded-xl bg-white p-6 shadow-2xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">Создать папку</h2>
            <UButton variant="ghost" icon="i-lucide-x" size="sm" @click="showFolderModal = false" />
          </div>
          <UFormField label="Название папки" class="w-full">
            <UInput v-model="newFolderName" class="w-full" placeholder="projects" @keyup.enter="confirmNewFolder" />
          </UFormField>
          <p class="mt-1 text-xs text-gray-400">Допустимы буквы, цифры, _ -</p>
          <div class="mt-4 flex justify-end gap-2">
            <UButton variant="ghost" @click="showFolderModal = false">Отмена</UButton>
            <UButton :loading="isCreatingFolder" :disabled="!newFolderName.trim()" @click="confirmNewFolder">
              Создать
            </UButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/images', { key: 'admin-images' })

const allImages = computed(() => data.value?.images ?? [])
const allFolders = computed(() => data.value?.folders ?? [])

const selectedFolder = ref('')
const selectedImage = ref(null)

const filteredImages = computed(() =>
  selectedFolder.value === ''
    ? allImages.value
    : allImages.value.filter((img) => img.folder === selectedFolder.value),
)

const isRenaming = ref(false)
const renameValue = ref('')
const isRenamingLoading = ref(false)

function startRename() {
  renameValue.value = selectedImage.value?.name ?? ''
  isRenaming.value = true
}

async function confirmRename() {
  if (!selectedImage.value || !renameValue.value.trim()) return
  isRenamingLoading.value = true
  try {
    const res = await $fetch('/api/admin/images/rename', {
      method: 'POST',
      body: { id: selectedImage.value.id, newName: renameValue.value.trim() },
    })
    await refresh()
    selectedImage.value = allImages.value.find((i) => i.id === res.id) ?? null
    isRenaming.value = false
  } catch (e) {
    console.error(e)
  } finally {
    isRenamingLoading.value = false
  }
}

const isDeleting = ref(false)

async function deleteImage() {
  if (!selectedImage.value) return
  if (!confirm('Удалить изображение?')) return
  isDeleting.value = true
  try {
    await $fetch('/api/admin/images/remove', { method: 'POST', body: { id: selectedImage.value.id } })
    selectedImage.value = null
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    isDeleting.value = false
  }
}

const showUploadModal = ref(false)
const fileInputRef = ref(null)
const uploadFile = ref(null)
const uploadName = ref('')
const uploadFolder = ref('')
const isUploading = ref(false)

function openUpload() {
  uploadFile.value = null
  uploadName.value = ''
  uploadFolder.value = selectedFolder.value
  showUploadModal.value = true
}

function onFileSelected(e) {
  uploadFile.value = e.target.files?.[0] ?? null
}

async function confirmUpload() {
  if (!uploadFile.value) return
  isUploading.value = true
  try {
    const form = new FormData()
    form.append('file', uploadFile.value)
    if (uploadName.value.trim()) form.append('name', uploadName.value.trim())
    if (uploadFolder.value) form.append('folder', uploadFolder.value)
    await $fetch('/api/admin/images/upload', { method: 'POST', body: form })
    await refresh()
    showUploadModal.value = false
  } catch (e) {
    console.error(e)
  } finally {
    isUploading.value = false
  }
}

const showFolderModal = ref(false)
const newFolderName = ref('')
const isCreatingFolder = ref(false)

function openNewFolder() {
  newFolderName.value = ''
  showFolderModal.value = true
}

async function confirmNewFolder() {
  if (!newFolderName.value.trim()) return
  isCreatingFolder.value = true
  try {
    const res = await $fetch('/api/admin/images/folder', {
      method: 'POST',
      body: { name: newFolderName.value.trim(), parent: selectedFolder.value },
    })
    await refresh()
    selectedFolder.value = res.folder
    showFolderModal.value = false
  } catch (e) {
    console.error(e)
  } finally {
    isCreatingFolder.value = false
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
</script>
