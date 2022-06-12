/*
  Warnings:

  - Added the required column `ipAdress` to the `views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "views" ADD COLUMN     "ipAdress" TEXT NOT NULL;
