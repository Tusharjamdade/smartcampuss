/*
  Warnings:

  - You are about to drop the column `seat` on the `TableBookings` table. All the data in the column will be lost.
  - You are about to drop the column `tableName` on the `TableBookings` table. All the data in the column will be lost.
  - Added the required column `selectedSeats` to the `TableBookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TableBookings" DROP COLUMN "seat",
DROP COLUMN "tableName",
ADD COLUMN     "selectedSeats" TEXT NOT NULL;
