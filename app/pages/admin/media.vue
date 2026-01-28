<template>
  <div class="container">
    <h1 class="title">Менеджер изображений</h1>
    <p class="subtitle">Корень: /public/uploads</p>

    <div class="toolbar">
      <div class="path">
        <span class="label">Путь:</span>
        <span class="value">/uploads/{{ currentPath || '' }}</span>
      </div>
      <UIButton v-if="currentPath" small class="button" @click="goUp">На уровень выше</UIButton>
    </div>

    <div class="actions">
      <div class="action">
        <label class="label">Новая папка</label>
        <div class="row">
          <input v-model="folderName" class="input" type="text" placeholder="Название папки" />
          <UIButton small @click="createFolder">Создать</UIButton>
        </div>
      </div>
      <div class="action">
        <label class="label">Загрузить файлы</label>
        <div class="row">
          <input ref="fileInput" class="input" type="file" multiple @change="uploadFiles" />
        </div>
      </div>
    </div>

    <div v-if="pending" class="state">Загрузка...</div>
    <div v-else class="grid">
      <div class="section">
        <h2 class="section-title">Папки</h2>
        <div v-if="!folders.length" class="empty">Папок нет</div>
        <div v-for="item in folders" :key="item.path" class="item">
          <button class="link" @click="openFolder(item.path)">📁 {{ item.name }}</button>
          <div class="actions-inline">
            <button class="text-button" @click="renameItem(item)">Переименовать</button>
            <button class="text-button danger" @click="deleteItem(item)">Удалить</button>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Файлы</h2>
        <div v-if="!files.length" class="empty">Файлов нет</div>
        <div v-for="item in files" :key="item.path" class="item">
          <div class="file-row">
            <div class="file-info">
              <a class="link" :href="item.url" target="_blank" rel="noreferrer">
                🖼️ {{ item.name }}
              </a>
              <span class="meta">{{ formatBytes(item.size) }}</span>
            </div>
            <img v-if="item.url" class="preview" :src="item.url" :alt="item.name" />
          </div>
          <div class="actions-inline">
            <button class="text-button" @click="copyUrl(item)">Копировать путь</button>
            <button class="text-button" @click="renameItem(item)">Переименовать</button>
            <button class="text-button danger" @click="deleteItem(item)">Удалить</button>
          </div>
          <div class="linker">
            <select v-model="getLinkState(item).type" class="select">
              <option value="product">Товар</option>
              <option value="project">Проект</option>
            </select>
            <select v-model="getLinkState(item).targetId" class="select">
              <option value="">Выберите</option>
              <option
                v-for="option in getAvailableTargets(item, getLinkState(item).type)"
                :key="option.id"
                :value="option.id"
              >
                {{ option.title }}
              </option>
            </select>
            <UIButton small @click="attachMedia(item)">Привязать</UIButton>
          </div>
          <div v-if="item.usedInProducts?.length || item.usedInProjects?.length" class="usage">
            <p class="usage-title">Используется в:</p>
            <div v-for="product in item.usedInProducts" :key="product.linkId" class="usage-row">
              <span>Товар: {{ product.title }}</span>
              <button class="text-button danger" @click="unlinkMedia('product', product.linkId)">
                Удалить
              </button>
            </div>
            <div v-for="project in item.usedInProjects" :key="project.linkId" class="usage-row">
              <span>Проект: {{ project.title }}</span>
              <button class="text-button danger" @click="unlinkMedia('project', project.linkId)">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="notice" class="notice">{{ notice }}</p>
  </div>
</template>

<script setup>
const currentPath = ref('')
const folderName = ref('')
const notice = ref('')
const fileInput = ref(null)
const linkState = reactive({})

const { data, pending, refresh } = await useAsyncData(
  'media-manager',
  () =>
    $fetch('/api/media', {
      query: { path: currentPath.value },
    }),
  { watch: [currentPath] },
)

const items = computed(() => data.value?.items ?? [])
const folders = computed(() => items.value.filter((item) => item.type === 'folder'))
const files = computed(() => items.value.filter((item) => item.type === 'file'))

const { data: productsResponse } = await useAsyncData('media-products', () =>
  $fetch('/api/products'),
)
const { data: projectsResponse } = await useAsyncData('media-projects', () =>
  $fetch('/api/projects'),
)

