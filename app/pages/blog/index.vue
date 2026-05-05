<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <header class="blog-list-header">
        <PageTitle>Блог</PageTitle>
      </header>

      <section class="blog-grid-wrap">
        <div v-if="pending" class="blog-grid-loading">Загрузка…</div>
        <template v-else>
          <p v-if="!posts?.length" class="blog-grid-empty">
            Здесь появятся статьи. Публикации включаются в админ-панели.
          </p>
          <div v-else class="blog-grid">
            <BlogPostCard
              v-for="(post, index) in posts"
              :key="post.id"
              :slug="post.slug"
              :title="post.title"
              :created-at="post.createdAt"
              :cover-image="post.coverImage"
              :variant="cardVariant(post, index)"
            />
          </div>
        </template>
      </section>

      <!-- <Reviews /> -->
      <WhyUs />
      <FeedbackForm />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
type CardPost = {
  id: string
  slug: string
  title: string
  coverImage: string | null
  createdAt: string
}

const { data: posts, pending } = await useFetch<CardPost[]>('/api/blog-posts')

useSeoPage('blog', {
  title: 'Блог',
  description: 'Статьи и новости о банных проектах',
})

/** Одинаковые карточки по сетке; фон чередуется: обложка / тёмная / светлая */
function cardVariant(post: CardPost, index: number): 'image' | 'dark' | 'light' {
  const mod = index % 3
  if (mod === 0) return post.coverImage ? 'image' : 'dark'
  if (mod === 1) return 'dark'
  return 'light'
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

/* Заголовок списка — глобальный .site-content h1 (Gilroy ~97px) недопустим для блога */
.blog-list-header :deep(.page-title) {
  font-family: Inter, system-ui, sans-serif !important;
  font-size: clamp(2rem, 4.5vw, 2.75rem) !important;
  font-weight: 800 !important;
  line-height: 1.18 !important;
  text-transform: none !important;
  letter-spacing: -0.025em !important;
  color: $text !important;
  margin-top: 0 !important;
}

.blog-grid-wrap {
  padding: 28px 0 72px;

  @media (max-width: $mobileBreakpoint) {
    padding: 18px 0 48px;
  }
}

.blog-grid {
  padding: 12px 32px 0;
  margin: 0 auto;
  width: min(1360px, 100%);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
  gap: clamp(14px, 2vw, 20px);

  @media (max-width: $mobileBreakpoint) {
    padding: 8px 20px 0;
    gap: 14px;
  }
}

.blog-grid-loading,
.blog-grid-empty {
  padding: 2rem 32px;
  text-align: center;
  font-size: 0.94rem;
  color: rgba(74, 85, 103, 0.95);

  @media (max-width: $mobileBreakpoint) {
    padding: 1.25rem 20px;
  }
}
</style>
