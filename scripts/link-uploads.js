#!/usr/bin/env node
/**
 * Симлинки для динамических директорий с изображениями.
 * IPX (Nuxt Image) читает файлы с диска из .output/public/, поэтому
 * директории, в которые загружаются файлы после сборки, должны быть там
 * в виде симлинков на source-директории.
 */
import { rm, symlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const links = [
  ['public/uploads', '.output/public/uploads'],
  ['public/images', '.output/public/images'],
]

async function main() {
  for (const [src, dest] of links) {
    const source = path.join(root, src)
    const output = path.join(root, dest)
    try {
      await rm(output, { recursive: true, force: true })
    } catch {
      /* ignore */
    }
    await symlink(source, output)
    console.log(`[postbuild] ${dest} -> ${src}`)
  }
}

main().catch((err) => {
  console.error('[postbuild]', err.message)
  process.exit(1)
})
