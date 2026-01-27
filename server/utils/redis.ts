import Redis from 'ioredis'
import { useRuntimeConfig } from '#imports'

const globalForRedis = globalThis as { redis?: Redis }

export const getRedis = () => {
  if (globalForRedis.redis) return globalForRedis.redis

  const config = useRuntimeConfig()
  const { host, port, password, db } = config.redis

  globalForRedis.redis = new Redis({
    host,
    port,
    password: password || undefined,
    db,
  })

  return globalForRedis.redis
}
