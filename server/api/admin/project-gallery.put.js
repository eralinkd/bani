import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'

const GALLERY_KEY = 'project-gallery'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const gallery = body?.gallery
  if (!gallery || typeof gallery !== 'object' || Array.isArray(gallery)) {
    throw createError({ statusCode: 400, message: 'Expected object { gallery: Record<string, string[]> }' })
  }

  const categories = await prisma.projectCategory.findMany({ select: { id: true } })
  const allowed = new Set(categories.map((c) => c.id))

  const normalized = {}
  for (const id of allowed) {
    const arr = gallery[id]
    normalized[id] = Array.isArray(arr)
      ? arr.map((u) => String(u ?? '').trim()).filter(Boolean)
      : []
  }

  await prisma.appData.upsert({
    where: { key: GALLERY_KEY },
    update: { payload: normalized },
    create: { key: GALLERY_KEY, payload: normalized },
  })

  await refreshAppDataFromDb()
  return { ok: true }
})
