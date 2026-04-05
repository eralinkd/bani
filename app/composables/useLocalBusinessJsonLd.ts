export function useLocalBusinessJsonLd() {
  const { data: lb } = useAsyncData('local-business', () => $fetch('/api/local-business'))

  const jsonLd = computed(() => {
    const d = lb.value
    if (!d || !d.name) return null

    const hasAddress = d.streetAddress || d.addressLocality || d.postalCode
    const hasGeo = d.latitude && d.longitude

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: d.name,
      ...(d.url && { url: d.url }),
      ...(d.telephone && { telephone: d.telephone }),
      ...(d.email && { email: d.email }),
      ...(d.openingHours?.length && { openingHours: d.openingHours }),
      ...(hasAddress && {
        address: {
          '@type': 'PostalAddress',
          ...(d.streetAddress && { streetAddress: d.streetAddress }),
          ...(d.addressLocality && { addressLocality: d.addressLocality }),
          ...(d.postalCode && { postalCode: d.postalCode }),
          ...(d.addressCountry && { addressCountry: d.addressCountry }),
        },
      }),
      ...(hasGeo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: d.latitude,
          longitude: d.longitude,
        },
      }),
    }

    return JSON.stringify(schema)
  })

  useHead(() => ({
    script: jsonLd.value ? [{ type: 'application/ld+json', innerHTML: jsonLd.value }] : [],
  }))
}
