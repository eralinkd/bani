/**
 * Migration script: moves image URLs from junction tables
 * (ProjectImage -> Media, ProductImage -> Media) into the new
 * JSON `images` field on Project and Product.
 *
 * Run BEFORE applying the schema migration that drops the old tables.
 * Usage: node prisma/migrate-images.js
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Migrating project images...')
  const projects = await prisma.project.findMany({
    include: { images: { include: { media: true }, orderBy: { sortOrder: 'asc' } } },
  })

  for (const project of projects) {
    const urls = project.images.map((pi) => pi.media.url)
    if (urls.length > 0) {
      await prisma.project.update({
        where: { id: project.id },
        data: { images: urls },
      })
      console.log(`  Project "${project.title}": ${urls.length} image(s) migrated`)
    }
  }

  console.log('Migrating product images...')
  const products = await prisma.product.findMany({
    include: { images: { include: { media: true }, orderBy: { sortOrder: 'asc' } } },
  })

  for (const product of products) {
    const urls = product.images.map((pi) => pi.media.url)
    if (urls.length > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: urls },
      })
      console.log(`  Product "${product.title}": ${urls.length} image(s) migrated`)
    }
  }

  console.log('Done.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
