<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div class="flex flex-wrap items-center gap-1 border-b border-gray-100 bg-gray-50/80 px-2 py-2">
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-bold"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleBold().run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-italic"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleItalic().run())"
      />
      <span class="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        label="H1"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleHeading({ level: 1 }).run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        label="H2"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleHeading({ level: 2 }).run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        label="H3"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleHeading({ level: 3 }).run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-pilcrow"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().setParagraph().run())"
      />
      <span class="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-list"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleBulletList().run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-list-ordered"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().toggleOrderedList().run())"
      />
      <span class="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-align-left"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().setTextAlign('left').run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-align-center"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().setTextAlign('center').run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-align-right"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().setTextAlign('right').run())"
      />
      <span class="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-undo"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().undo().run())"
      />
      <UButton
        type="button"
        size="xs"
        variant="outline"
        icon="i-lucide-redo"
        :disabled="!editor"
        @click="run((e) => e.chain().focus().redo().run())"
      />
      <div class="ml-auto shrink-0">
        <AdminImagePicker
          pick-only
          model-value=""
          label="Вставить в текст"
          @update:model-value="onPickedImage"
        />
      </div>
    </div>
    <editor-content v-if="editor" :editor="editor" class="blog-editor-root" />
    <div v-else class="flex min-h-[280px] items-center justify-center text-sm text-gray-400">
      Загрузка редактора…
    </div>
  </div>
</template>

<script setup>
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const props = defineProps({
  modelValue: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({
      placeholder: 'Текст поста. Картинки можно вставлять в любое место курсором.',
    }),
    Image.configure({ inline: false, allowBase64: false }),
  ],
  editorProps: {
    attributes: {
      class: 'blog-prose focus:outline-none min-h-[280px] max-w-none px-4 py-3',
    },
  },
  onUpdate: ({ editor: ed }) => {
    emit('update:modelValue', ed.getJSON())
  },
})

watch(
  () => props.modelValue,
  (next) => {
    const ed = editor.value
    if (!ed || !next) return
    const a = JSON.stringify(ed.getJSON())
    const b = JSON.stringify(next)
    if (a !== b) ed.commands.setContent(next, false)
  },
  { deep: true },
)

function run(fn) {
  const ed = editor.value
  if (ed) fn(ed)
}

function onPickedImage(url) {
  if (!url) return
  const ed = editor.value
  if (ed) ed.chain().focus().setImage({ src: url }).run()
}
</script>

<style scoped>
.blog-editor-root :deep(.tiptap) {
  min-height: 280px;
}

.blog-editor-root :deep(.tiptap img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0.75rem 0;
  border-radius: 0.5rem;
}

.blog-editor-root :deep(.tiptap h1) {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0.75rem 0 0.5rem;
}

.blog-editor-root :deep(.tiptap h2) {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0.75rem 0 0.5rem;
}

.blog-editor-root :deep(.tiptap h3) {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0.5rem 0 0.35rem;
}

.blog-editor-root :deep(.tiptap p) {
  margin: 0.35rem 0;
}

.blog-editor-root :deep(.tiptap ul),
.blog-editor-root :deep(.tiptap ol) {
  margin: 0.35rem 0;
  padding-left: 1.5rem;
}

/* Tailwind Preflight (и др. сбросы) убирают list-style — восстанавливаем только здесь */
.blog-editor-root :deep(.tiptap ul) {
  list-style-type: disc;
  list-style-position: outside;
}

.blog-editor-root :deep(.tiptap ol) {
  list-style-type: decimal;
  list-style-position: outside;
}

.blog-editor-root :deep(.tiptap li) {
  display: list-item;
}

.blog-editor-root :deep(.tiptap li p) {
  margin: 0;
}

.blog-editor-root :deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  color: rgb(156 163 175);
}
</style>
