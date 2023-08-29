/*
  Warnings:

  - You are about to drop the column `cradits` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "course" DROP COLUMN "cradits",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;
