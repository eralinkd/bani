import { getSessionFromEvent, validateSession } from '../../../utils/admin-session'

export default defineEventHandler((event) => {
  const token = getSessionFromEvent(event)
  if (!token || !validateSession(token)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return { ok: true }
})
