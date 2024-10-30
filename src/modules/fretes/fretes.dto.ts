import { motoristaDTO } from "../motoristas/motorista.dto";
import { NotasDTO } from "../notas/notas.dto";

export class FreteDTO {
    data_frete?: string;
    peso_total: number | string;  // pode aceitar tanto número quanto string
    frete_empresa: number | string;
    frete_saida_motorista: number | string;
    quantidade_entregas: number | string;
    km_inicial?: number | string;
    km_final?: number | string;
    motorista: motoristaDTO;
    notas: NotasDTO[];
}
