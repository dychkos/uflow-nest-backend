-- AlterTable
ALTER TABLE "flows" ADD COLUMN     "chosen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "chosenFlow" TEXT;
