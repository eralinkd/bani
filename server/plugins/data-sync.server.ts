import { useRuntimeConfig } from '#imports'
import { fetchFromRedisAndUpdateCache, syncDbToRedis } from '../utils/dataSync'

type SyncState = {
  started: boolean
}

const globalForSync = globalThis as { __dataSync?: SyncState }

export default defineNitroPlugin(async () => {
  if (globalForSync.__dataSync?.started) return
  globalForSync.__dataSync = { started: true }

  const config = useRuntimeConfig()

  await fetchFromRedisAndUpdateCache()

  setInterval(() => {
    void fetchFromRedisAndUpdateCache()
  }, config.cache.redisPullMs)

  setInterval(() => {
    void syncDbToRedis()
  }, config.cache.dbPushMs)
})
