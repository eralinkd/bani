import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const seo = await prisma.seo.findFirst({ where: { key: 'main' } })
  return seo ?? { key: 'main', title: '', description: '' }
})
