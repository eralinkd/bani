import { prisma } from '../../../utils/prisma'
import { refreshProjectsFromDb } from '../../../utils/projects-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, message: 'title is required' })

  const sortOrder = Number(body?.sortOrder ?? 0)

  const category = await prisma.projectCategory.update({ where: { id }, data: { title, sortOrder } })
  await refreshProjectsFromDb()
  return category
})
