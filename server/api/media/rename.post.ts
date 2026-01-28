import { createError, readBody } from 'h3'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { resolveMediaPath, sanitizeName } from '../../utils/media'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ path?: string; name?: string }>(event)
  const currentPath = body?.path || ''
  const name = sanitizeName(body?.name || '')

  if (!currentPath) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  const { fullPath } = await resolveMediaPath(currentPath)
  const parentDir = path.dirname(fullPath)
  const nextPath = path.join(parentDir, name)

  await fs.rename(fullPath, nextPath)
  return { path: path.join(path.dirname(currentPath), name).replace(/\\/g, '/') }
})
