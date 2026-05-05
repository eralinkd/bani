<template>
  <div class="mx-auto max-w-4xl">
    <div class="mb-6 flex flex-wrap items-center gap-3">
      <UButton variant="ghost" icon="i-lucide-arrow-left" size="sm" @click="navigateTo('/admin/blog')" />
      <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
      <div class="ml-auto flex flex-wrap gap-2">
        <UButton type="submit" form="blog-post-form" :loading="saving">Сохранить</UButton>
        <UButton
          v-if="postId"
          color="error"
          variant="outline"
          icon="i-lucide-trash-2"
          :loading="deleting"
          @click="emit('delete')"
        >
          Удалить
        </UButton>
      </div>
    </div>

    <form id="blog-post-form" class="space-y-4" @submit.prevent="submit">
      <UCard>
        <template #header>
          <h2 class="font-semibold">Основное</h2>
        </template>
        <div class="space-y-4">
          <UFormField label="Заголовок" class="w-full">
            <UInput v-model="title" class="w-full" @blur="onTitleBlur" />
          </UFormField>
          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField label="Slug (URL)" class="w-full">
              <UInput v-model="slug" class="w-full" placeholder="url-chast" @input="slugTouched = true" />
            </UFormField>
            <UFormField label="Статус" class="w-full">
              <label class="flex items-center gap-2 text-sm text-gray-700">
                <input v-model="published" type="checkbox" class="rounded border-gray-300" />
                Опубликован
              </label>
            </UFormField>
          </div>
          <UFormField label="Обложка" description="Показывается в списке и в шапке поста (при выводе на сайте)">
            <AdminImagePicker v-model="coverImage" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold">Текст</h2>
        </template>
        <AdminBlogEditor v-model="content" />
      </UCard>
    </form>
  </div>
</template>

<script setup>
import { emptyBlogDoc, isDocContent } from '~/shared/blog-doc'

const props = defineProps({
  pageTitle: { type: String, required: true },
  saving: { type: Boolean, default: false },
  deleting: { type: Boolean, default: false },
  /** null — создание нового поста */
  postId: { type: String, default: null },
  /** С данными с сервера при редактировании */
  initialPost: { type: Object, default: null },
})

const emit = defineEmits(['save', 'delete'])

const title = ref('')
const slug = ref('')
const coverImage = ref('')
const published = ref(false)
const slugTouched = ref(false)

const content = ref(emptyBlogDoc())

function suggestSlug(raw) {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[/\\?#%]+/g, '')
    .slice(0, 160)
}

function onTitleBlur() {
  if (!props.postId && !slugTouched.value) slug.value = suggestSlug(title.value)
}

watch(
  () => props.initialPost,
  (p) => {
    if (!p) {
      title.value = ''
      slug.value = ''
      coverImage.value = ''
      published.value = false
      slugTouched.value = false
      content.value = emptyBlogDoc()
      return
    }
    title.value = p.title ?? ''
    slug.value = p.slug ?? ''
    coverImage.value = p.coverImage ?? ''
    published.value = Boolean(p.published)
    slugTouched.value = true
    const raw = p.content
    content.value =
      typeof raw === 'string'
        ? (() => {
            try {
              const parsed = JSON.parse(raw)
              return isDocContent(parsed) ? parsed : emptyBlogDoc()
            } catch {
              return emptyBlogDoc()
            }
          })()
        : isDocContent(raw)
          ? structuredClone(raw)
          : emptyBlogDoc()
  },
  { immediate: true },
)

function submit() {
  const slugVal = suggestSlug(slug.value) || (props.postId ? '' : `post-${Date.now()}`)
  emit('save', {
    title: title.value.trim(),
    slug: slugVal,
    coverImage: coverImage.value.trim() || null,
    published: published.value,
    content: content.value,
  })
}
</script>