const products = computed(() => productsResponse.value?.products ?? [])
const projects = computed(() => projectsResponse.value?.projects ?? [])

const formatBytes = (value) => {
  if (!value) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = value
  let idx = 0
  while (size >= 1024 && idx < units.length - 1) {
    size /= 1024
    idx += 1
  }
  return `${size.toFixed(size >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`
}

const openFolder = (path) => {
  currentPath.value = path
}

const goUp = () => {
  const parts = currentPath.value.split('/').filter(Boolean)
  parts.pop()
  currentPath.value = parts.join('/')
}

const createFolder = async () => {
  if (!folderName.value.trim()) return
  await $fetch('/api/media/folder', {
    method: 'POST',
    body: { path: currentPath.value, name: folderName.value.trim() },
  })
  folderName.value = ''
  await refresh()
}

const uploadFiles = async (event) => {
  const input = event.target
  const files = input?.files ? Array.from(input.files) : []
  if (!files.length) return

  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  await $fetch('/api/media/upload', {
    method: 'POST',
    query: { path: currentPath.value },
    body: formData,
  })

  if (fileInput.value) fileInput.value.value = ''
  await refresh()
}

const renameItem = async (item) => {
  const nextName = window.prompt('Новое имя', item.name)
  if (!nextName || nextName === item.name) return
  await $fetch('/api/media/rename', {
    method: 'POST',
    body: { path: item.path, name: nextName },
  })
  await refresh()
}

const deleteItem = async (item) => {
  const ok = window.confirm(`Удалить "${item.name}"?`)
  if (!ok) return
  await $fetch('/api/media', {
    method: 'DELETE',
    body: { path: item.path },
  })
  await refresh()
}

const copyUrl = async (item) => {
  if (!item.url) return
  await navigator.clipboard.writeText(item.url)
  notice.value = `Путь скопирован: ${item.url}`
  setTimeout(() => {
    if (notice.value.includes(item.url)) notice.value = ''
  }, 2000)
}

const getLinkState = (item) => {
  if (!linkState[item.path]) {
    linkState[item.path] = { type: 'product', targetId: '' }
  }
  return linkState[item.path]
}

const getTargets = (type) => {
  return type === 'project' ? projects.value : products.value
}

const getAvailableTargets = (item, type) => {
  const usedIds =
    type === 'project'
      ? (item.usedInProjects ?? []).map((entry) => entry.id)
      : (item.usedInProducts ?? []).map((entry) => entry.id)
  return getTargets(type).filter((target) => !usedIds.includes(target.id))
}

const attachMedia = async (item) => {
  const state = getLinkState(item)
  if (!item.url || !state.targetId) return
  await $fetch('/api/media/link', {
    method: 'POST',
    body: {
      mediaId: item.mediaId,
      url: item.url,
      type: state.type,
      targetId: state.targetId,
    },
  })
  await refresh()
}

const unlinkMedia = async (type, linkId) => {
  await $fetch('/api/media/unlink', {
    method: 'POST',
    body: { type, linkId },
  })
  await refresh()
}
</script>

<style scoped lang="scss">
.container {
  padding: 40px 60px;
}

.title {
  font-size: 32px;
  margin-bottom: 6px;
}

.subtitle {
  color: #6f6f6f;
  margin-bottom: 24px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.path {
  display: flex;
  gap: 8px;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #6f6f6f;
}

.value {
  font-weight: 600;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.action {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.input {
  flex: 1;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 10px 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.section {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 12px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item:last-child {
  border-bottom: none;
}

.file-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview {
  width: 88px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background: #f7f7f7;
}

.link {
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  color: #2d2f3a;
  font-weight: 600;
  text-decoration: none;
}

.meta {
  font-size: 12px;
  color: #6f6f6f;
}

.actions-inline {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.linker {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
  flex-wrap: wrap;
}

.select {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 6px 10px;
}

.usage {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.usage-title {
  font-size: 13px;
  color: #6f6f6f;
}

.usage-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.text-button {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  cursor: pointer;
  color: #3c7dd9;
}

.text-button.danger {
  color: #d94b4b;
}

.empty {
  font-size: 14px;
  color: #6f6f6f;
}

.state {
  font-size: 16px;
  color: #6f6f6f;
}

.notice {
  margin-top: 20px;
  color: #2f7a3e;
}

@media (max-width: 900px) {
  .container {
    padding: 24px 16px;
  }

  .actions,
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
