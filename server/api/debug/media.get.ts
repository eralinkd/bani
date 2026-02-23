import { promises as fs } from 'node:fs'
import path from 'node:path'

const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')

export default defineEventHandler(async () => {
  const cwd = process.cwd()
  let exists = false
  let writable = false
  let error: string | null = null
  let entries: string[] = []

  try {
    await fs.access(uploadsDir)
    exists = true
  } catch (e) {
    error = e instanceof Error ? e.message : String(e)
  }

  if (exists) {
    try {
      const testFile = path.join(uploadsDir, '.write-test-' + Date.now())
      await fs.writeFile(testFile, '')
      await fs.unlink(testFile)
      writable = true
    } catch (e) {
      error = e instanceof Error ? e.message : String(e)
    }

    try {
      entries = await fs.readdir(uploadsDir)
    } catch (e) {
      error = (error ? error + '; ' : '') + (e instanceof Error ? e.message : String(e))
    }
  }

  return {
    cwd,
    uploadsDir,
    exists,
    writable,
    entries,
    error,
  }
})
