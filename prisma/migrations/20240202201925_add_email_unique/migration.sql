/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `TB_USERS` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TB_USERS_email_key` ON `TB_USERS`(`email`);
