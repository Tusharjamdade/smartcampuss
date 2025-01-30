/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `PrintJob` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `format` to the `PrintJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PrintJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "colour" TEXT NOT NULL DEFAULT 'black-white',
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PrintJob_userId_key" ON "PrintJob"("userId");

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
