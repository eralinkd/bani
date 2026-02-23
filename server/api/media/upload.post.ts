import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createError, getQuery, readMultipartFormData } from 'h3'
import { ensureUniqueFilename, resolveMediaPath } from '../../utils/media'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const target = typeof query.path === 'string' ? query.path : ''
    const { fullPath } = await resolveMediaPath(target)

    if (process.env.DEBUG_MEDIA || 1) {
      console.info('[media/upload] target:', target, 'fullPath:', fullPath)
    }

    const parts = await readMultipartFormData(event)
    if (!parts?.length) return { uploaded: [] }

    const uploaded: Array<{ name: string; path: string; url: string }> = []

    for (const part of parts) {
      if (!part.filename || !part.data) continue
      const safeName = await ensureUniqueFilename(fullPath, part.filename)
      const filePath = path.join(fullPath, safeName)
      await fs.writeFile(filePath, part.data)
      const relativePath = path.join(target, safeName).replace(/\\/g, '/')
      const url = `/uploads/${relativePath}`
      const pathParts = relativePath.split('/').filter(Boolean)
      const name = pathParts[pathParts.length - 1] || safeName
      const folder = pathParts.slice(0, -1).join('/')

      await prisma.media.upsert({
        where: { url },
        update: { name, folder },
        create: { url, name, folder },
      })

      uploaded.push({
        name: safeName,
        path: relativePath,
        url,
      })
    }

    return { uploaded }
  } catch (error) {
    console.error('[media/upload] error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Upload failed',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
