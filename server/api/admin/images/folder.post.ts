import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { IMAGES_ROOT, sanitizeName, ensureSafe } from '../../../utils/image-manager'

export default defineEventHandler(async (event) => {
  const { name, parent = '' } = await readBody(event)
  if (!name) throw createError({ statusCode: 400, message: 'name is required' })

  const safeName = sanitizeName(name)
  if (!safeName) throw createError({ statusCode: 400, message: 'Invalid folder name' })

  const folderPath = parent
    ? ensureSafe(IMAGES_ROOT, parent, safeName)
    : ensureSafe(IMAGES_ROOT, safeName)

  await mkdir(folderPath, { recursive: true })
  await writeFile(path.join(folderPath, '.gitkeep'), '')

  const relPath = parent ? `${parent}/${safeName}` : safeName
  return { ok: true, folder: relPath }
})
