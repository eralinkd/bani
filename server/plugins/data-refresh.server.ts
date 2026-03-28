import { refreshSeoFromDb, startSeoRefresh } from '../utils/seo-store'
import { refreshAppDataFromDb, startAppDataRefresh } from '../utils/app-data-store'
import { refreshProjectsFromDb, startProjectsRefresh } from '../utils/projects-store'
import { refreshProductsFromDb, startProductsRefresh } from '../utils/products-store'

export default defineNitroPlugin(async () => {
  await Promise.all([
    refreshSeoFromDb(),
    refreshAppDataFromDb(),
    refreshProjectsFromDb(),
    refreshProductsFromDb(),
  ])

  const intervalMs = Number(process.env.MEMORY_TTL_MS || 30_000)

  startSeoRefresh(intervalMs)
  startAppDataRefresh(intervalMs)
  startProjectsRefresh(intervalMs)
  startProductsRefresh(intervalMs)
})
