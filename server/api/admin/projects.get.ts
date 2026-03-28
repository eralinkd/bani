import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { category: { select: { id: true, title: true } } },
  })
})
