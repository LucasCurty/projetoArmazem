
import { useState } from 'react';
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';

import {Tbody , Labels, Frete, TheadBody , DivTr} from './styles'

export function LancamentoFrete(){
    const [moto, setMoto] = useState("Informe a placa")
    const [nota, setNota] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')
    const [fretes, SetFretes] = useState([])

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


    const motoristas = [
        {   
            name:"Lucas",
            placa:'ABC-123'
        },
        {   
            name:"Tiago",
            placa:'DEF-456'
        },
        {   
            name:"Joao",
            placa:'GHI-789'
        },
    ]
    
    function selectMotorista(event){
        let encontrado = motoristas.find((element)=> event === element.placa)
        
        setMoto(encontrado)
    }

    function delNota(event){
        let removed = nota.filter(element => event !== element)
       setNota(removed)
    }

    function addFrete(){
        SetFretes( [...fretes, { 
            data: String(Date.now()),
            frete: (fretes.length + 1),
            pesoTotal: (nota.length * 10),
            freteEmpresa,
            freteSaidaMoto,
            quantidadeEntregas:nota.length,
            motorista:moto.name,
            placa:moto.placa,
            nota 

        }])

        setMoto('')
        setFreteSaidaMoto('')
    }

    const theadFretes = ["DATA","FRETE","PESO_TOTAL","FRETE_EMPRESA","FRETE_MOTORISTA","QUANTIDADE_ENTREGAS","MOTORISTA","PLACA", "NOTAS FISCAIS"]
    return(
        <>
        <Section title={"Lançamento de Frete"}>
            <Frete>
                <div className='info'>
                    <Labels>
                        <label>PLACA: </label>
                        <select name="placa" onChange={e=>selectMotorista(e.target.value)}>
                            {motoristas.map(placa =>(
                                <option value={placa.placa}>{placa.placa}</option>
                            ))}
                        </select>
                        <label>MOTORISTA </label>
                        <p className='nomeMoto'> {moto.name}</p>

                    </Labels>
                    <Labels>
                        <label>FRETE EMPRESA</label>
                        <input type="text" placeholder="Insira o valor" onChange={e => setFreteEmpresa(e.target.value)}/>
                        <label>FRETE MOTORISTA</label>
                        <input type="text" placeholder="Insira o valor" onChange={e => setFreteSaidaMoto(e.target.value)}/>
                    </Labels>
                    <Labels>
                        <label>NOTAS</label>
                        <select name="Notas" onChange={e => setNota([...nota, e.target.value])}>
                            <option value=""></option>                       
                            {notasSelected.map(nota =>(
                                <option value={nota.numero_nota}>{nota.numero_nota}</option>
                            ))}
                        </select>
                    </Labels>
                </div>

                <ul>
                    {nota.map((NF, key) => (
                            <li key={key}>{NF} - <button onClick={() => delNota(NF)}>del</button></li>
                ))}
                </ul>

            </Frete>
        </Section>
        <button onClick={addFrete}>Enviar Frete</button>
                
        <Section>
        <Tabela data={fretes} customKeys={theadFretes }/>      
        <Tbody>   
                <TheadBody>
                    {keysHeadTable.map(keyHeader=>(<th>{keyHeader}</th>))}
                </TheadBody>
            <tr>
            
                {notasSelected.map(notas =>(
                        <DivTr>
                            <td><strong>{notas.numero_nota}</strong></td>
                            <td>{notas.client}</td>
                            <td>{notas.destinatario}</td>
                            <td>{notas.endereco_destinatario}</td>
                            <td>{notas.cidade}</td>
                            <td>{notas.peso}</td>
                            <td>{notas.valor_nota}</td>
                            <td>{notas.tipo_produto}</td>
                        </DivTr>                          
                ))}
            </tr>
        </Tbody>                        
        </Section>
        </>
    );
}