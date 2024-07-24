/*
  Warnings:

  - You are about to drop the column `status` on the `Bill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `RateVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kwh_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expired_at` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `variant_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_variant_id_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "variant_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RateVariant_name_key" ON "RateVariant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_kwh_number_key" ON "User"("kwh_number");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "RateVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
