import { createSession, setSessionCookie } from '../../../utils/admin-session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = body?.username ?? ''
  const password = body?.password ?? ''

  const config = useRuntimeConfig()
  const expectedUser = config.adminUsername
  const expectedPass = config.adminPassword

  if (username !== expectedUser || password !== expectedPass) {
    throw createError({ statusCode: 401, message: 'Неверный логин или пароль' })
  }

  const token = createSession()
  setSessionCookie(event, token)

  return { ok: true }
})
