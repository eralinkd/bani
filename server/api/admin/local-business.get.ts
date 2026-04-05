import { prisma } from '../../utils/prisma'

const DEFAULT = {
  name: '',
  url: '',
  telephone: '',
  email: '',
  streetAddress: '',
  addressLocality: '',
  postalCode: '',
  addressCountry: 'RU',
  latitude: '',
  longitude: '',
  openingHours: [] as string[],
}

export default defineEventHandler(async () => {
  const row = await prisma.appData.findUnique({ where: { key: 'local-business' } })
  if (!row) return DEFAULT
  const p = row.payload as Record<string, unknown>
  return {
    name: String(p.name ?? ''),
    url: String(p.url ?? ''),
    telephone: String(p.telephone ?? ''),
    email: String(p.email ?? ''),
    streetAddress: String(p.streetAddress ?? ''),
    addressLocality: String(p.addressLocality ?? ''),
    postalCode: String(p.postalCode ?? ''),
    addressCountry: String(p.addressCountry ?? 'RU'),
    latitude: String(p.latitude ?? ''),
    longitude: String(p.longitude ?? ''),
    openingHours: Array.isArray(p.openingHours) ? p.openingHours as string[] : [],
  }
})
