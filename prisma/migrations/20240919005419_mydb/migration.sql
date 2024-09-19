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
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_nota" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "endereco_destinatario" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "valor_nota" TEXT NOT NULL,
    "tipo_produto" TEXT
);

-- CreateTable
CREATE TABLE "fretes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_frete" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso" REAL NOT NULL,
    "frete_empresa" INTEGER NOT NULL,
    "frete_saida_motorista" INTEGER NOT NULL,
    "quantidade_entregas" INTEGER NOT NULL,
    "motorista" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "notas" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
