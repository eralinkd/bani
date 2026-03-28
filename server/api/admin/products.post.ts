import { prisma } from '../../utils/prisma'
import { refreshProductsFromDb } from '../../utils/products-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })
  const slug = String(body?.slug ?? '').trim()
  if (!slug) throw createError({ statusCode: 400, message: 'slug is required' })
  const categoryId = String(body?.categoryId ?? '').trim()
  if (!categoryId) throw createError({ statusCode: 400, message: 'categoryId is required' })

  const sizes = Array.isArray(body?.sizes) ? body.sizes : []

  const product = await prisma.product.create({
    data: {
      title,
      slug,
      description: String(body?.description ?? ''),
      materials: body?.materials ? String(body.materials) : null,
      stove: body?.stove ? String(body.stove) : null,
      interiorHtml: body?.interiorHtml ? String(body.interiorHtml) : null,
      characteristicsHtml: body?.characteristicsHtml ? String(body.characteristicsHtml) : null,
      kitHtml: body?.kitHtml ? String(body.kitHtml) : null,
      isPopular: Boolean(body?.isPopular),
      categoryId,
      sortOrder: Number(body?.sortOrder ?? 0),
      images: Array.isArray(body?.images) ? body.images : [],
      sizes: {
        create: sizes.map((s: any, i: number) => ({
          label: String(s.label ?? ''),
          value: String(s.value ?? ''),
          price: Number(s.price ?? 0),
          code: String(s.code ?? ''),
          sortOrder: Number(s.sortOrder ?? i),
        })),
      },
    },
    include: { sizes: true },
  })

  await refreshProductsFromDb()
  return product
})
