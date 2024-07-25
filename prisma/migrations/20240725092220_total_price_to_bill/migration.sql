/*
  Warnings:

  - You are about to drop the column `admin_fee` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "admin_fee",
DROP COLUMN "total";
