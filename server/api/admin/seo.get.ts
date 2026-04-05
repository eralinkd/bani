import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const rows = await prisma.seo.findMany()
  return Object.fromEntries(rows.map((r) => [r.key, r]))
})
