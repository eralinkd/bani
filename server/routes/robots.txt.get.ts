import { getSeo } from '../utils/seo-store'

export default defineEventHandler((event) => {
  const seo = getSeo()
  const content = seo?.robotsTxt ?? 'User-agent: *\nAllow: /'

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return content
})
