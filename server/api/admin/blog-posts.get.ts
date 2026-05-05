import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return posts
})
