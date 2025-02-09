-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
