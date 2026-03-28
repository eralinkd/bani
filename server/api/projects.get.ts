import { getProjectCategories, getProjects } from '../utils/projects-store'

export default defineEventHandler(() => {
  return {
    projectCategories: getProjectCategories(),
    projects: getProjects(),
  }
})
