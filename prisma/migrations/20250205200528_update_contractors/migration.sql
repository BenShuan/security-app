-- AlterTable
ALTER TABLE "Contractor" ADD COLUMN     "managerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
