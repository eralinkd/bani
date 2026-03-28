import { prisma } from './prisma'

const CACHE_KEY = 'app-data'

let data: Record<string, unknown> | null = null

function log(success: boolean, message?: string) {
  const ts = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  console.log(`[${ts}] DB REFRESH [${CACHE_KEY}] ${status}${msg}`)
}

export function getAppData() {
  return data
}

export async function refreshAppDataFromDb() {
  try {
    const rows = await prisma.appData.findMany()
    const merged: Record<string, unknown> = {}
    for (const row of rows) {
      merged[row.key] = row.payload
    }
    data = rows.length > 0 ? merged : null
    log(true, rows.length === 0 ? 'no rows' : undefined)
  } catch (err: any) {
    log(false, err?.message ?? String(err))
  }
}

export function startAppDataRefresh(intervalMs: number) {
  setInterval(refreshAppDataFromDb, intervalMs)
}
