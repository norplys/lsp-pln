/*
  Warnings:

  - Added the required column `account_name` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_number` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "account_name" TEXT NOT NULL,
ADD COLUMN     "account_number" TEXT NOT NULL;
