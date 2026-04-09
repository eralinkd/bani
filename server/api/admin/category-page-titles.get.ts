import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const [categoriesRaw, appDataRow] = await Promise.all([
    prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.appData.findUnique({ where: { key: 'category-page-titles' } }),
  ])

  const titles = (appDataRow?.payload as Record<string, string> | null) ?? {}

  return categoriesRaw.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    pageTitle: titles[cat.slug] ?? '',
  }))
})
