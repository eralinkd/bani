/*
  Warnings:

  - You are about to drop the column `slug` on the `ProjectCategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectCategory_slug_key";

-- AlterTable
ALTER TABLE "ProjectCategory" DROP COLUMN "slug";
