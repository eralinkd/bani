import { prisma } from '../../../utils/prisma'
import { refreshProductsFromDb } from '../../../utils/products-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })
  const slug = String(body?.slug ?? '').trim()
  if (!slug) throw createError({ statusCode: 400, message: 'slug is required' })

  const category = await prisma.productCategory.update({
    where: { id },
    data: { title, slug, sortOrder: Number(body?.sortOrder ?? 0) },
  })
  await refreshProductsFromDb()
  return category
})
