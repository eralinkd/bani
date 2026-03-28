import { prisma } from './prisma'

const CACHE_KEY = 'seo'

let data: { title: string; description: string } | null = null

function log(success: boolean, message?: string) {
  const ts = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  console.log(`[${ts}] DB REFRESH [${CACHE_KEY}] ${status}${msg}`)
}

export function getSeo() {
  return data
}

export async function refreshSeoFromDb() {
  try {
    const row = await prisma.seo.findFirst({ where: { key: 'main' } })
    data = row ? { title: row.title, description: row.description } : null
    log(true, row ? undefined : 'no rows')
  } catch (err: any) {
    log(false, err?.message ?? String(err))
  }
}

export function startSeoRefresh(intervalMs: number) {
  setInterval(refreshSeoFromDb, intervalMs)
}
