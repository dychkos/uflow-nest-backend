/*
  Warnings:

  - The primary key for the `DaysOnTasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedAt` on the `DaysOnTasks` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `DaysOnTasks` table. All the data in the column will be lost.
  - The primary key for the `flows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "DaysOnTasks" DROP CONSTRAINT "DaysOnTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "flows" DROP CONSTRAINT "flows_userId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_flowId_fkey";

-- AlterTable
ALTER TABLE "DaysOnTasks" DROP CONSTRAINT "DaysOnTasks_pkey",
DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy",
ALTER COLUMN "taskId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DaysOnTasks_pkey" PRIMARY KEY ("taskId", "dayId");

-- AlterTable
ALTER TABLE "flows" DROP CONSTRAINT "flows_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "flows_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "flows_id_seq";

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "flowId" SET DATA TYPE TEXT,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tasks_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "flows" ADD CONSTRAINT "flows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaysOnTasks" ADD CONSTRAINT "DaysOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
