
import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';

import {Tbody , Labels, Frete, TheadBody , DivTr} from './styles'

import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [moto, setMoto] = useState([])
    const [nota, setNota] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')
    const [frete, SetFrete] = useState({})
    const [motoristas, setMotoristas] = useState([])
    const [notasFrete, setNotasFrete] = useState([])



    const [fetchMotorista, setFetchMotorista] = useState([])
    const [fecthNotas, setFetchNotas] = useState([])

    function selectMotorista(event){
        let encontrado = motoristas.find((element)=> event === element.placa)
        
        setMoto(encontrado)
    }

    function delNota(event){
        let removed = nota.filter(element => event !== element)
       setNota(removed)
    }

    function addFrete(){
        SetFrete( { 
            data: String(Date.now()),
            frete: (frete.length + 1),
            pesoTotal: (nota.length * 10),
            freteEmpresa,
            freteSaidaMoto,
            quantidadeEntregas:nota.length,
            motorista: moto.name,
            placa: moto.placa,
            nota 

        })

        setMoto('')
        setFreteSaidaMoto('')
    }
    
    useEffect(()=>{
        async function searchNotas(){
            const response = await api.get(`/motorista/${fetchMotorista}`)
            setMoto(response.data)
        }
        searchNotas()
    },[fetchMotorista])

    useEffect(()=>{
        async function getNotas(e) {
            const response = await api.get(`/notas/${fecthNotas}`)
            setNota(response.data)
        }

        getNotas()
    },[fecthNotas])

    return(
        <>
        <Section title={"Lançamento de Frete"}>
            <Frete>
                <div className='info'>
                    <Labels>
                        <label>PLACA: </label>
                        <input type="text" name='placa' autocomplete="Placa" placeholder='Pesquisar Placa' onChange={e => setFetchMotorista(e.target.value)}  />
                           <ul>
                              {
                                 moto.map((placa,index) => (
                                    <li key={String(index)}>{placa.placa} </li>
                                    ))
                              }
                           </ul>
                    </Labels>
                    <Labels>
                        <label>FRETE EMPRESA</label>
                        <input type="text" placeholder="Insira o valor" onChange={e => setFreteEmpresa(e.target.value)}/>
                        <label>FRETE MOTORISTA</label>
                        <input type="text" placeholder="Insira o valor" onChange={e => setFreteSaidaMoto(e.target.value)}/>
                    </Labels>
                    <Labels>
                        <label>NOTAS</label>
                        <input type="text" name='nota' placeholder='Selecione as Notas' onChange={e => setFetchNotas(e.target.value)}  />
                           <ul>
                              {
                                //  nota.map((nota,index) => (
                                //     <li key={String(index)}>{nota} </li>
                                //     ))
                              }
                           </ul>
                    </Labels>
                </div>

                

            </Frete>
        </Section>
        <Section>
            
            <Labels>
                <label>MOTORISTA </label>
                <p className='nomeMoto'>{frete.motorista}</p>    
            </Labels>
            <ul>
                {nota.map((NF, key) => (
                        <li key={key}>{NF} - <button onClick={() => delNota(NF)}>del</button></li>
                ))}
            </ul>
        </Section>
        <button onClick={addFrete}>Enviar Frete</button>
                
        {/* <Section>
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
        </Section> */}
        </>
    );
}