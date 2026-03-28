-- Migration: replace junction image tables with JSON arrays on Project and Product

-- 1. Add new images column to Project
ALTER TABLE "Project" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]';

-- 2. Add new images column to Product
ALTER TABLE "Product" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]';

-- 3. Migrate project images from junction table
UPDATE "Project" p
SET "images" = COALESCE(
  (
    SELECT json_agg(m."url" ORDER BY pi."sortOrder")
    FROM "ProjectImage" pi
    JOIN "Media" m ON m."id" = pi."mediaId"
    WHERE pi."projectId" = p."id"
  ),
  '[]'::json
);

-- 4. Migrate product images from junction table
UPDATE "Product" p
SET "images" = COALESCE(
  (
    SELECT json_agg(m."url" ORDER BY pi."sortOrder")
    FROM "ProductImage" pi
    JOIN "Media" m ON m."id" = pi."mediaId"
    WHERE pi."productId" = p."id"
  ),
  '[]'::json
);

-- 5. Drop junction tables (order matters due to foreign keys)
DROP TABLE "ProjectImage";
DROP TABLE "ProductImage";
DROP TABLE "Media";
