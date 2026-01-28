import { createError, readBody } from 'h3'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    mediaId?: string
    url?: string
    type?: 'product' | 'project'
    targetId?: string
    sortOrder?: number
  }>(event)

  const mediaId = body?.mediaId || ''
  const url = body?.url || ''
  const type = body?.type
  const targetId = body?.targetId || ''
  const sortOrder = body?.sortOrder ?? 1

  if ((!mediaId && !url) || !type || !targetId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }

  let resolvedMediaId = mediaId
  if (!resolvedMediaId && url) {
    const parts = url.split('/').filter(Boolean)
    const name = parts[parts.length - 1] || url
    const folder = parts.slice(1, -1).join('/')
    const created = await prisma.media.upsert({
      where: { url },
      update: { name, folder },
      create: { url, name, folder },
      select: { id: true },
    })
    resolvedMediaId = created.id
  }

  if (type === 'product') {
    const existing = await prisma.productImage.findFirst({
      where: { mediaId: resolvedMediaId, productId: targetId },
      select: { id: true },
    })
    if (existing) return { id: existing.id }

    const created = await prisma.productImage.create({
      data: { mediaId: resolvedMediaId, productId: targetId, sortOrder },
      select: { id: true },
    })
    return { id: created.id }
  }

  const existing = await prisma.projectImage.findFirst({
    where: { mediaId: resolvedMediaId, projectId: targetId },
    select: { id: true },
  })
  if (existing) return { id: existing.id }

  const created = await prisma.projectImage.create({
    data: { mediaId: resolvedMediaId, projectId: targetId, sortOrder },
    select: { id: true },
  })
  return { id: created.id }
})
