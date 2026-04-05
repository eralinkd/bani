<template>
  <NuxtLayout>
    <NuxtPage />
    <UIModal v-model="modalIsOpen" :type="modalTypeValue" />
  </NuxtLayout>
</template>

<script setup>
import { useModal } from './composables/useModal'

const route = useRoute()
const modal = useModal()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const { data: seoData } = await useAsyncData('seo', () => $fetch('/api/seo'))
const { data: orgSchema } = await useAsyncData('org-schema', () => $fetch('/api/org-schema'))

const mainSeo = computed(() => seoData.value?.main ?? {})
const siteName = computed(() => mainSeo.value.title || 'Бани 21 века')

const jsonLd = computed(() => {
  const org = orgSchema.value
  if (!org || !org.name) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    ...(org.url && { url: org.url }),
    ...(org.logo && { logo: org.logo }),
    ...(org.sameAs?.length && { sameAs: org.sameAs }),
    ...((org.telephone || org.email) && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        ...(org.telephone && { telephone: org.telephone }),
        ...(org.email && { email: org.email }),
      },
    }),
  }
  return JSON.stringify(schema)
})

useHead(() => ({
  htmlAttrs: { class: isAdmin.value ? 'admin-root' : 'site-content' },
  titleTemplate: (chunk) => (chunk ? `${chunk} | ${siteName.value}` : siteName.value),
  meta: [{ name: 'description', content: mainSeo.value.description || '' }],
  script: jsonLd.value ? [{ type: 'application/ld+json', innerHTML: jsonLd.value }] : [],
}))

useOgMeta()

const modalIsOpen = computed({
  get: () => modal.isOpen.value,
  set: (value) => {
    if (value) {
      modal.open(modal.modalType.value)
    } else {
      modal.close()
    }
  },
})

const modalTypeValue = computed(() => modal.modalType.value)
</script>
