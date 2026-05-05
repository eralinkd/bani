/** Нормализация URL из медиатеки: слэши, ведущий `/` для относительных путей */
export function normalizeUploadedImageUrl(src: string | null | undefined): string {
  if (src == null || src === '') return ''
  const t = String(src).trim().replace(/\\/g, '/')
  if (!t) return ''
  if (/^https?:\/\//i.test(t)) return t
  return t.startsWith('/') ? t : `/${t}`
}
