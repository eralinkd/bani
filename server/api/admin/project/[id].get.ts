import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) throw createError({ statusCode: 404, message: 'Project not found' })

  return project
})
