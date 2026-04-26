import { getAppData } from '../utils/app-data-store'
import { getProjectCategories, getProjects } from '../utils/projects-store'

export default defineEventHandler(() => {
  const appData = getAppData()
  const raw = appData?.['project-gallery']
  const projectGallery =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}

  return {
    projectCategories: getProjectCategories(),
    projects: getProjects(),
    projectGallery,
  }
})
