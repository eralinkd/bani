export function emptyBlogDoc(): Record<string, unknown> {
  return {
    type: 'doc',
    content: [{ type: 'paragraph' }],
  }
}

export function isDocContent(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && (v as { type?: string }).type === 'doc'
}
