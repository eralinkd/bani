import { useRuntimeConfig } from '#imports'
import { getCachedData, isCacheFresh } from '../utils/dataCache'
import { fetchFromRedisAndUpdateCache } from '../utils/dataSync'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (!isCacheFresh(config.cache.memoryTtlMs)) {
    await fetchFromRedisAndUpdateCache()
  }

  return {
    data: getCachedData() ?? {},
  }
})
