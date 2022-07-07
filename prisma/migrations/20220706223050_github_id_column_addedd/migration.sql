/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `blog_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "blog_users" ADD COLUMN     "githubId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "blog_users_githubId_key" ON "blog_users"("githubId");
