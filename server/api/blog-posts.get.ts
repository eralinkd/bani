import { prisma } from '../utils/prisma'

/** Вынесено из /api/blog/posts: иначе Nitro отдаёт это в [slug].get.ts (slug = "posts") → 404. */
export default defineEventHandler(async () => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      coverImage: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return posts
})
