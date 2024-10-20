export type NotasDTO = {
    id?: number;
    numero_nota: string;
    client: string;
    destinatario: string;
    endereco_destinatario: string;
    cidade: string;
    peso: string;
    valor_nota: string;
    tipo_produto?: string;
    data_saida?: Date;
    motoristaId?: number;
    observacoes?: string;
}