#!/usr/bin/env node
/**
 * Симлинк .output/public/uploads -> public/uploads
 * IPX (Nuxt Image) читает файлы с диска из .output/public/, поэтому uploads должны быть там.
 */
import { rm, symlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outputUploads = path.join(root, '.output', 'public', 'uploads')
const sourceUploads = path.join(root, 'public', 'uploads')

async function main() {
  try {
    await rm(outputUploads, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
  await symlink(sourceUploads, outputUploads)
  console.log('[postbuild] .output/public/uploads -> public/uploads')
}

main().catch((err) => {
  console.error('[postbuild]', err.message)
  process.exit(1)
})
