/*
  Warnings:

  - You are about to drop the column `nome` on the `Motorista` table. All the data in the column will be lost.
  - Added the required column `name` to the `Motorista` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_cnpj" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "tipo_veiculo" TEXT,
    "gerenciamento_risco" TEXT
);
INSERT INTO "new_Motorista" ("cpf_cnpj", "gerenciamento_risco", "id", "placa", "tipo_veiculo") SELECT "cpf_cnpj", "gerenciamento_risco", "id", "placa", "tipo_veiculo" FROM "Motorista";
DROP TABLE "Motorista";
ALTER TABLE "new_Motorista" RENAME TO "Motorista";
CREATE UNIQUE INDEX "Motorista_cpf_cnpj_key" ON "Motorista"("cpf_cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
