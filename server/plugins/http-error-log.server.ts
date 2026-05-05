import type { HTTPEvent } from 'h3'

/** Запросы, для которых уже залогировали через hook `error` (чтобы не дублировать с `response`). */
const loggedFromErrorHook = new WeakMap<HTTPEvent, true>()

type H3LikeError = Error & {
  statusCode?: number
  statusMessage?: string
  data?: unknown
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, ctx) => {
    const event = ctx.event
    if (!event || typeof event.path !== 'string') return
    if (!shouldLogApiPath(event.path)) return

    try {
      const err = error as H3LikeError
      const statusCode =
        typeof err.statusCode === 'number' && !Number.isNaN(err.statusCode) ? err.statusCode : 500

      if (statusCode < 400) return

      loggedFromErrorHook.set(event, true)

      const tags = 'tags' in ctx && Array.isArray((ctx as { tags?: unknown }).tags)
        ? (ctx as { tags: string[] }).tags
        : undefined

      console.warn(
        lineLog('api-http-error', {
          statusCode,
          statusMessage: err.statusMessage,
          message: err.message,
          data: err.data,
          method: event.method,
          path: event.path,
          tags,
        }),
      )
    } catch (logErr) {
      console.error('[http-error-log] failed to log error hook', logErr)
    }
  })

  nitroApp.hooks.hook('response', (response, event) => {
    try {
      if (response.status < 400) return
      if (typeof event.path !== 'string' || !shouldLogApiPath(event.path)) return
      if (loggedFromErrorHook.has(event)) return

      console.warn(
        lineLog('api-response-error', {
          status: response.status,
          method: event.method,
          path: event.path,
          note: 'no error-hook payload — check middleware or manual response body',
        }),
      )
    } catch (logErr) {
      console.error('[http-error-log] failed to log response hook', logErr)
    }
  })
})

/** Только API, без шума от прокси ресурсов. */
function shouldLogApiPath(path: string): boolean {
  return path.startsWith('/api/')
}

function lineLog(tag: string, payload: Record<string, unknown>): string {
  try {
    return `[${tag}] ${JSON.stringify(payload)}`
  } catch {
    return `[${tag}] (payload not serializable)`
  }
}
