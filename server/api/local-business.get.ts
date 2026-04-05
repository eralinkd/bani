import { getAppData } from '../utils/app-data-store'

export default defineEventHandler(() => {
  const appData = getAppData()
  const raw = appData?.['local-business'] as Record<string, unknown> | undefined
  if (!raw) return null
  return {
    name: String(raw.name ?? ''),
    url: String(raw.url ?? ''),
    telephone: String(raw.telephone ?? ''),
    email: String(raw.email ?? ''),
    streetAddress: String(raw.streetAddress ?? ''),
    addressLocality: String(raw.addressLocality ?? ''),
    postalCode: String(raw.postalCode ?? ''),
    addressCountry: String(raw.addressCountry ?? 'RU'),
    latitude: String(raw.latitude ?? ''),
    longitude: String(raw.longitude ?? ''),
    openingHours: Array.isArray(raw.openingHours) ? raw.openingHours as string[] : [],
  }
})
