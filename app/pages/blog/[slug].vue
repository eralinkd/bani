<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />

      <article class="blog-article">
        <header class="blog-article__hero">
          <!-- Нативный img: локальные /images/* без IPX часто дают «битую» картинку из-за формата webp -->
          <img
            v-if="coverSrc"
            :src="coverSrc"
            alt=""
            class="blog-article__hero-img"
            decoding="async"
          />
          <div v-else class="blog-article__hero-placeholder" aria-hidden="true" />
          <div class="blog-article__hero-inner">
            <h1 class="blog-article__title">{{ post.title }}</h1>
          </div>
          <div class="blog-article__meta">
            <span>{{ formatBlogDetailDate(post.createdAt) }}</span>
            <span v-if="showUpdated" class="blog-article__meta-sep" aria-hidden="true">·</span>
            <span v-if="showUpdated">Обновлено {{ formatBlogDetailDate(post.updatedAt) }}</span>
            <span class="blog-article__meta-sep" aria-hidden="true">·</span>
            <span>Блог</span>
            <span class="blog-article__meta-sep" aria-hidden="true">·</span>
            <span>{{ post.readingMinutes }} мин чтения</span>
          </div>
        </header>

        <div class="blog-article__layout">
          <aside v-if="post.toc?.length" class="blog-article__toc">
            <p class="blog-article__toc-title">Оглавление</p>
            <ol class="blog-article__toc-list">
              <li
                v-for="item in post.toc"
                :key="item.id"
                :class="`blog-article__toc-li--lvl${item.level}`"
              >
                <a :href="`#${item.id}`">{{ item.title }}</a>
              </li>
            </ol>
          </aside>
          <div class="blog-article__body-wrap">
            <div class="blog-prose-body" v-html="post.bodyHtml" />
          </div>
        </div>
      </article>

      <Popular />
      <WhyUs />
      <FeedbackForm />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatBlogDetailDate } from '~/app/utils/blog-format'
import { normalizeUploadedImageUrl } from '~/app/utils/media-url'

type TocItem = { id: string; title: string; level: number }

type BlogPostPage = {
  title: string
  coverImage: string | null
  createdAt: string
  updatedAt: string
  bodyHtml: string
  toc: TocItem[]
  readingMinutes: number
}

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data: post, error } = await useFetch<BlogPostPage>(() => `/api/blog/${slug.value}`, {
  watch: [slug],
})

if (!post.value) {
  throw createError({
    statusCode: error.value?.statusCode === 404 ? 404 : 503,
    statusMessage:
      error.value?.statusCode === 404 ? 'Статья не найдена' : 'Не удалось загрузить статью',
    fatal: true,
  })
}

const showUpdated = computed(() => {
  const p = post.value
  if (!p?.createdAt || !p.updatedAt) return false
  const c = new Date(p.createdAt).getTime()
  const u = new Date(p.updatedAt).getTime()
  return Number.isFinite(c) && Number.isFinite(u) && u - c > 86_400_000
})

const coverSrc = computed(() => normalizeUploadedImageUrl(post.value?.coverImage))

useHead(() => ({
  title: post.value?.title,
  meta: [{ name: 'description', content: `Статья: ${post.value?.title ?? ''}` }],
}))
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.blog-article {
  padding: 0 0 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-article__hero {
  position: relative;
  margin: 0 32px 40px;
  border-radius: 20px;
  overflow: hidden;
  min-height: 280px;
  background: #2a2a32;

  @media (max-width: $mobileBreakpoint) {
    margin: 0 20px 28px;
    border-radius: 16px;
    min-height: 220px;
  }
}

.blog-article__hero-img,
.blog-article__hero-placeholder {
  width: 100%;
  aspect-ratio: 21 / 9;
  max-height: 520px;
  object-fit: cover;
  display: block;
}

.blog-article__hero-placeholder {
  aspect-ratio: 21 / 9;
  background: linear-gradient(135deg, #3d3d45 0%, #1f2937 100%);
}

.blog-article__hero-inner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  padding: 0 28px;
  pointer-events: none;

  @media (max-width: $mobileBreakpoint) {
    bottom: 56px;
    padding: 0 18px;
  }
}

.blog-article__hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.75) 100%);
}

.blog-article__title {
  position: relative;
  z-index: 1;
  font-family: Inter, Gilroy, system-ui, sans-serif !important;
  font-size: clamp(1.35rem, 3.4vw, 2.05rem) !important;
  font-weight: 800 !important;
  line-height: 1.18 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.02em !important;
  color: #fff !important;
  max-width: 920px;
  text-wrap: balance;
}

.blog-article__meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.6rem;

  padding: 12px 28px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(6px);

  @media (max-width: $mobileBreakpoint) {
    padding: 10px 16px;
    font-size: 0.75rem;
  }
}

.blog-article__meta-sep {
  opacity: 0.55;
}

.blog-article__layout {
  display: grid;
  grid-template-columns: minmax(200px, 260px) 1fr;
  gap: clamp(28px, 5vw, 56px);
  padding: 0 32px;
  align-items: start;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
}

.blog-article__toc {
  padding: 1.25rem 1.35rem;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 104px;

  @media (max-width: $mobileBreakpoint) {
    position: relative;
    top: auto;
  }
}

.blog-article__toc-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #111827;
}

.blog-article__toc-list {
  margin: 0 !important;
  padding-left: 0 !important;
  padding-inline-start: 1.25rem !important;
  display: block !important;
  list-style-type: decimal !important;
  list-style-position: outside !important;
}

.blog-article__toc-list > li:not(:last-child) {
  margin-bottom: 0.45rem;
}

.blog-article__toc-list li {
  display: list-item !important;
  margin: 0 !important;
  padding-left: 0.35rem;
}

.blog-article__toc-list a {
  font-size: 0.88rem;
  line-height: 1.35;
  color: #374151;
  text-decoration: none;
  transition: color 0.15s ease;
}

.blog-article__toc-list a:hover {
  color: #41a3db;
}

.blog-article__toc-li--lvl3 a {
  padding-left: 0.75rem;
  font-size: 0.84rem;
  color: #4b5563;
}

.blog-article__body-wrap {
  min-width: 0;
  /* Не режем маркеры списков (outside) из-за flex/grid контейнеров main */
  overflow: visible;
}

