<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-gray-900">Админ-панель</h1>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="item in links"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <UIcon :name="item.icon" class="size-5 text-blue-600" />
        </div>
        <div>
          <p class="font-medium text-gray-900">{{ item.label }}</p>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const links = [
  { to: '/admin/seo', label: 'SEO', icon: 'i-lucide-search', description: 'Заголовок и описание сайта' },
  { to: '/admin/project-categories', label: 'Категории проектов', icon: 'i-lucide-folder', description: 'Управление категориями' },
  { to: '/admin/projects', label: 'Проекты', icon: 'i-lucide-layout-grid', description: 'Список проектов' },
  { to: '/admin/product-categories', label: 'Категории товаров', icon: 'i-lucide-tag', description: 'Управление категориями' },
  { to: '/admin/products', label: 'Товары', icon: 'i-lucide-package', description: 'Каталог товаров' },
  { to: '/admin/images', label: 'Медиатека', icon: 'i-lucide-images', description: 'Изображения' },
]
</script>
