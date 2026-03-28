import { prisma } from './prisma'

const CACHE_KEY = 'products'

interface ProductCategory {
  id: string
  title: string
  slug: string
  sortOrder: number
}

interface ProductSize {
  id: string
  label: string
  value: string
  price: number
  code: string
  sortOrder: number
}

interface Product {
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
  category: { id: string; title: string; slug: string } | null
  sortOrder: number
  sizes: ProductSize[]
  images: string[]
}

let productCategories: ProductCategory[] = []
let products: Product[] = []

function log(success: boolean, message?: string) {
  const ts = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  console.log(`[${ts}] DB REFRESH [${CACHE_KEY}] ${status}${msg}`)
}

function parseImages(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[]
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return [] }
  }
  return []
}

export function getProductCategories() {
  return productCategories
}

export function getProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null
}

export async function refreshProductsFromDb() {
  try {
    const cats = await prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } })
    const prods = await prisma.product.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { sizes: { orderBy: { sortOrder: 'asc' } } },
    })

    productCategories = cats.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      sortOrder: c.sortOrder,
    }))

    const catMap = new Map(productCategories.map((c) => [c.id, c]))

    products = prods.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      materials: p.materials,
      stove: p.stove,
      interiorHtml: p.interiorHtml,
      characteristicsHtml: p.characteristicsHtml,
      kitHtml: p.kitHtml,
      isPopular: p.isPopular,
      categoryId: p.categoryId,
      category: catMap.get(p.categoryId) ?? null,
      sortOrder: p.sortOrder,
      sizes: p.sizes.map((s) => ({
        id: s.id,
        label: s.label,
        value: s.value,
        price: s.price,
        code: s.code,
        sortOrder: s.sortOrder,
      })),
      images: parseImages(p.images),
    }))
    log(true)
  } catch (err: any) {
    log(false, err?.message ?? String(err))
  }
}

export function startProductsRefresh(intervalMs: number) {
  setInterval(refreshProductsFromDb, intervalMs)
}
