-- CreateTable
CREATE TABLE "Repeat" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Repeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "repeatId" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repeat_value_key" ON "Repeat"("value");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_repeatId_fkey" FOREIGN KEY ("repeatId") REFERENCES "Repeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
