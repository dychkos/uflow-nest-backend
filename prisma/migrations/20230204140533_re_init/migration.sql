/*
  Warnings:

  - You are about to drop the column `repeatId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `repeats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_repeatId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_userId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "repeatId",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "repeats";

-- CreateTable
CREATE TABLE "days" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaysOnTasks" (
    "taskId" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "DaysOnTasks_pkey" PRIMARY KEY ("taskId","dayId")
);

-- AddForeignKey
ALTER TABLE "DaysOnTasks" ADD CONSTRAINT "DaysOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaysOnTasks" ADD CONSTRAINT "DaysOnTasks_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
