import { unlink } from 'node:fs/promises'
import { IMAGES_ROOT, ensureSafe } from '../../../utils/image-manager'

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const filePath = ensureSafe(IMAGES_ROOT, id)
  await unlink(filePath)

  return { ok: true }
})
