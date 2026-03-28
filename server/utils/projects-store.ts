import { prisma } from './prisma'

const CACHE_KEY = 'projects'

interface ProjectCategory {
  id: string
  title: string
  sortOrder: number
}

interface Project {
  id: string
  title: string
  description: string
  textBlock1: string | null
  textBlock2: string | null
  videoUrl: string | null
  categoryId: string
  sortOrder: number
  images: string[]
}

let projectCategories: ProjectCategory[] = []
let projects: Project[] = []

function log(success: boolean, message?: string) {
  const ts = new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  console.log(`[${ts}] DB REFRESH [${CACHE_KEY}] ${status}${msg}`)
}

function parseImages(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[]
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return [] }
  }
  return []
}

export function getProjectCategories() {
  return projectCategories
}

export function getProjects() {
  return projects
}

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id) ?? null
}

export async function refreshProjectsFromDb() {
  try {
    const cats = await prisma.projectCategory.findMany({ orderBy: { sortOrder: 'asc' } })
    const projs = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } })

    projectCategories = cats.map((c) => ({ id: c.id, title: c.title, sortOrder: c.sortOrder }))
    projects = projs.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      textBlock1: p.textBlock1,
      textBlock2: p.textBlock2,
      videoUrl: p.videoUrl,
      categoryId: p.categoryId,
      sortOrder: p.sortOrder,
      images: parseImages(p.images),
    }))
    log(true)
  } catch (err: any) {
    log(false, err?.message ?? String(err))
  }
}

export function startProjectsRefresh(intervalMs: number) {
  setInterval(refreshProjectsFromDb, intervalMs)
}
