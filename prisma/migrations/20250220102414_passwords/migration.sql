/*
  Warnings:

  - Added the required column `site` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "site" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "seconde_password" TEXT,
    "site" TEXT NOT NULL,
    "initParams" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_slug_key" ON "Password"("slug");
