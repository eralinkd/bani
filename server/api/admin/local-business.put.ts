import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const payload = {
    name: String(body?.name ?? ''),
    url: String(body?.url ?? ''),
    telephone: String(body?.telephone ?? ''),
    email: String(body?.email ?? ''),
    streetAddress: String(body?.streetAddress ?? ''),
    addressLocality: String(body?.addressLocality ?? ''),
    postalCode: String(body?.postalCode ?? ''),
    addressCountry: String(body?.addressCountry ?? 'RU'),
    latitude: String(body?.latitude ?? ''),
    longitude: String(body?.longitude ?? ''),
    openingHours: Array.isArray(body?.openingHours) ? body.openingHours.filter(Boolean) : [],
  }

  const row = await prisma.appData.upsert({
    where: { key: 'local-business' },
    update: { payload },
    create: { key: 'local-business', payload },
  })

  await refreshAppDataFromDb()
  return row
})
