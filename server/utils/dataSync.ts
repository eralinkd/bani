import { useRuntimeConfig } from '#imports'
import { prisma } from './prisma'
import { getRedis } from './redis'
import { setCachedData, type CachedPayload } from './dataCache'

const mapRowsToPayload = (rows: Array<{ key: string; payload: unknown }>) => {
  return rows.reduce<Record<string, unknown>>((acc, row) => {
    acc[row.key] = row.payload
    return acc
  }, {})
}

const buildPayload = (input: {
  rows: Array<{ key: string; payload: unknown }>
  seo: { title: string; description: string } | null
  categories: Array<{ id: string; title: string }>
  projects: Array<{
    id: string
    title: string
    description: string
    categoryId: string
    images: Array<{ url: string }>
  }>
  productCategories: Array<{ id: string; title: string; slug: string }>
  products: Array<{
    id: string
    title: string
    slug: string
    description: string
    materials: string | null
    stove: string | null
    interiorHtml: string | null
    characteristicsHtml: string | null
    kitHtml: string | null
    isPopular: boolean
    categoryId: string
    category: { slug: string } | null
    sizes: Array<{ label: string; value: string; price: number; code: string }>
    images: Array<{ url: string }>
  }>
}) => {
  const payload = mapRowsToPayload(input.rows)

  if (input.seo) {
    payload.seo = { title: input.seo.title, description: input.seo.description }
  }

  payload.projectCategories = input.categories
  payload.projects = input.projects
  payload.productCategories = input.productCategories
  payload.products = input.products

  return payload
}

const normalizeImages = (items: Array<{ media?: { url?: string } }>) =>
  items
    .map((item) => item.media?.url)
    .filter(Boolean)
    .map((url) => ({ url }))

export const fetchFromRedisAndUpdateCache = async () => {
  const config = useRuntimeConfig()
  const redis = getRedis()
  const redisKey = config.cache.redisKey

  try {
    const raw = await redis.get(redisKey)
    if (raw) {
      console.info('[dataSync] Redis hit:', redisKey, `bytes=${raw.length}`)
      const parsed = JSON.parse(raw) as CachedPayload
      setCachedData(parsed)
      return parsed
    }
    console.info('[dataSync] Redis miss:', redisKey)
  } catch (error) {
    console.error('[dataSync] Redis fetch failed:', error)
  }

  try {
    const [rows, seo, categories, projects, productCategories, products] = await Promise.all([
      prisma.appData.findMany({ select: { key: true, payload: true } }),
      prisma.seo.findUnique({ where: { key: 'main' }, select: { title: true, description: true } }),
      prisma.projectCategory.findMany({
        select: { id: true, title: true },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.project.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          textBlock1: true,
          textBlock2: true,
          videoUrl: true,
          categoryId: true,
          images: { select: { media: { select: { url: true } } }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.productCategory.findMany({
        select: { id: true, title: true, slug: true },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.product.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          materials: true,
          stove: true,
          interiorHtml: true,
          characteristicsHtml: true,
          kitHtml: true,
          isPopular: true,
          categoryId: true,
          category: { select: { slug: true } },
          sizes: {
            select: { label: true, value: true, price: true, code: true },
            orderBy: { sortOrder: 'asc' },
          },
          images: { select: { media: { select: { url: true } } }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      }),
    ])

    if (
      !rows.length &&
      !seo &&
      !categories.length &&
      !projects.length &&
      !productCategories.length &&
      !products.length
    )
      return null

    const payload = buildPayload({
      rows,
      seo,
      categories,
      projects: projects.map((project) => ({
        ...project,
        images: normalizeImages(project.images),
      })),
      productCategories,
      products: products.map((product) => ({
        ...product,
        images: normalizeImages(product.images),
      })),
    })
    const serialized = JSON.stringify(payload)
    await redis.set(redisKey, serialized)
    console.info('[dataSync] Redis set from DB fallback:', redisKey, `bytes=${serialized.length}`)
    setCachedData(payload)
    return payload
  } catch (error) {
    console.error('[dataSync] DB fallback failed:', error)
    return null
  }
}

export const syncDbToRedis = async () => {
  const config = useRuntimeConfig()
  const redis = getRedis()

  const [rows, seo, categories, projects, productCategories, products] = await Promise.all([
    prisma.appData.findMany({ select: { key: true, payload: true } }),
    prisma.seo.findUnique({ where: { key: 'main' }, select: { title: true, description: true } }),
    prisma.projectCategory.findMany({
      select: { id: true, title: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        textBlock1: true,
        textBlock2: true,
        videoUrl: true,
        categoryId: true,
        images: { select: { media: { select: { url: true } } }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.productCategory.findMany({
      select: { id: true, title: true, slug: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        materials: true,
        stove: true,
          interiorHtml: true,
          characteristicsHtml: true,
          kitHtml: true,
        isPopular: true,
        categoryId: true,
        category: { select: { slug: true } },
        sizes: {
          select: { label: true, value: true, price: true, code: true },
          orderBy: { sortOrder: 'asc' },
        },
        images: { select: { media: { select: { url: true } } }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    }),
  ])

  const payload = buildPayload({
    rows,
    seo,
    categories,
    projects: projects.map((project) => ({
      ...project,
      images: normalizeImages(project.images),
    })),
    productCategories,
    products: products.map((product) => ({
      ...product,
      images: normalizeImages(product.images),
    })),
  })
  const serialized = JSON.stringify(payload)
  await redis.set(config.cache.redisKey, serialized)
  console.info('[dataSync] Redis set from DB sync:', config.cache.redisKey, `bytes=${serialized.length}`)
  setCachedData(payload)
}
