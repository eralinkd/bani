<template>
  <NuxtLink
    :to="`/blog/${slug}`"
    class="blog-post-card group"
    :class="[`blog-post-card--${variant}`, { 'blog-post-card--hero': variant === 'image' }]"
    :style="variant === 'image' && coverImage ? heroStyle : undefined"
  >
    <div class="blog-post-card__shade" aria-hidden="true" />
    <header class="blog-post-card__date">
      <span class="blog-post-card__day">{{ dateParts.day }}</span>
      <div class="blog-post-card__month-year">
        <span>{{ ym.month }}</span>
        <span>{{ ym.year }}</span>
      </div>
    </header>
    <h2 class="blog-post-card__title">{{ title }}</h2>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatBlogCardDate } from '~/app/utils/blog-format'
import { normalizeUploadedImageUrl } from '~/app/utils/media-url'

const props = defineProps<{
  slug: string
  title: string
  /** ISO-дата создания поста */
  createdAt: string
  coverImage?: string | null
  variant: 'image' | 'dark' | 'light'
}>()

const dateParts = computed(() => formatBlogCardDate(props.createdAt))

/** Месяц в строке родительного падежа + год второй строкой */
const ym = computed(() => {
  const raw = formatBlogCardDate(props.createdAt).monthYear.trim().split(/\s+/).filter(Boolean)
  const year = raw.pop() ?? ''
  const month = capitalize(raw.join(' ') || '')
  return { month: month.replace(/-/g, ' '), year }
})

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

const heroStyle = computed(() => {
  if (!props.coverImage) return {}
  const normalized = normalizeUploadedImageUrl(props.coverImage)
  if (!normalized) return {}
  const u = cssUrl(normalized)
  return u ? ({ backgroundImage: `url("${u}")` } as Record<string, string>) : {}
})

/** Экранирование для background-image url() */
function cssUrl(raw: string) {
  const t = raw.trim().replace(/^['"]+|['"]+$/g, '')
  return t.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '')
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;

.blog-post-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  aspect-ratio: 4 / 5;
  min-height: 280px;

  padding: 1.35rem;
  border-radius: 18px;
  overflow: hidden;
  position: relative;

  border: 1px solid transparent;

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;

  @media (max-width: $mobileBreakpoint) {
    aspect-ratio: 3 / 4;
    min-height: 260px;
  }
}

.blog-post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
}

.blog-post-card--image {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.08);
}

.blog-post-card--hero {
  background-size: cover;
  background-position: center;
}

.blog-post-card--dark {
  background: #3d3d45;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.06);
}

.blog-post-card--light {
  background: #fff;
  color: #1a1a1f;
  border-color: rgba(15, 23, 42, 0.08);
}

.blog-post-card__shade {
  display: none;
}

.blog-post-card--image .blog-post-card__shade {
  display: block;
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.32) 50%,
    rgba(0, 0, 0, 0.82) 100%
  );
}

.blog-post-card > *:not(.blog-post-card__shade) {
  position: relative;
  z-index: 1;
}

.blog-post-card__date {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.blog-post-card__day {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.02em;
  font-family: Inter, system-ui, sans-serif;

  @media (max-width: $mobileBreakpoint) {
    font-size: 2.25rem;
  }
}

.blog-post-card__month-year {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.08rem;
  padding-top: 0.18rem;
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.2;
  opacity: 0.95;
  font-family: Inter, system-ui, sans-serif;
}

.blog-post-card--light .blog-post-card__month-year {
  opacity: 0.8;
  color: #4b5563;
}

.blog-post-card__title {
  margin-top: auto;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  font-family: Inter, system-ui, sans-serif;
}

.blog-post-card--light .blog-post-card__title {
  color: #111827;
}
</style>
