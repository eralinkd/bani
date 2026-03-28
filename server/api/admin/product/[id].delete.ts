import { prisma } from '../../../utils/prisma'
import { refreshProductsFromDb } from '../../../utils/products-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  await prisma.product.delete({ where: { id } })
  await refreshProductsFromDb()
  return { ok: true }
})
