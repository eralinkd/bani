import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.product.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      category: { select: { id: true, title: true, slug: true } },
      sizes: { orderBy: { sortOrder: 'asc' } },
    },
  })
})
