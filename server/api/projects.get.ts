import { useRuntimeConfig } from '#imports'
import { getCachedData, isCacheFresh } from '../utils/dataCache'
import { fetchFromRedisAndUpdateCache } from '../utils/dataSync'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (!isCacheFresh(config.cache.memoryTtlMs)) {
    await fetchFromRedisAndUpdateCache()
  }

  const payload = getCachedData() ?? {}
  const projectCategories =
    typeof payload === 'object' && payload
      ? (payload as Record<string, unknown>).projectCategories ?? []
      : []
  const projects =
    typeof payload === 'object' && payload
      ? (payload as Record<string, unknown>).projects ?? []
      : []

  return { projectCategories, projects }
})
