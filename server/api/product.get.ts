import { getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'
import { getCachedData, isCacheFresh } from '../utils/dataCache'
import { fetchFromRedisAndUpdateCache } from '../utils/dataSync'

const toArray = (value: unknown) => (Array.isArray(value) ? value : [])

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!isCacheFresh(config.cache.memoryTtlMs)) {
    await fetchFromRedisAndUpdateCache()
  }

  const payload = getCachedData() ?? {}
  const products = toArray((payload as Record<string, unknown>).products)
  const query = getQuery(event)

  const id = typeof query.id === 'string' ? query.id : ''
  const categoryId = typeof query.categoryId === 'string' ? query.categoryId : ''

  let product = null
  if (id) {
    product = products.find((item) => item?.id === id) ?? null
  } else if (categoryId) {
    product = products.find((item) => item?.categoryId === categoryId) ?? null
  } else {
    product = products[0] ?? null
  }

  return { product }
})
