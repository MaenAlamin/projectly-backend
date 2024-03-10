/*
  Warnings:

  - Added the required column `FinishedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "FinishedAt" TIMESTAMP(3) NOT NULL;
