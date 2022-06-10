/*
  Warnings:

  - Added the required column `bannerUrl` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "bannerUrl" TEXT NOT NULL;
