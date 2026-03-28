import { readdir, stat, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

export const IMAGES_ROOT = path.join(process.cwd(), 'public', 'images')

export function toImageUrl(relativePath: string): string {
  return '/images/' + relativePath.replace(/\\/g, '/')
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'])

export function isImageFile(filename: string): boolean {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase())
}

export function sanitizeName(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^a-zA-Zа-яёА-ЯЁ0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
  return cleaned || 'image'
}

export function ensureSafe(base: string, ...parts: string[]): string {
  const resolved = path.resolve(path.join(base, ...parts))
  if (!resolved.startsWith(path.resolve(base))) {
    throw new Error('Path traversal detected')
  }
  return resolved
}

export async function ensureImagesRoot(): Promise<void> {
  await mkdir(IMAGES_ROOT, { recursive: true })
}

export async function scanDir(folderRel = ''): Promise<{ images: ImageEntry[]; subfolders: string[] }> {
  await ensureImagesRoot()
  const dir = folderRel ? ensureSafe(IMAGES_ROOT, folderRel) : IMAGES_ROOT
  if (!existsSync(dir)) return { images: [], subfolders: [] }

  const entries = await readdir(dir, { withFileTypes: true })
  const images: ImageEntry[] = []
  const subfolders: string[] = []

  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    if (e.isDirectory()) {
      subfolders.push(folderRel ? `${folderRel}/${e.name}` : e.name)
    } else if (isImageFile(e.name)) {
      const full = path.join(dir, e.name)
      const s = await stat(full)
      const relPath = folderRel ? `${folderRel}/${e.name}` : e.name
      images.push({
        id: relPath,
        name: path.parse(e.name).name,
        filename: e.name,
        folder: folderRel,
        url: toImageUrl(relPath),
        size: s.size,
        mtime: s.mtime.toISOString(),
      })
    }
  }

  return { images, subfolders }
}

export async function scanAll(): Promise<{ images: ImageEntry[]; folders: string[] }> {
  const allImages: ImageEntry[] = []
  const allFolders: string[] = []

  async function recurse(folder: string) {
    const { images, subfolders } = await scanDir(folder)
    allImages.push(...images)
    for (const sub of subfolders) {
      allFolders.push(sub)
      await recurse(sub)
    }
  }

  await recurse('')
  return { images: allImages, folders: allFolders }
}

export interface ImageEntry {
  id: string
  name: string
  filename: string
  folder: string
  url: string
  size: number
  mtime: string
}
