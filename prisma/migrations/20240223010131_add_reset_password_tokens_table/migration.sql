-- AlterTable
ALTER TABLE `refresh_tokens` MODIFY `expiresAt` DATETIME(0) NOT NULL;

-- CreateTable
CREATE TABLE `reset_password_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `expiresAt` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `reset_password_tokens_id_key`(`id`),
    UNIQUE INDEX `reset_password_tokens_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reset_password_tokens` ADD CONSTRAINT `reset_password_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
