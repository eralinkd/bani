/**
 * Sets page-specific meta tags (title, description, OG) using SEO data from the database.
 * Falls back to provided defaults if no DB record exists for the key.
 */
export function useSeoPage(key: string, defaults: { title?: string; description?: string } = {}) {
  const { data: seoData } = useNuxtData<Record<string, { title: string; description: string }>>('seo')

  const pageSeo = computed(() => seoData.value?.[key])

  const title = computed(() => pageSeo.value?.title || defaults.title || '')
  const description = computed(() => pageSeo.value?.description || defaults.description || '')

  useHead(() => ({
    title: title.value,
    meta: description.value ? [{ name: 'description', content: description.value }] : [],
  }))

  useOgMeta(() => ({
    title: title.value,
    description: description.value,
  }))
}
