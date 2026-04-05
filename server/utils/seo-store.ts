import { prisma } from './prisma'

const CACHE_KEY = 'seo'

interface SeoPage {
  title: string
  description: string
  robotsTxt: string | null
  sitemapXml: string | null
}

let pages: Record<string, SeoPage> = {}

function log(success: boolean, message?: string) {
  const ts = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  console.log(`[${ts}] DB REFRESH [${CACHE_KEY}] ${status}${msg}`)
}

export function getSeo(key = 'main'): SeoPage | null {
  return pages[key] ?? null
}

export function getAllSeo(): Record<string, SeoPage> {
  return pages
}

export async function refreshSeoFromDb() {
  try {
    const rows = await prisma.seo.findMany()
    pages = {}
    for (const row of rows) {
      pages[row.key] = {
        title: row.title,
        description: row.description,
        robotsTxt: row.robotsTxt ?? null,
        sitemapXml: row.sitemapXml ?? null,
      }
    }
    log(true, `${rows.length} rows`)
  } catch (err: any) {
    log(false, err?.message ?? String(err))
  }
}

export function startSeoRefresh(intervalMs: number) {
  setInterval(refreshSeoFromDb, intervalMs)
}
