import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const payload = {
    gis2: String(body?.gis2 ?? ''),
    google: String(body?.google ?? ''),
    yandex: String(body?.yandex ?? ''),
  }

  await prisma.appData.upsert({
    where: { key: 'review-links' },
    update: { payload },
    create: { key: 'review-links', payload },
  })

  await refreshAppDataFromDb()
  return payload
})
