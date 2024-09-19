-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_nota" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "endereco_destinatario" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "valor_nota" TEXT NOT NULL,
    "tipo_produto" TEXT,
    "frete_id" INTEGER,
    CONSTRAINT "notas_frete_id_fkey" FOREIGN KEY ("frete_id") REFERENCES "fretes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_notas" ("cidade", "client", "destinatario", "endereco_destinatario", "frete_id", "id", "numero_nota", "peso", "tipo_produto", "valor_nota") SELECT "cidade", "client", "destinatario", "endereco_destinatario", "frete_id", "id", "numero_nota", "peso", "tipo_produto", "valor_nota" FROM "notas";
DROP TABLE "notas";
ALTER TABLE "new_notas" RENAME TO "notas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
