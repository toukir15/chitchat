/*
  Warnings:

  - Added the required column `roomImage` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `roomImage` VARCHAR(191) NOT NULL;
