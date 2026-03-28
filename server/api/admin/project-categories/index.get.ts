import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.projectCategory.findMany({ orderBy: { sortOrder: 'asc' } })
})
