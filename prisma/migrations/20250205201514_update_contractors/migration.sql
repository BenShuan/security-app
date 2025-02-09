/*
  Warnings:

  - You are about to drop the column `managerId` on the `Contractor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_managerId_fkey";

-- AlterTable
ALTER TABLE "Contractor" DROP COLUMN "managerId";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "managerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
