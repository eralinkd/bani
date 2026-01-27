export type CachedPayload = Record<string, unknown>

type CacheState = {
  data: CachedPayload | null
  lastUpdated: number
}

const cacheState: CacheState = {
  data: null,
  lastUpdated: 0,
}

export const getCachedData = () => cacheState.data

export const setCachedData = (data: CachedPayload) => {
  cacheState.data = data
  cacheState.lastUpdated = Date.now()
}

export const isCacheFresh = (ttlMs: number) => {
  if (!cacheState.data) return false
  return Date.now() - cacheState.lastUpdated < ttlMs
}

export const getCacheAgeMs = () =>
  cacheState.data ? Date.now() - cacheState.lastUpdated : Number.POSITIVE_INFINITY
