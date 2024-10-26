import { NotasDTO } from "../notas/notas.dto";

export interface FreteDTO {
    id?: number;
    frete_empresa: number;
    frete_saida_motorista: number;
    motoristaId: number;
    km_inicial?: number;
    km_final?: number;
    
    peso_total?: number;
    quantidade_entregas?: number;
    
    notas: NotasDTO[];
}