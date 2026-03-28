import { prisma } from '../../../utils/prisma'
import { refreshProjectsFromDb } from '../../../utils/projects-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  await prisma.projectCategory.delete({ where: { id } })
  await refreshProjectsFromDb()
  return { ok: true }
})
