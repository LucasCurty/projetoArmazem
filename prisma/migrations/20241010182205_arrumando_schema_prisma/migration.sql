/*
  Warnings:

  - You are about to drop the `_FreteToNota` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FreteToNota";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "NotasFretes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "NotasFretes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_NotaToNotasFretes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NotaToNotasFretes_A_fkey" FOREIGN KEY ("A") REFERENCES "notas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NotaToNotasFretes_B_fkey" FOREIGN KEY ("B") REFERENCES "NotasFretes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FreteToNotasFretes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FreteToNotasFretes_A_fkey" FOREIGN KEY ("A") REFERENCES "fretes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FreteToNotasFretes_B_fkey" FOREIGN KEY ("B") REFERENCES "NotasFretes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_NotaToNotasFretes_AB_unique" ON "_NotaToNotasFretes"("A", "B");

-- CreateIndex
CREATE INDEX "_NotaToNotasFretes_B_index" ON "_NotaToNotasFretes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FreteToNotasFretes_AB_unique" ON "_FreteToNotasFretes"("A", "B");

-- CreateIndex
CREATE INDEX "_FreteToNotasFretes_B_index" ON "_FreteToNotasFretes"("B");
