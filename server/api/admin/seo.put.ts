import { prisma } from '../../utils/prisma'
import { refreshSeoFromDb } from '../../utils/seo-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const key = String(body?.key ?? 'main')
  const title = String(body?.title ?? '')
  const description = String(body?.description ?? '')
  const robotsTxt = body?.robotsTxt != null ? String(body.robotsTxt) : null
  const sitemapXml = body?.sitemapXml != null ? String(body.sitemapXml) : null

  const seo = await prisma.seo.upsert({
    where: { key },
    update: { title, description, ...(robotsTxt !== null && { robotsTxt }), ...(sitemapXml !== null && { sitemapXml }) },
    create: { key, title, description, robotsTxt, sitemapXml },
  })

  await refreshSeoFromDb()
  return seo
})
