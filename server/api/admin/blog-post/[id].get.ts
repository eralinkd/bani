import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) throw createError({ statusCode: 404, message: 'not found' })

  return post
})
