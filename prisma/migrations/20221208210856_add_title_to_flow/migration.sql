/*
  Warnings:

  - Added the required column `title` to the `flows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flows" ADD COLUMN     "title" TEXT NOT NULL;
