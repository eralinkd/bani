import { prisma } from '../../utils/prisma'
import { normalizeProjectsSliderPayload } from '../../utils/projects-slider-data'

export default defineEventHandler(async () => {
  const row = await prisma.appData.findUnique({ where: { key: 'projects-slider' } })
  return normalizeProjectsSliderPayload(row?.payload ?? null)
})
