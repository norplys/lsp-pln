/*
  Warnings:

  - You are about to drop the column `expired_at` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "expired_at";
