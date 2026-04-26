import { prisma } from '../../utils/prisma'
import { refreshAppDataFromDb } from '../../utils/app-data-store'
import { normalizeProjectsSliderPayload } from '../../utils/projects-slider-data'

const KEY = 'projects-slider'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  const subtitle = typeof body?.subtitle === 'string' ? body.subtitle.trim() : ''
  const slidesIn = Array.isArray(body?.slides) ? body.slides : []

  const slides = slidesIn
    .map((item) => {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) return null
      const image = String(item.image ?? '').trim()
      const caption = String(item.caption ?? '').trim()
      if (!image) return null
      return { image, caption }
    })
    .filter((s) => s !== null)

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
