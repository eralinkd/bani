import { useRuntimeConfig } from '#imports'
import { getCachedData, isCacheFresh } from '../utils/dataCache'
import { fetchFromRedisAndUpdateCache } from '../utils/dataSync'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (!isCacheFresh(config.cache.memoryTtlMs)) {
    await fetchFromRedisAndUpdateCache()
  }

  const payload = getCachedData() ?? {}
  const seo =
    typeof payload === 'object' && payload
      ? (payload as Record<string, unknown>).seo ?? null
      : null

  return { seo }
})
