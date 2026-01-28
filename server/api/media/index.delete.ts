import { createError, readBody } from 'h3'
import { promises as fs } from 'node:fs'
import { resolveMediaPath } from '../../utils/media'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ path?: string }>(event)
  const target = body?.path || ''

  if (!target) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  const { fullPath } = await resolveMediaPath(target)
  await fs.rm(fullPath, { recursive: true, force: true })

  return { ok: true }
})
