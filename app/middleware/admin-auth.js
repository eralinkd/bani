export default defineNuxtRouteMiddleware(async () => {
  const requestFetch = useRequestFetch()
  try {
    await requestFetch('/api/admin/auth/me')
  } catch {
    return navigateTo('/admin/login')
  }
})
