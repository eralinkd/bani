import { prisma } from '../../utils/prisma'
import { refreshSeoFromDb } from '../../utils/seo-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const title = String(body?.title ?? '')
  const description = String(body?.description ?? '')

  const seo = await prisma.seo.upsert({
    where: { key: 'main' },
    update: { title, description },
    create: { key: 'main', title, description },
  })

  await refreshSeoFromDb()
  return seo
})
