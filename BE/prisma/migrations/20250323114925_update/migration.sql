/*
  Warnings:

  - You are about to drop the column `numberPhone` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `numberPhone`,
    ADD COLUMN `nickName` VARCHAR(191) NULL;
