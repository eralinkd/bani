import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { createError, sendStream, setResponseHeader } from 'h3'

const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path')
  if (!pathParam) throw createError({ statusCode: 404 })

  const safePath = pathParam.replace(/\.\./g, '')
  const fullPath = path.join(uploadsDir, safePath)

  if (!fullPath.startsWith(uploadsDir)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  try {
    const st = await stat(fullPath)
    if (!st.isFile()) throw createError({ statusCode: 404 })

    const ext = path.extname(fullPath).toLowerCase()
    const mime = MIME[ext] || 'application/octet-stream'

    setResponseHeader(event, 'Content-Type', mime)
    setResponseHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')

    return sendStream(event, createReadStream(fullPath))
  } catch (e) {
    if (e && typeof e === 'object' && 'statusCode' in e) throw e
    throw createError({ statusCode: 404 })
  }
})
