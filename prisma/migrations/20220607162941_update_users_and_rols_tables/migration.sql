/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleId";

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
