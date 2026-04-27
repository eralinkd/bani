import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'
import { normalizeProjectsSliderPayload } from '../../utils/projects-slider-data'

const KEY = 'projects-slider'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  const subtitle = typeof body?.subtitle === 'string' ? body.subtitle.trim() : ''
  const slidesIn = Array.isArray(body?.slides) ? body.slides : []

  const parsed = slidesIn
    .map((item) => {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) return null
      const image = String(item.image ?? '').trim()
      const caption = String(item.caption ?? '').trim()
      const projectId = String(item.projectId ?? '').trim()
      if (!image) return null
      return { image, caption, projectId }
    })
    .filter((s) => s !== null)

  const idCandidates = [...new Set(parsed.map((s) => s.projectId).filter(Boolean))]
  const existingProjects =
    idCandidates.length > 0
      ? await prisma.project.findMany({
          where: { id: { in: idCandidates } },
          select: { id: true },
        })
      : []
  const allowedProjectIds = new Set(existingProjects.map((p) => p.id))

  const slides = parsed.map((s) => ({
    ...s,
    projectId: s.projectId && allowedProjectIds.has(s.projectId) ? s.projectId : '',
  }))

  const payload = normalizeProjectsSliderPayload({
    title: title || undefined,
    subtitle,
    slides: slides.length ? slides : undefined,
  })

  await prisma.appData.upsert({
    where: { key: KEY },
    update: { payload },
    create: { key: KEY, payload },
  })

  await refreshAppDataFromDb()
  return payload
})
