/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'manager';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "keyNumber" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyLog" (
    "id" TEXT NOT NULL,
    "keyNumber" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "keyOut" TIMESTAMP(3) NOT NULL,
    "guardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retrievedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areas" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideContacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "rideCompanyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideLog" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "rideCompanyName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "guardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_keyNumber_key" ON "Key"("keyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "KeyLog_keyNumber_employeeId_keyOut_key" ON "KeyLog"("keyNumber", "employeeId", "keyOut");

-- CreateIndex
CREATE UNIQUE INDEX "RideCompany_name_key" ON "RideCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RideContacts_phoneNumber_key" ON "RideContacts"("phoneNumber");

-- AddForeignKey
ALTER TABLE "KeyLog" ADD CONSTRAINT "KeyLog_keyNumber_fkey" FOREIGN KEY ("keyNumber") REFERENCES "Key"("keyNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyLog" ADD CONSTRAINT "KeyLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyLog" ADD CONSTRAINT "KeyLog_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("employeeId") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideContacts" ADD CONSTRAINT "RideContacts_rideCompanyName_fkey" FOREIGN KEY ("rideCompanyName") REFERENCES "RideCompany"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideLog" ADD CONSTRAINT "RideLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideLog" ADD CONSTRAINT "RideLog_rideCompanyName_fkey" FOREIGN KEY ("rideCompanyName") REFERENCES "RideCompany"("name") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideLog" ADD CONSTRAINT "RideLog_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
