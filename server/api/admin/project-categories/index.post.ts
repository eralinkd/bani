import { prisma } from '../../../utils/prisma'
import { refreshProjectsFromDb } from '../../../utils/projects-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })

  const sortOrder = Number(body?.sortOrder ?? 0)

  const category = await prisma.projectCategory.create({ data: { title, sortOrder } })
  await refreshProjectsFromDb()
  return category
})
