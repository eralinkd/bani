import { getProductCategories, getProducts } from '../utils/products-store'

export default defineEventHandler(() => {
  return {
    productCategories: getProductCategories(),
    products: getProducts(),
  }
})
