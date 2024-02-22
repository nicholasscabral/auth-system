/*
  Warnings:

  - You are about to alter the column `expiresAt` on the `refresh_tokens` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[userId]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `refresh_tokens` MODIFY `expiresAt` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `refresh_tokens_userId_key` ON `refresh_tokens`(`userId`);
