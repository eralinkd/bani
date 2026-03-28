import { prisma } from '../../../utils/prisma'
import { refreshProjectsFromDb } from '../../../utils/projects-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const body = await readBody(event)

  const project = await prisma.project.update({
    where: { id },
    data: {
      title: String(body?.title ?? ''),
      description: String(body?.description ?? ''),
      textBlock1: body?.textBlock1 ? String(body.textBlock1) : null,
      textBlock2: body?.textBlock2 ? String(body.textBlock2) : null,
      videoUrl: body?.videoUrl ? String(body.videoUrl) : null,
      categoryId: String(body?.categoryId ?? ''),
      sortOrder: Number(body?.sortOrder ?? 0),
      images: Array.isArray(body?.images) ? body.images : [],
    },
  })

  await refreshProjectsFromDb()
  return project
})
