import { getSessionFromEvent, validateSession } from '../utils/admin-session'

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname

  if (!url.startsWith('/api/admin/')) return
  if (url.startsWith('/api/admin/auth/')) return

  const token = getSessionFromEvent(event)
  if (!token || !validateSession(token)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
