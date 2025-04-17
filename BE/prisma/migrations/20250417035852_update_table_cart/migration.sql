/*
  Warnings:

  - You are about to drop the column `productId` on the `billdetail` table. All the data in the column will be lost.
  - Added the required column `id` to the `BillDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `billdetail` DROP FOREIGN KEY `BillDetail_productId_fkey`;

-- DropIndex
DROP INDEX `BillDetail_productId_fkey` ON `billdetail`;

-- AlterTable
ALTER TABLE `billdetail` DROP COLUMN `productId`,
    ADD COLUMN `id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillDetail` ADD CONSTRAINT `BillDetail_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
