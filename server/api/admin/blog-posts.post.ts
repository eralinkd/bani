import { prisma } from '../../utils/prisma'
import { isDocContent } from '../../../shared/blog-doc'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })

  let slug = String(body?.slug ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[/\\?#%]+/g, '')
    .slice(0, 160)
  if (!slug) slug = `post-${Date.now()}`

  const content = body?.content
  if (!isDocContent(content)) {
    throw createError({ statusCode: 400, message: 'content must be a TipTap doc (JSON with type "doc")' })
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        coverImage: body?.coverImage ? String(body.coverImage) : null,
        content,
        published: Boolean(body?.published),
      },
    })
    return post
  } catch (e: unknown) {
    const code = typeof e === 'object' && e !== null && 'code' in e ? (e as { code: string }).code : ''
    if (code === 'P2002') {
      throw createError({ statusCode: 409, message: 'slug already exists' })
    }
    throw e
  }
})
