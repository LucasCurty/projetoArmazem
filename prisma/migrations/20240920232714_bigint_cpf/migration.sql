/*
  Warnings:

  - You are about to alter the column `cpf_cnpj` on the `Motorista` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_cnpj" BIGINT NOT NULL,
    "placa" TEXT NOT NULL,
    "tipo_veiculo" TEXT,
    "gerenciamento_risco" TEXT
);
INSERT INTO "new_Motorista" ("cpf_cnpj", "gerenciamento_risco", "id", "name", "placa", "tipo_veiculo") SELECT "cpf_cnpj", "gerenciamento_risco", "id", "name", "placa", "tipo_veiculo" FROM "Motorista";
DROP TABLE "Motorista";
ALTER TABLE "new_Motorista" RENAME TO "Motorista";
CREATE UNIQUE INDEX "Motorista_cpf_cnpj_key" ON "Motorista"("cpf_cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;