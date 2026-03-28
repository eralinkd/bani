import { rename } from 'node:fs/promises'
import path from 'node:path'
import { IMAGES_ROOT, sanitizeName, ensureSafe, toImageUrl } from '../../../utils/image-manager'

export default defineEventHandler(async (event) => {
  const { id, newName } = await readBody(event)
  if (!id || !newName) throw createError({ statusCode: 400, message: 'id and newName are required' })

  const ext = path.extname(id)
  const folder = path.dirname(id).replace(/\\/g, '/') === '.' ? '' : path.dirname(id).replace(/\\/g, '/')
  const safeName = sanitizeName(newName)
  if (!safeName) throw createError({ statusCode: 400, message: 'Invalid name' })

  const newFilename = safeName + ext
  const newId = folder ? `${folder}/${newFilename}` : newFilename

  const oldPath = ensureSafe(IMAGES_ROOT, id)
  const newPath = ensureSafe(IMAGES_ROOT, newId)

  await rename(oldPath, newPath)

  return { ok: true, id: newId, url: toImageUrl(newId) }
})
