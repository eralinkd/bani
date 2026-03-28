import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } })
})
