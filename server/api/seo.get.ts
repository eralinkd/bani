import { getSeo } from '../utils/seo-store'

export default defineEventHandler(() => {
  return getSeo() ?? { title: '', description: '' }
})
