/*
  Warnings:

  - Added the required column `actionType` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "actionType" TEXT NOT NULL;
