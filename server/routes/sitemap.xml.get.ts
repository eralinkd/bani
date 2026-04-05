import { getSeo } from '../utils/seo-store'

export default defineEventHandler((event) => {
  const seo = getSeo()
  const content = seo?.sitemapXml ?? '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>'

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return content
})
