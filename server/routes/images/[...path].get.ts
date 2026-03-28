import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { IMAGES_ROOT } from '../../utils/image-manager'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

export default defineEventHandler((event) => {
  const segments = getRouterParam(event, 'path') ?? ''
  const sanitized = String(segments).replace(/\.\./g, '')
  const filePath = path.join(IMAGES_ROOT, sanitized)

  const resolved = path.resolve(filePath)
  if (!resolved.startsWith(path.resolve(IMAGES_ROOT))) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  if (!existsSync(resolved)) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  const ext = path.extname(resolved).toLowerCase()
  const mime = MIME[ext] ?? 'application/octet-stream'

  setResponseHeader(event, 'Content-Type', mime)
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return sendStream(event, createReadStream(resolved))
})
