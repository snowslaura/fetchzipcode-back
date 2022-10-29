/*
  Warnings:

  - Added the required column `ok` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusText` to the `Cep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cep" ADD COLUMN     "ok" BOOLEAN NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL,
ADD COLUMN     "statusText" TEXT NOT NULL;
