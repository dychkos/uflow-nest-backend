-- DropForeignKey
ALTER TABLE "DaysOnTasks" DROP CONSTRAINT "DaysOnTasks_dayId_fkey";

-- DropForeignKey
ALTER TABLE "DaysOnTasks" DROP CONSTRAINT "DaysOnTasks_taskId_fkey";

-- AddForeignKey
ALTER TABLE "DaysOnTasks" ADD CONSTRAINT "DaysOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaysOnTasks" ADD CONSTRAINT "DaysOnTasks_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
