-- CreateTable
CREATE TABLE `AccountType` (
    `accountTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountTypeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`accountTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `accountTypeId` INTEGER NOT NULL,
    `Salt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `AccountType`(`accountTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
