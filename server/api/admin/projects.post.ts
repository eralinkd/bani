import { prisma } from '../../utils/prisma'
import { refreshProjectsFromDb } from '../../utils/projects-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })
  const categoryId = String(body?.categoryId ?? '').trim()
  if (!categoryId) throw createError({ statusCode: 400, message: 'categoryId is required' })

  const project = await prisma.project.create({
    data: {
      title,
      description: String(body?.description ?? ''),
      textBlock1: body?.textBlock1 ? String(body.textBlock1) : null,
      textBlock2: body?.textBlock2 ? String(body.textBlock2) : null,
      videoUrl: body?.videoUrl ? String(body.videoUrl) : null,
      categoryId,
      sortOrder: Number(body?.sortOrder ?? 0),
      images: Array.isArray(body?.images) ? body.images : [],
    },
  })

  await refreshProjectsFromDb()
  return project
})
