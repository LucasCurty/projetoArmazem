/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Motorista_cpf_cnpj_key" ON "Motorista"("cpf_cnpj");
