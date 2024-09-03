-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "notas" (
    "numero_nota" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "endereco_destinatario" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "valor_nota" REAL NOT NULL,
    "tipo_produto" TEXT
);

-- CreateTable
CREATE TABLE "fretes" (
    "id" TEXT NOT NULL,
    "frete" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_frete" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso" REAL NOT NULL,
    "frete_empresa" INTEGER NOT NULL,
    "frete_saida_motorista" INTEGER NOT NULL,
    "quantidade_entregas" INTEGER NOT NULL,
    "motorista" TEXT NOT NULL,
    "placa" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "notas_numero_nota_key" ON "notas"("numero_nota");

-- CreateIndex
CREATE UNIQUE INDEX "fretes_id_key" ON "fretes"("id");
