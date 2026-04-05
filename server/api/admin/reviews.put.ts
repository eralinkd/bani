import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const reviews = (Array.isArray(body?.reviews) ? body.reviews : []).map((r: Record<string, unknown>, i: number) => ({
    id: String(r.id || Date.now().toString(36) + i),
    name: String(r.name ?? ''),
    date: String(r.date ?? ''),
    content: String(r.content ?? ''),
    sortOrder: Number(r.sortOrder ?? i),
  }))

  await prisma.appData.upsert({
    where: { key: 'reviews' },
    update: { payload: reviews },
    create: { key: 'reviews', payload: reviews },
  })

  await refreshAppDataFromDb()
  return { reviews }
})
