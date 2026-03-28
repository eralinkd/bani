import { prisma } from '../../../utils/prisma'
import { refreshProductsFromDb } from '../../../utils/products-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const body = await readBody(event)
  const sizes = Array.isArray(body?.sizes) ? body.sizes : []

  // Replace all sizes: delete existing, create new
  await prisma.productSize.deleteMany({ where: { productId: id } })

  const product = await prisma.product.update({
    where: { id },
    data: {
      title: String(body?.title ?? ''),
      slug: String(body?.slug ?? ''),
      description: String(body?.description ?? ''),
      materials: body?.materials ? String(body.materials) : null,
      stove: body?.stove ? String(body.stove) : null,
      interiorHtml: body?.interiorHtml ? String(body.interiorHtml) : null,
      characteristicsHtml: body?.characteristicsHtml ? String(body.characteristicsHtml) : null,
      kitHtml: body?.kitHtml ? String(body.kitHtml) : null,
      isPopular: Boolean(body?.isPopular),
      categoryId: String(body?.categoryId ?? ''),
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
    include: { sizes: { orderBy: { sortOrder: 'asc' } } },
  })

  await refreshProductsFromDb()
  return product
})
