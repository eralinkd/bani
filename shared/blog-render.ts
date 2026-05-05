import { generateHTML } from '@tiptap/html'
import type { JSONContent } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

const BlogHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          if (!attributes.id) return {}
          return { id: String(attributes.id) }
        },
      },
    }
  },
}).configure({ levels: [1, 2, 3] })

/** Расширения совместимы с админским `BlogEditor` + атрибут `id` у заголовков для оглавления. */
export function getBlogRenderExtensions() {
  return [
    StarterKit.configure({
      heading: false,
    }),
    BlogHeading,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Image.configure({ inline: false, allowBase64: false }),
  ]
}

export function collectPlainText(node: JSONContent): string {
  if (node.type === 'text') return node.text ?? ''
  if (!node.content?.length) return ''
  return node.content.map((c) => collectPlainText(c)).join('')
}

function slugFragment(text: string, n: number): string {
  const base = text
    .trim()
    .toLowerCase()
    .slice(0, 40)
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-яё0-9-]/gi, '')
  return base || String(n)
}

/** Добавляет стабильные id к h2/h3 для якорей (клон документа). */
export function injectHeadingIds(doc: JSONContent): JSONContent {
  const out = structuredClone(doc) as JSONContent
  let n = 0

  function walk(nodes?: JSONContent[]) {
    if (!nodes) return
    for (const node of nodes) {
      if (node.type === 'heading') {
        const level = Number(node.attrs?.level)
        if (level === 2 || level === 3) {
          n++
          const text = collectPlainText(node).trim()
          const id = `toc-${n}-${slugFragment(text, n)}`
          node.attrs = { ...(node.attrs ?? {}), id }
        }
      }
      if (node.content) walk(node.content)
    }
  }

  walk(out.content)
  return out
}

export function prepareBlogDoc(doc: unknown): JSONContent {
  if (!doc || typeof doc !== 'object') return { type: 'doc', content: [{ type: 'paragraph' }] }
  const typed = doc as JSONContent
  if (typed.type !== 'doc') return { type: 'doc', content: [{ type: 'paragraph' }] }
  return injectHeadingIds(typed)
}

export function blogDocToHtml(doc: unknown): string {
  const prepared = prepareBlogDoc(doc)
  return blogPreparedDocToHtml(prepared)
}

export function blogPreparedDocToHtml(prepared: JSONContent): string {
  return generateHTML(prepared as never, getBlogRenderExtensions())
}

export type BlogTocItem = { id: string; title: string; level: number }

export function extractToc(preparedDoc: JSONContent): BlogTocItem[] {
  const toc: BlogTocItem[] = []

  function walk(nodes?: JSONContent[]) {
    if (!nodes) return
    for (const node of nodes) {
      if (node.type === 'heading') {
        const level = Number(node.attrs?.level)
        if (level === 2 || level === 3) {
          const id = String(node.attrs?.id ?? '')
          const title = collectPlainText(node).trim()
          if (id && title) toc.push({ id, title, level })
        }
      }
      if (node.content) walk(node.content)
    }
  }

  walk(preparedDoc.content)
  return toc
}

/** Примерная длительность чтения (слова / 200, минимум 1 мин). */
export function estimateReadingMinutesFromPrepared(doc: JSONContent): number {
  let words = 0

  function walk(nodes?: JSONContent[]) {
    if (!nodes) return
    for (const node of nodes) {
      if (node.type === 'text' && node.text) {
        words += node.text.trim().split(/\s+/).filter(Boolean).length
      }
      if (node.content) walk(node.content)
    }
  }

  walk(doc.content)
  return Math.max(1, Math.round(words / 200))
}

export function estimateReadingMinutesFromDoc(doc: unknown): number {
  return estimateReadingMinutesFromPrepared(prepareBlogDoc(doc))
}
