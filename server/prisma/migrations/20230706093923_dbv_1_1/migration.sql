/*
  Warnings:

  - You are about to drop the `regex` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Contrainte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contrainte` ADD COLUMN `activation` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `regex`;

-- CreateTable
CREATE TABLE `Sheet` (
    `sheet_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `nomVersion` VARCHAR(191) NOT NULL,
    `activationSheet` BOOLEAN NOT NULL,
    `parentSheetId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dossier_id` INTEGER NULL,

    UNIQUE INDEX `Sheet_nom_nomVersion_key`(`nom`, `nomVersion`),
    PRIMARY KEY (`sheet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `field_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `ordre` INTEGER NOT NULL,
    `obligatoire` BOOLEAN NOT NULL,
    `explication` VARCHAR(191) NOT NULL,
    `groupe_id` INTEGER NULL,
    `constraintId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`field_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groupe` (
    `groupe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `ordre` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sheet_id` INTEGER NULL,

    PRIMARY KEY (`groupe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dossier` (
    `dossier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `activationdoss` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`dossier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sheet` ADD CONSTRAINT `Sheet_parentSheetId_fkey` FOREIGN KEY (`parentSheetId`) REFERENCES `Sheet`(`sheet_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sheet` ADD CONSTRAINT `Sheet_dossier_id_fkey` FOREIGN KEY (`dossier_id`) REFERENCES `dossier`(`dossier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_groupe_id_fkey` FOREIGN KEY (`groupe_id`) REFERENCES `Groupe`(`groupe_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_constraintId_fkey` FOREIGN KEY (`constraintId`) REFERENCES `Contrainte`(`contrainte_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Groupe` ADD CONSTRAINT `Groupe_sheet_id_fkey` FOREIGN KEY (`sheet_id`) REFERENCES `Sheet`(`sheet_id`) ON DELETE SET NULL ON UPDATE CASCADE;
