/*
  Warnings:

  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priority";
