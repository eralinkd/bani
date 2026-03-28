const sessions = new Map<string, { createdAt: number }>()

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function createSession(): string {
  const token = crypto.randomUUID()
  sessions.set(token, { createdAt: Date.now() })
  return token
}

export function validateSession(token: string): boolean {
  if (!token) return false
  return sessions.has(token)
}

export function destroySession(token: string): void {
  sessions.delete(token)
}

export function getSessionFromEvent(event: any): string | null {
  const cookieHeader = event.node?.req?.headers?.cookie
  if (!cookieHeader) return null
  const match = String(cookieHeader).match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  return match ? match[1].trim() : null
}

export function setSessionCookie(event: any, token: string): void {
  setResponseHeader(
    event,
    'set-cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
  )
}

export function clearSessionCookie(event: any): void {
  setResponseHeader(event, 'set-cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`)
}
