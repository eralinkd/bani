import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const reviewsRow = await prisma.appData.findUnique({ where: { key: 'reviews' } })
  const linksRow = await prisma.appData.findUnique({ where: { key: 'review-links' } })

  const reviews = Array.isArray(reviewsRow?.payload) ? reviewsRow.payload : []
  const links = (linksRow?.payload as Record<string, string> | undefined) ?? {}

  return {
    reviews,
    links: {
      gis2: String(links.gis2 ?? ''),
      google: String(links.google ?? ''),
      yandex: String(links.yandex ?? ''),
    },
  }
})
