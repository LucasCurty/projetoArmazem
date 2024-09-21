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
    "frete_id" INTEGER,
    CONSTRAINT "notas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "notas_frete_id_fkey" FOREIGN KEY ("frete_id") REFERENCES "fretes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "tipo_veiculo" TEXT,
    "gerenciamento_risco" TEXT
);

-- CreateTable
CREATE TABLE "fretes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_frete" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso_total" REAL NOT NULL,
    "frete_empresa" INTEGER NOT NULL,
    "frete_saida_motorista" INTEGER NOT NULL,
    "quantidade_entregas" INTEGER,
    "km_inicial" INTEGER,
    "km_final" INTEGER,
    "motoristaId" INTEGER,
    "notas" TEXT NOT NULL,
    CONSTRAINT "fretes_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
