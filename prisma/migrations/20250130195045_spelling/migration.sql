/*
  Warnings:

  - You are about to drop the column `prise` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `price` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Menu_canteenId_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "prise",
ADD COLUMN     "price" TEXT NOT NULL;
