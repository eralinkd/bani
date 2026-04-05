import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const payload = {
    name: String(body?.name ?? ''),
    url: String(body?.url ?? ''),
    logo: String(body?.logo ?? ''),
    telephone: String(body?.telephone ?? ''),
    email: String(body?.email ?? ''),
    sameAs: Array.isArray(body?.sameAs) ? body.sameAs.filter(Boolean) : [],
  }

  const row = await prisma.appData.upsert({
    where: { key: 'org-schema' },
    update: { payload },
    create: { key: 'org-schema', payload },
  })

  await refreshAppDataFromDb()
  return row
})
