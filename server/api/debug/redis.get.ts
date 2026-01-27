import { useRuntimeConfig } from '#imports'
import { getRedis } from '../../utils/redis'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const redis = getRedis()
  const redisKey = config.cache.redisKey

  const raw = await redis.get(redisKey)
  let parsed: unknown = null

  if (raw) {
    try {
      parsed = JSON.parse(raw)
    } catch {
      parsed = null
    }
  }

  return {
    key: redisKey,
    raw,
    parsed,
  }
})
