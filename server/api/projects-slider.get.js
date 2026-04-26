import { getAppData } from '../utils/app-data-store'
import { normalizeProjectsSliderPayload } from '../utils/projects-slider-data'

export default defineEventHandler(() => {
  const raw = getAppData()?.['projects-slider']
  return normalizeProjectsSliderPayload(raw)
})
