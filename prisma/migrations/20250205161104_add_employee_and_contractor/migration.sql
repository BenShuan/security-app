-- CreateEnum
CREATE TYPE "Department" AS ENUM ('security', 'operations', 'logistics', 'packaging', 'production', 'management');

-- CreateEnum
CREATE TYPE "Site" AS ENUM ('OW', 'Jerusalem', 'Yokneam');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "position" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "department" "Department" NOT NULL,
    "site" "Site" NOT NULL,
    "isManager" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "authExpiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_idNumber_key" ON "Employee"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_employeeId_key" ON "Contractor"("employeeId");

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
