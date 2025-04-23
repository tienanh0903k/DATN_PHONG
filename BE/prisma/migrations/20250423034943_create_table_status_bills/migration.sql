/*
  Warnings:

  - You are about to drop the column `status` on the `bill` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `status`,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `StatusBill` (
    `statusId` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`statusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `StatusBill`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;
