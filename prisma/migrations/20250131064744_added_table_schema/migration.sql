-- CreateTable
CREATE TABLE "TableBookings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "seat" TEXT NOT NULL,

    CONSTRAINT "TableBookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TableBookings_userId_key" ON "TableBookings"("userId");

-- AddForeignKey
ALTER TABLE "TableBookings" ADD CONSTRAINT "TableBookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
