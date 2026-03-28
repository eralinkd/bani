import { getSessionFromEvent, destroySession, clearSessionCookie } from '../../../utils/admin-session'

export default defineEventHandler((event) => {
  const token = getSessionFromEvent(event)
  if (token) destroySession(token)
  clearSessionCookie(event)
  return { ok: true }
})
