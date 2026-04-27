const DEFAULT_SLIDE = {
  image: '/images/ProjectsSlider/1.png',
  caption: 'Баня бочка в Пензе',
  projectId: '',
}

export const DEFAULT_PROJECTS_SLIDER = {
  title: 'Уже построили',
  subtitle:
    'Оцените наше мастерство и вдохновитесь примерами реальных работ, выполненных для наших клиентов.',
  slides: Array.from({ length: 5 }, () => ({ ...DEFAULT_SLIDE })),
}

function isPlainObject(x) {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

export function normalizeProjectsSliderPayload(raw) {
  const base = DEFAULT_PROJECTS_SLIDER
  if (!isPlainObject(raw)) {
    return {
      title: base.title,
      subtitle: base.subtitle,
      slides: base.slides.map((s) => ({ ...s })),
    }
  }

  const title = typeof raw.title === 'string' && raw.title.trim() ? raw.title.trim() : base.title
  const subtitle = typeof raw.subtitle === 'string' ? raw.subtitle.trim() : base.subtitle

  let slides = []
  if (Array.isArray(raw.slides)) {
    for (const item of raw.slides) {
      if (!isPlainObject(item)) continue
      const image = String(item.image ?? '').trim()
      const caption = String(item.caption ?? '').trim()
      const projectId = String(item.projectId ?? '').trim()
      if (!image) continue
      slides.push({ image, caption, projectId })
    }
  }

  if (!slides.length) {
    slides = base.slides.map((s) => ({ ...s }))
  }

  return { title, subtitle, slides }
}
