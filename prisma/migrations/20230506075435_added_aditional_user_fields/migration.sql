-- AlterTable
ALTER TABLE "users" ADD COLUMN     "doneTasks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "earnedCoins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "globalCoins" INTEGER NOT NULL DEFAULT 0;
