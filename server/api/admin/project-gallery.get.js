import { prisma } from '../../utils/prisma'

const GALLERY_KEY = 'project-gallery'

export default defineEventHandler(async () => {
  const categories = await prisma.projectCategory.findMany({ orderBy: { sortOrder: 'asc' } })
  const row = await prisma.appData.findUnique({ where: { key: GALLERY_KEY } })
  const payload = row?.payload && typeof row.payload === 'object' && !Array.isArray(row.payload) ? row.payload : {}

  return categories.map((c) => {
    const raw = payload[c.id]
    const images = Array.isArray(raw) ? raw.filter((u) => typeof u === 'string') : []
    return {
      id: c.id,
      title: c.title,
      sortOrder: c.sortOrder,
      images: [...images],
    }
  })
})
