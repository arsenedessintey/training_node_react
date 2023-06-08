-- CreateTable
CREATE TABLE `Contrainte` (
    `contrainte_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `type_contrainte` VARCHAR(191) NOT NULL,
    `valeur_regex` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Contrainte_nom_key`(`nom`),
    PRIMARY KEY (`contrainte_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
