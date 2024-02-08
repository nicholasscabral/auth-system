-- CreateTable
CREATE TABLE `TB_USERS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `email_verified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `TB_USERS_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
