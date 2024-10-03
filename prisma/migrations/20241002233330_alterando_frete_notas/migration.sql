/*
  Warnings:

  - You are about to drop the column `notas` on the `fretes` table. All the data in the column will be lost.
  - You are about to drop the column `frete_id` on the `notas` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "NotasinFretes" (
    "notaId" INTEGER NOT NULL,
    "freteId" INTEGER NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("notaId", "freteId"),
    CONSTRAINT "NotasinFretes_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "notas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotasinFretes_freteId_fkey" FOREIGN KEY ("freteId") REFERENCES "fretes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotasinFretes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fretes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_frete" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso_total" REAL NOT NULL,
    "frete_empresa" INTEGER NOT NULL,
    "frete_saida_motorista" INTEGER NOT NULL,
    "quantidade_entregas" INTEGER,
    "km_inicial" INTEGER,
    "km_final" INTEGER,
    "motoristaId" INTEGER,
    CONSTRAINT "fretes_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_fretes" ("data_frete", "frete_empresa", "frete_saida_motorista", "id", "km_final", "km_inicial", "motoristaId", "peso_total", "quantidade_entregas") SELECT "data_frete", "frete_empresa", "frete_saida_motorista", "id", "km_final", "km_inicial", "motoristaId", "peso_total", "quantidade_entregas" FROM "fretes";
DROP TABLE "fretes";
ALTER TABLE "new_fretes" RENAME TO "fretes";
CREATE TABLE "new_notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_nota" INTEGER NOT NULL,
    "data_entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "endereco_destinatario" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "valor_nota" TEXT NOT NULL,
    "tipo_produto" TEXT,
    "data_saida" DATETIME,
    "status_entrega" TEXT,
    "observacoes" TEXT,
    "motoristaId" INTEGER,
    CONSTRAINT "notas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_notas" ("cidade", "client", "data_entrada", "data_saida", "destinatario", "endereco_destinatario", "id", "motoristaId", "numero_nota", "observacoes", "peso", "status_entrega", "tipo_produto", "valor_nota") SELECT "cidade", "client", "data_entrada", "data_saida", "destinatario", "endereco_destinatario", "id", "motoristaId", "numero_nota", "observacoes", "peso", "status_entrega", "tipo_produto", "valor_nota" FROM "notas";
DROP TABLE "notas";
ALTER TABLE "new_notas" RENAME TO "notas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
