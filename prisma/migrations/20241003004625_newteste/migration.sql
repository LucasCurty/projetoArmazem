/*
  Warnings:

  - You are about to drop the `NotasinFretes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NotasinFretes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_FreteToNota" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FreteToNota_A_fkey" FOREIGN KEY ("A") REFERENCES "fretes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FreteToNota_B_fkey" FOREIGN KEY ("B") REFERENCES "notas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FreteToNota_AB_unique" ON "_FreteToNota"("A", "B");

-- CreateIndex
CREATE INDEX "_FreteToNota_B_index" ON "_FreteToNota"("B");
