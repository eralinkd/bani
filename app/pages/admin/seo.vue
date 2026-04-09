<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-6 text-2xl font-bold">SEO</h1>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="space-y-6">
      <!-- Page sections -->
      <UCard v-for="page in pageConfigs" :key="page.key">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">{{ page.label }}</p>
              <p class="text-xs text-gray-400">{{ page.url }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="savedKey === page.key" class="text-sm text-green-600">Сохранено</span>
              <UButton size="sm" :loading="savingKey === page.key" @click="save(page.key)">
                Сохранить
              </UButton>
            </div>
          </div>
        </template>

        <div class="space-y-3">
          <UFormField label="Заголовок (title)" class="w-full">
            <UInput v-model="forms[page.key].title" class="w-full" :placeholder="page.defaultTitle" />
          </UFormField>
          <UFormField label="Мета-описание (description)" class="w-full">
            <UTextarea v-model="forms[page.key].description" class="w-full" :rows="3" placeholder="Описание для поисковых систем" />
          </UFormField>
          <template v-if="page.key === 'main'">
            <UFormField label="robots.txt" class="w-full">
              <div class="flex items-center justify-between mb-1">
                <span />
                <UButton variant="ghost" size="xs" icon="i-lucide-external-link" to="/robots.txt" target="_blank">Открыть</UButton>
              </div>
              <UTextarea v-model="forms[page.key].robotsTxt" class="w-full font-mono" :rows="6" placeholder="User-agent: *&#10;Allow: /" />
            </UFormField>
            <UFormField label="sitemap.xml" class="w-full">
              <div class="flex items-center justify-between mb-1">
                <span />
                <UButton variant="ghost" size="xs" icon="i-lucide-external-link" to="/sitemap.xml" target="_blank">Открыть</UButton>
              </div>
              <UTextarea v-model="forms[page.key].sitemapXml" class="w-full font-mono" :rows="10" placeholder='<?xml version="1.0" encoding="UTF-8"?>&#10;<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">&#10;</urlset>' />
            </UFormField>
          </template>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const STATIC_CONFIGS = [
  { key: 'main', label: 'Главная', url: '/', defaultTitle: 'Бани 21 века' },
  { key: 'catalog', label: 'Каталог', url: '/catalog', defaultTitle: 'Каталог' },
  { key: 'our-products', label: 'Наши работы', url: '/our-products', defaultTitle: 'Наши работы' },
  { key: 'contacts', label: 'Контакты', url: '/contacts', defaultTitle: 'Контакты' },
  { key: 'about', label: 'О нас', url: '/about', defaultTitle: 'О нас' },
]

const [{ data, pending, refresh }, { data: categoriesData }] = await Promise.all([
  useFetch('/api/admin/seo'),
  useFetch('/api/admin/product-categories'),
])

const categoryConfigs = computed(() =>
  (categoriesData.value ?? []).map((cat) => ({
    key: `catalog-${cat.slug}`,
    label: `Категория: ${cat.title}`,
    url: `/catalog/${cat.slug}`,
    defaultTitle: cat.title,
  }))
)

const pageConfigs = computed(() => [...STATIC_CONFIGS, ...categoryConfigs.value])

const forms = ref({})

function initForms(seoData, configs) {
  const next = {}
  for (const page of configs) {
    const row = seoData?.[page.key]
    next[page.key] = {
      title: row?.title ?? '',
      description: row?.description ?? '',
      robotsTxt: row?.robotsTxt ?? '',
      sitemapXml: row?.sitemapXml ?? '',
    }
  }
  forms.value = next
}

watch([data, pageConfigs], ([seoVal, configs]) => {
  initForms(seoVal, configs)
}, { immediate: true })

const savingKey = ref(null)
const savedKey = ref(null)

async function save(key) {
  savingKey.value = key
  savedKey.value = null
  try {
    await $fetch('/api/admin/seo', {
      method: 'PUT',
      body: { key, ...forms.value[key] },
    })
    savedKey.value = key
    await refresh()
    setTimeout(() => { if (savedKey.value === key) savedKey.value = null }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    savingKey.value = null
  }
}
</script>

