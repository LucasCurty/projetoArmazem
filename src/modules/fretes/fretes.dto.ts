import { NotasDTO } from "../notas/notas.dto";

export interface FreteDTO {
    placa: string;    
    peso_total: number;
    frete_empresa: number;
    frete_saida_motorista: number;
    quantidade_entregas: number;
    motorista?: string;
    
    notas: NotasDTO;
}