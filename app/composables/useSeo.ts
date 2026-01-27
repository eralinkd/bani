export const useSeo = () => {
  const { data, pending, error, refresh } = useFetch('/api/seo')

  const seo = computed(() => {
    const raw = data.value?.seo
    if (raw && typeof raw === 'object') return raw as { title?: string; description?: string }
    return { title: '', description: '' }
  })

  return { seo, pending, error, refresh }
}
