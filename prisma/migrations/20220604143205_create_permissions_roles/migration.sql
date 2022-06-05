-- CreateTable
CREATE TABLE "permissions_roles" (
    "id" TEXT NOT NULL,
    "permissionId" TEXT,
    "roleId" TEXT,

    CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
