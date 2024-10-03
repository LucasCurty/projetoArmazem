-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_nota" TEXT NOT NULL,
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
