import { scanAll } from '../../../utils/image-manager'

export default defineEventHandler(async () => {
  const { images, folders } = await scanAll()
  return { images, folders }
})
