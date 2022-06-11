-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
