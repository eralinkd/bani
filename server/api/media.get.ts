import { getQuery } from 'h3'
import { listMedia } from '../utils/media'
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = typeof query.path === 'string' ? query.path : ''
  const listing = await listMedia(path)
  const fileUrls = listing.items
    .filter((item) => item.type === 'file' && item.url)
    .map((item) => item.url)

  if (!fileUrls.length) return listing

  const media = await prisma.media.findMany({
    where: { url: { in: fileUrls } },
    select: {
      id: true,
      url: true,
      productImages: {
        select: { id: true, product: { select: { id: true, title: true } } },
      },
      projectImages: {
        select: { id: true, project: { select: { id: true, title: true } } },
      },
    },
  })

  const usageMap = new Map(
    media.map((item) => [
      item.url,
      {
        id: item.id,
        products: item.productImages.map((link) => ({
          linkId: link.id,
          ...link.product,
        })),
        projects: item.projectImages.map((link) => ({
          linkId: link.id,
          ...link.project,
        })),
      },
    ])
  )

  const items = listing.items.map((item) => {
    if (item.type !== 'file' || !item.url) return item
    const usage = usageMap.get(item.url)
    return {
      ...item,
      mediaId: usage?.id ?? null,
      usedInProducts: usage?.products ?? [],
      usedInProjects: usage?.projects ?? [],
    }
  })

  return { ...listing, items }
})
