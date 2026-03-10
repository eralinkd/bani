import { getRouterParam } from 'h3'
import { useRuntimeConfig } from '#imports'
import { getCachedData, isCacheFresh } from '../../utils/dataCache'
import { fetchFromRedisAndUpdateCache } from '../../utils/dataSync'

const toArray = (value: unknown) => (Array.isArray(value) ? value : [])

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!isCacheFresh(config.cache.memoryTtlMs)) {
    await fetchFromRedisAndUpdateCache()
  }

  const payload = getCachedData() ?? {}
  const projects = toArray((payload as Record<string, unknown>).projects)
  const id = getRouterParam(event, 'id') ?? ''

  const project = projects.find((item: { id?: string }) => item?.id === id) ?? null

  return { project }
})
