import { prisma } from '../../utils/prisma'

const DEFAULT_SCHEMA = {
  name: '',
  url: '',
  logo: '',
  telephone: '',
  email: '',
  sameAs: [] as string[],
}

export default defineEventHandler(async () => {
  const row = await prisma.appData.findUnique({ where: { key: 'org-schema' } })
  if (!row) return DEFAULT_SCHEMA
  const payload = row.payload as Record<string, unknown>
  return {
    name: String(payload.name ?? ''),
    url: String(payload.url ?? ''),
    logo: String(payload.logo ?? ''),
    telephone: String(payload.telephone ?? ''),
    email: String(payload.email ?? ''),
    sameAs: Array.isArray(payload.sameAs) ? payload.sameAs as string[] : [],
  }
})
