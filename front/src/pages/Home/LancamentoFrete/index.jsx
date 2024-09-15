
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';

import {Tbody} from './styles'

export function LancamentoFrete(){
    const keysHeadTable = ["NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO"]

    const notasSelected = [
        {
            "numero_nota": "5588",
            "client": "TIROL",
            "destinatario": "HUMBERTO",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },{
            "numero_nota": "5588",
            "client": "TIROL",
            "destinatario": "HUMBERTO",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },{
            "numero_nota": "5588",
            "client": "TIROL",
            "destinatario": "HUMBERTO",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },{
            "numero_nota": "5588",
            "client": "TIROL",
            "destinatario": "HUMBERTO",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },{
            "numero_nota": "5588",
            "client": "TIROL",
            "destinatario": "HUMBERTO",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },
        {
            "numero_nota": "7788",
            "client": "AUROA",
            "destinatario": "RUA DA RUA",
            "endereco_destinatario": "roberto conceição 215",
            "cidade": "CAMBE",
            "peso": "1.75",
            "valor_nota": "25.9",
            "tipo_produto": "FRIO"
        },
        {
            "numero_nota": "570051",
            "client": "LACTOBOM",
            "destinatario": "S R C RODRIGUES & CIA LTDA",
            "endereco_destinatario": "AVENIDA PINHO ARAUCARIA",
            "cidade": "APUCARANA",
            "peso": "151.404",
            "valor_nota": "592.89",
            "tipo_produto": "null"
        },
        {
            "numero_nota": "570053",
            "client": "LACTOBOM",
            "destinatario": "GROU COMERCIO DE ALIMENTOS LTDA",
            "endereco_destinatario": "RUA PONTA GROSSA",
            "cidade": "APUCARANA",
            "peso": "21.816",
            "valor_nota": "339.72",
            "tipo_produto": "null"
        }
    ]

    const fretes = [
        {
            data: datanow.toLocaleString(),
            frete: '1',
            pesoTotal: '200',
            freteEmpresa: '3500',
            freteSaidaMoto:'2500',
            quantidadeEntregas:'8',
            motorista:"Lucas",
            placa:'ABC-123',            
        },
        
    ]
    const theadFretes = ["DATA","FRETE","PESO_TOTAL","FRETE_EMPRESA","FRETE_MOTORISTA","QUANTIDADE_ENTREGAS","MOTORISTA","PLACA"]
    return(
        <Section title={"Lançamento de Frete"}>
                <Tabela data={fretes} customKeys={theadFretes}/>
                <Tbody>   
                    <div>
                        {keysHeadTable.map(keyHeader=>(<th>{keyHeader}</th>))}
                    </div>
                    {
                    notasSelected.map(notas =>(
                                <tr>
                                    <td>{notas.numero_nota}</td>
                                    <td>{notas.client}</td>
                                    <td>{notas.destinatario}</td>
                                    <td>{notas.endereco_destinatario}</td>
                                    <td>{notas.cidade}</td>
                                    <td>{notas.peso}</td>
                                    <td>{notas.valor_nota}</td>
                                    <td>{notas.tipo_produto}</td>
                                </tr>                          
                    ))
                    }
                </Tbody>                        
        </Section>
    );
}