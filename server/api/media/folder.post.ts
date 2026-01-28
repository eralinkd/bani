import { readBody } from 'h3'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { resolveMediaPath, sanitizeName } from '../../utils/media'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ path?: string; name?: string }>(event)
  const target = body?.path || ''
  const name = sanitizeName(body?.name || '')

  const { fullPath } = await resolveMediaPath(target)
  const nextPath = path.join(fullPath, name)
  await fs.mkdir(nextPath, { recursive: true })

  const relativePath = path.join(target, name).replace(/\\/g, '/')
  return { path: relativePath }
})