/* Контент статьи: жёстко перебиваем .site-content h1/h2 (Gilroy ~97px) и * { list-style:none } — без правок globals */
.blog-prose-body {
  font-size: 1rem;
  color: #374151;

  &:deep(em) {
    font-style: italic;
  }

  &:deep(a) {
    color: #2563eb;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #1d4ed8;
    }
  }

  &:deep(h1) {
    margin: 0 0 0.85rem !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    font-family: Inter, system-ui, sans-serif !important;
    font-size: clamp(1.4375rem, 2.2vw, 1.8125rem) !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
    letter-spacing: -0.02em !important;
    text-transform: none !important;
    color: #111827 !important;

    &[style*='text-align: center'],
    &[style*='text-align:center'] {
      text-align: center !important;
    }

    &[style*='text-align: right'],
    &[style*='text-align:right'] {
      text-align: right !important;
    }

    &[style*='text-align: left'],
    &[style*='text-align:left'] {
      text-align: left !important;
    }
  }

  &:deep(h2) {
    margin: 1.6rem 0 0.7rem !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    font-family: Inter, system-ui, sans-serif !important;
    font-size: clamp(1.25rem, 1.8vw, 1.5rem) !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    letter-spacing: -0.015em !important;
    text-transform: none !important;
    color: #111827 !important;

    &:first-child {
      margin-top: 0 !important;
    }

    &[style*='text-align: center'],
    &[style*='text-align:center'] {
      text-align: center !important;
    }

    &[style*='text-align: right'],
    &[style*='text-align:right'] {
      text-align: right !important;
    }

    &[style*='text-align: left'],
    &[style*='text-align:left'] {
      text-align: left !important;
    }
  }

  &:deep(h3) {
    margin: 1.2rem 0 0.5rem !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    font-family: Inter, system-ui, sans-serif !important;
    font-size: clamp(1.0625rem, 1.3vw, 1.1875rem) !important;
    font-weight: 600 !important;
    line-height: 1.35 !important;
    letter-spacing: -0.01em !important;
    text-transform: none !important;
    color: #1f2937 !important;

    &[style*='text-align: center'],
    &[style*='text-align:center'] {
      text-align: center !important;
    }

    &[style*='text-align: right'],
    &[style*='text-align:right'] {
      text-align: right !important;
    }

    &[style*='text-align: left'],
    &[style*='text-align:left'] {
      text-align: left !important;
    }
  }

  &:deep(p) {
    margin: 0 0 1rem !important;
    padding: 0 !important;
    font-family: inherit;
    font-size: 1rem !important;
    line-height: 1.72 !important;
    color: #374151 !important;

    &[style*='text-align: center'],
    &[style*='text-align:center'] {
      text-align: center !important;
    }

    &[style*='text-align: right'],
    &[style*='text-align:right'] {
      text-align: right !important;
    }

    &[style*='text-align: left'],
    &[style*='text-align:left'] {
      text-align: left !important;
    }
  }

  &:deep(strong),
  &:deep(b) {
    font-weight: 600 !important;
    color: #1f2937 !important;
  }

  &:deep(ul),
  &:deep(ol) {
    margin: 0 0 1.1rem !important;
    padding: 0 !important;
    padding-inline-start: 1.5rem !important;
    box-sizing: border-box !important;
    display: block !important;
    /* outside: при li > p (TipTap) inside кладёт маркер на отдельную строку над абзацем */
    list-style-position: outside !important;
    overflow: visible !important;
  }

  &:deep(ul) {
    list-style-type: disc !important;
  }

  &:deep(ol) {
    list-style-type: decimal !important;
  }

  &:deep(li) {
    display: list-item !important;
    list-style-image: none !important;
    list-style-type: inherit !important;
    list-style-position: inherit !important;
    margin: 0.35rem 0 !important;
    padding: 0 !important;
    font-size: 1rem !important;
    line-height: 1.65 !important;
    color: #374151 !important;
    box-sizing: border-box !important;
  }

  &:deep(li > p) {
    margin: 0.35rem 0 !important;
  }

  &:deep(ul ul),
  &:deep(ol ol),
  &:deep(li > ul),
  &:deep(li > ol) {
    margin-top: 0.4rem !important;
    margin-bottom: 0.4rem !important;
  }

  &:deep(li::marker) {
    color: #4b5563;
  }

  &:deep(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.35rem auto !important;
    border-radius: 14px;
  }
}
</style>

<!-- Несфокусированные правила: перебивают .site-content * и @layer tailwind на ul/ol/li -->
<style lang="scss">
html.site-content article.blog-article .blog-prose-body ul {
  list-style-type: disc !important;
  list-style-position: outside !important;
  list-style-image: none !important;
  display: block !important;
  padding-inline-start: 1.5rem !important;
  overflow: visible !important;
}
html.site-content article.blog-article .blog-prose-body ol {
  list-style-type: decimal !important;
  list-style-position: outside !important;
  list-style-image: none !important;
  display: block !important;
  padding-inline-start: 1.5rem !important;
  overflow: visible !important;
}
html.site-content article.blog-article .blog-prose-body li {
  display: list-item !important;
  list-style-image: none !important;
  list-style-type: inherit !important;
  list-style-position: inherit !important;
}
html.site-content .blog-article__toc-list {
  list-style-type: decimal !important;
  list-style-position: outside !important;
  list-style-image: none !important;
  display: block !important;
  padding-inline-start: 1.25rem !important;
  overflow: visible !important;
}
html.site-content .blog-article__toc-list > li {
  display: list-item !important;
  list-style-image: none !important;
  list-style-type: inherit !important;
  list-style-position: inherit !important;
}
</style>
