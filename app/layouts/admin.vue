<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-64 shrink-0 border-r border-gray-200 bg-white">
      <div class="flex h-16 items-center border-b border-gray-200 px-6">
        <NuxtLink to="/admin" class="text-lg font-semibold text-gray-900">Бани 21 века</NuxtLink>
      </div>
      <nav class="space-y-1 p-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-700 font-medium"
        >
          <UIcon :name="item.icon" class="size-4 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>
    <main class="flex-1 overflow-auto p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const navItems = [
  { to: '/admin', label: 'Дашборд', icon: 'i-lucide-home' },
  { to: '/admin/seo', label: 'SEO', icon: 'i-lucide-search' },
  { to: '/admin/project-categories', label: 'Кат. проектов', icon: 'i-lucide-folder' },
  { to: '/admin/projects', label: 'Проекты', icon: 'i-lucide-layout-grid' },
  { to: '/admin/gallery', label: 'Галерея', icon: 'i-lucide-gallery-horizontal' },
  { to: '/admin/products', label: 'Товары', icon: 'i-lucide-package' },
  { to: '/admin/blog', label: 'Блог', icon: 'i-lucide-newspaper' },
  { to: '/admin/images', label: 'Медиатека', icon: 'i-lucide-images' },
  { to: '/admin/schema', label: 'Organization', icon: 'i-lucide-code' },
  { to: '/admin/local-business', label: 'LocalBusiness', icon: 'i-lucide-map-pin' },
  { to: '/admin/reviews', label: 'Отзывы', icon: 'i-lucide-star' },
  { to: '/admin/category-page-titles', label: 'Заголовки каталога', icon: 'i-lucide-heading' },
  { to: '/admin/home-page', label: 'Слайдер на главной', icon: 'i-lucide-layout-template' },
]
</script>
