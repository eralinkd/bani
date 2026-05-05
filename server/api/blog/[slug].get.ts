import { prisma } from '../../utils/prisma'
import {
  blogPreparedDocToHtml,
  extractToc,
  prepareBlogDoc,
  estimateReadingMinutesFromPrepared,
} from '~/shared/blog-render'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'slug required' })

  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  })

  if (!post) throw createError({ statusCode: 404, message: 'Not found' })

  const prepared = prepareBlogDoc(post.content)
  const bodyHtml = blogPreparedDocToHtml(prepared)
  const toc = extractToc(prepared)
  const readingMinutes = estimateReadingMinutesFromPrepared(prepared)

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    coverImage: post.coverImage,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    bodyHtml,
    toc,
    readingMinutes,
  }
})
