import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw createError({ statusCode: 400, message: 'Expected object { slug: pageTitle }' })
  }

  const payload: Record<string, string> = {}
  for (const [slug, val] of Object.entries(body)) {
    payload[slug] = String(val ?? '').trim()
  }

  await prisma.appData.upsert({
    where: { key: 'category-page-titles' },
    update: { payload },
    create: { key: 'category-page-titles', payload },
  })

  await refreshAppDataFromDb()
  return { ok: true }
})
