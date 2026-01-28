import { createError } from 'h3'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')

const ensureUploadsDir = async () => {
  await fs.mkdir(uploadsDir, { recursive: true })
}

const normalizeRelative = (value: string) => {
  const cleaned = value.replace(/\\/g, '/').replace(/^\/+/, '')
  return cleaned === '.' ? '' : cleaned
}

export const resolveMediaPath = async (relativePath: string) => {
  await ensureUploadsDir()
  const safeRelative = normalizeRelative(relativePath || '')
  const fullPath = path.resolve(uploadsDir, safeRelative)
  if (!fullPath.startsWith(uploadsDir)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }
  return { fullPath, safeRelative }
}

export const listMedia = async (relativePath: string) => {
  const { fullPath, safeRelative } = await resolveMediaPath(relativePath)
  const entries = await fs.readdir(fullPath, { withFileTypes: true })

  const items = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(fullPath, entry.name)
      const stat = await fs.stat(entryPath)
      const itemPath = normalizeRelative(path.join(safeRelative, entry.name))
      return {
        name: entry.name,
        path: itemPath,
        type: entry.isDirectory() ? 'folder' : 'file',
        url: entry.isDirectory() ? null : `/uploads/${itemPath.replace(/\\/g, '/')}`,
        size: stat.size,
        updatedAt: stat.mtimeMs,
      }
    })
  )

  const sorted = items.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return { path: safeRelative, items: sorted }
}

export const ensureUniqueFilename = async (targetDir: string, filename: string) => {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  let candidate = filename
  let counter = 1

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await fs.access(path.join(targetDir, candidate))
      candidate = `${base}-${counter}${ext}`
      counter += 1
    } catch {
      return candidate
    }
  }
}

export const sanitizeName = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed || trimmed.includes('/') || trimmed.includes('\\')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name' })
  }
  return trimmed
}
