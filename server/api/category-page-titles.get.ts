import { getAppData } from '../utils/app-data-store'

export default defineEventHandler(() => {
  const appData = getAppData()
  return (appData?.['category-page-titles'] as Record<string, string> | undefined) ?? {}
})
