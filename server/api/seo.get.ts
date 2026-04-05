import { getAllSeo } from '../utils/seo-store'

export default defineEventHandler(() => {
  return getAllSeo()
})
