import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  try {
    await prisma.blogPost.delete({ where: { id } })
    return { ok: true }
  } catch (e: unknown) {
    const code = typeof e === 'object' && e !== null && 'code' in e ? (e as { code: string }).code : ''
    if (code === 'P2025') throw createError({ statusCode: 404, message: 'not found' })
    throw e
  }
})
