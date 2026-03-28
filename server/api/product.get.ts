import { getProductById, getProductBySlug, getProducts } from '../utils/products-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { id, productSlug, categorySlug } = query

  if (id) {
    const product = getProductById(String(id))
    if (!product) throw createError({ statusCode: 404, message: 'Product not found' })
    return product
  }

  if (productSlug) {
    const product = getProductBySlug(String(productSlug))
    if (!product) throw createError({ statusCode: 404, message: 'Product not found' })
    return product
  }

  if (categorySlug) {
    const all = getProducts()
    const product = all.find((p) => p.category?.slug === String(categorySlug))
    if (!product) throw createError({ statusCode: 404, message: 'Product not found' })
    return product
  }

  const all = getProducts()
  if (!all.length) throw createError({ statusCode: 404, message: 'No products' })
  return all[0]
})
