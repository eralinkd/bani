import { getAppData } from '../utils/app-data-store'

export default defineEventHandler(() => {
  const appData = getAppData()
  const reviews = Array.isArray(appData?.reviews) ? appData.reviews : []
  const links = (appData?.['review-links'] as Record<string, string> | undefined) ?? {}
  return {
    reviews,
    links: {
      gis2: String(links.gis2 ?? ''),
      google: String(links.google ?? ''),
      yandex: String(links.yandex ?? ''),
    },
  }
})
