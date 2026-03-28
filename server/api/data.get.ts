import { getAppData } from '../utils/app-data-store'
import { getSeo } from '../utils/seo-store'
import { getProjectCategories, getProjects } from '../utils/projects-store'
import { getProductCategories, getProducts } from '../utils/products-store'

export default defineEventHandler(() => {
  return {
    seo: getSeo() ?? { title: '', description: '' },
    appData: getAppData() ?? {},
    projectCategories: getProjectCategories(),
    projects: getProjects(),
    productCategories: getProductCategories(),
    products: getProducts(),
  }
})
