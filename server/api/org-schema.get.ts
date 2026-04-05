import { getAppData } from '../utils/app-data-store'

export default defineEventHandler(() => {
  const appData = getAppData()
  const raw = appData?.['org-schema'] as Record<string, unknown> | undefined
  if (!raw) return null
  return {
    name: String(raw.name ?? ''),
    url: String(raw.url ?? ''),
    logo: String(raw.logo ?? ''),
    telephone: String(raw.telephone ?? ''),
    email: String(raw.email ?? ''),
    sameAs: Array.isArray(raw.sameAs) ? raw.sameAs as string[] : [],
  }
})
