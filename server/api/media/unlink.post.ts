import { createError, readBody } from 'h3'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    type?: 'product' | 'project'
    linkId?: string
  }>(event)

  const type = body?.type
  const linkId = body?.linkId || ''

  if (!type || !linkId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }

  if (type === 'product') {
    await prisma.productImage.delete({ where: { id: linkId } })
    return { ok: true }
  }

  await prisma.projectImage.delete({ where: { id: linkId } })
  return { ok: true }
})
