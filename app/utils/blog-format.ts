/** Родительный падеж для даты на карточке */
const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export function formatBlogCardDate(iso: string | Date): { day: string; monthYear: string } {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  if (Number.isNaN(d.getTime())) return { day: '—', monthYear: '' }
  const day = String(d.getDate())
  const monthYear = `${MONTHS_GENITIVE[d.getMonth()] ?? ''} ${d.getFullYear()}`.trim()
  return { day, monthYear }
}

export function formatBlogDetailDate(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
