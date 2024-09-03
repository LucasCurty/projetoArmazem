-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notas" (
    "numero_nota" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "endereco_destinatario" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "valor_nota" TEXT NOT NULL,
    "tipo_produto" TEXT
);
INSERT INTO "new_notas" ("cidade", "client", "destinatario", "endereco_destinatario", "numero_nota", "peso", "tipo_produto", "valor_nota") SELECT "cidade", "client", "destinatario", "endereco_destinatario", "numero_nota", "peso", "tipo_produto", "valor_nota" FROM "notas";
DROP TABLE "notas";
ALTER TABLE "new_notas" RENAME TO "notas";
CREATE UNIQUE INDEX "notas_numero_nota_key" ON "notas"("numero_nota");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
