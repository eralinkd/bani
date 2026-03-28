import { getProjectById } from '../../utils/projects-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'id is required' })

  const project = getProjectById(id)
  if (!project) throw createError({ statusCode: 404, message: 'Project not found' })

  return project
})
