/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."users_username_key";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "avatar",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "metadata",
DROP COLUMN "username",
DROP COLUMN "version",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'User';
