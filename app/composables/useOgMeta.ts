/**
 * Sets OpenGraph meta tags.
 * Pass a getter function for reactive values.
 */
export function useOgMeta(getOptions: () => {
  type?: string
  title?: string
  description?: string
  image?: string
  url?: string
} = () => ({})) {
  const { data: seoData } = useNuxtData('seo')
  const { data: orgSchema } = useNuxtData('org-schema')
  const requestUrl = useRequestURL()

  useHead(() => {
    const opts = getOptions()
    const siteName = orgSchema.value?.name || seoData.value?.main?.title || ''
    const defaultImage = orgSchema.value?.logo || ''
    const image = opts.image || defaultImage

    const meta: { property: string; content: string }[] = [
      { property: 'og:type', content: opts.type || 'website' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:url', content: opts.url || requestUrl.href },
    ]

    if (siteName) meta.push({ property: 'og:site_name', content: siteName })
    if (opts.title) meta.push({ property: 'og:title', content: opts.title })
    if (opts.description) meta.push({ property: 'og:description', content: opts.description })

    if (image) {
      meta.push({ property: 'og:image', content: image })
      meta.push({ property: 'og:image:width', content: '1200' })
      meta.push({ property: 'og:image:height', content: '630' })
    }

    return { meta }
  })
}
