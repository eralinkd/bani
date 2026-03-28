import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { IMAGES_ROOT, sanitizeName, ensureSafe, isImageFile } from '../../../utils/image-manager'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form) throw createError({ statusCode: 400, message: 'No form data' })

  const file = form.find((f) => f.name === 'file')
  const folder = form.find((f) => f.name === 'folder')?.data.toString().trim() ?? ''
  const customName = form.find((f) => f.name === 'name')?.data.toString().trim() ?? ''

  if (!file?.data?.length) throw createError({ statusCode: 400, message: 'No file provided' })

  const ext = path.extname(file.filename || '').toLowerCase()
  if (!isImageFile(file.filename || '')) {
    throw createError({ statusCode: 400, message: 'Unsupported file type' })
  }

  const baseName = sanitizeName(customName || path.parse(file.filename || 'image').name)
  const filename = baseName + ext

  const targetDir = folder ? ensureSafe(IMAGES_ROOT, folder) : IMAGES_ROOT
  await mkdir(targetDir, { recursive: true })

  const filePath = path.join(targetDir, filename)
  await writeFile(filePath, file.data)

  const relPath = folder ? `${folder}/${filename}` : filename
  return { ok: true, id: relPath, url: `/images/${relPath}` }
})
