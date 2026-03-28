import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const product = await prisma.product.findUnique({
    where: { id },
    include: { sizes: { orderBy: { sortOrder: 'asc' } } },
  })
  if (!product) throw createError({ statusCode: 404, message: 'Product not found' })

  return product
})
