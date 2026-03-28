export default defineNuxtRouteMiddleware(async () => {
  const requestFetch = useRequestFetch()
  try {
    await requestFetch('/api/admin/auth/me')
    return navigateTo('/admin')
  } catch {
    // Not authenticated — stay on login
  }
})
