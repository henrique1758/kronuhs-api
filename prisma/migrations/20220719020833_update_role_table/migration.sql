/*
  Warnings:

  - You are about to drop the column `userId` on the `roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_userId_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_DashboardUserToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DashboardUserToRole_AB_unique" ON "_DashboardUserToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_DashboardUserToRole_B_index" ON "_DashboardUserToRole"("B");

-- AddForeignKey
ALTER TABLE "_DashboardUserToRole" ADD CONSTRAINT "_DashboardUserToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "dashboard_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DashboardUserToRole" ADD CONSTRAINT "_DashboardUserToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
