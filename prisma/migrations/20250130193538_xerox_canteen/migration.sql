/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_userId_fkey";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "XeroxStore" (
    "id" SERIAL NOT NULL,
    "storeName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "XeroxStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CanteenStore" (
    "id" SERIAL NOT NULL,
    "storeName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CanteenStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "prise" TEXT NOT NULL,
    "canteenId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "XeroxStore_userId_key" ON "XeroxStore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CanteenStore_userId_key" ON "CanteenStore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_canteenId_key" ON "Menu"("canteenId");

-- AddForeignKey
ALTER TABLE "XeroxStore" ADD CONSTRAINT "XeroxStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CanteenStore" ADD CONSTRAINT "CanteenStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_canteenId_fkey" FOREIGN KEY ("canteenId") REFERENCES "CanteenStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
