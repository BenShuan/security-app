/*
  Warnings:

  - The values [security,operations,logistics,packaging,production,management] on the enum `Department` will be removed. If these variants are still used in the database, this will fail.
  - The values [OW,Jerusalem,Yokneam] on the enum `Site` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Department_new" AS ENUM ('אבטחה', 'תפעול', 'לוגיסטיקה', 'אריזה', 'מטבח', 'ייצור');
ALTER TABLE "Employee" ALTER COLUMN "department" TYPE "Department_new" USING ("department"::text::"Department_new");
ALTER TYPE "Department" RENAME TO "Department_old";
ALTER TYPE "Department_new" RENAME TO "Department";
DROP TYPE "Department_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Site_new" AS ENUM ('אור_עקיבא', 'ירושלים', 'יוקנעם');
ALTER TABLE "Employee" ALTER COLUMN "site" TYPE "Site_new" USING ("site"::text::"Site_new");
ALTER TYPE "Site" RENAME TO "Site_old";
ALTER TYPE "Site_new" RENAME TO "Site";
DROP TYPE "Site_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_employeeId_fkey";

-- AlterTable
ALTER TABLE "Contractor" ALTER COLUMN "employeeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("idNumber") ON DELETE CASCADE ON UPDATE CASCADE;
