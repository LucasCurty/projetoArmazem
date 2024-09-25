
import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';

import {Tbody , Labels, Frete, InsertValues} from './styles'

import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [moto, setMoto] = useState([])
    const [motorista, setMotorista] = useState({})
    const [notasFrete, setNotasFrete] = useState([])
    const [nota, setNota] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')
    const [frete, SetFrete] = useState({})



    const [fetchMotorista, setFetchMotorista] = useState(null)
    const [fecthNotas, setFetchNotas] = useState([])

    function selectMotorista(event){
        setMotorista(event)
        setFetchMotorista(null)

        event.target.value = '' 
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
            motorista: motorista.name,
            placa: moto.placa,
            nota 

        })

        setMoto('')
        setFreteSaidaMoto('')
    }
    
    useEffect(()=>{
        async function searchMotorista(){
            const response = await api.get(`/motorista/${fetchMotorista}`)
            setMoto(response.data)
        }
        searchMotorista()
    },[fetchMotorista])

    // useEffect(()=>{
    //     async function getNotas() {

    //         const response = await api.get(`/notas/${fecthNotas}`)
    //         setNota(response.data)
    //     }

    //     getNotas()
    // },[fecthNotas])
    console.log(freteEmpresa)
    return(
        <>
        <Section title={"Lançamento de Frete"}>
            <Frete>
                <InsertValues className='info'>
                    <div>
                        <label>PLACA: </label>
                        <input type="text" name='placa' autocomplete="Placa" placeholder='Pesquisar Placa' onChange={e => setFetchMotorista(e.target.value)}  />
                            <ul>
                                { fetchMotorista &&
                                    moto.map((motorista,index) => (
                                        <li key={String(index)} onClick={()=> selectMotorista(motorista)}>{motorista.placa} </li>
                                        ))
                                }
                                
                            </ul>
                    </div>
                    <div>
                        <label>FRETE EMPRESA</label>
                        <input type="text" placeholder="Insira o valor" on onChange={e => setFreteEmpresa(e.target.value)}/>
                        
                        <label>FRETE MOTORISTA</label>
                        <input type="text" placeholder="Insira o valor" onChange={e => setFreteSaidaMoto(e.target.value)}/>
                    </div>
                    <div>
                        <label>NOTAS</label>
                        <input type="text" name='nota' placeholder='Selecione as Notas' onChange={e => setFetchNotas(e.target.value)}  />
                        <ul>
                            {nota.map((NF, key) => (
                                    <li key={key}>{NF} - <button onClick={() => delNota(NF)}>del</button></li>
                            ))}
                         </ul>
                    </div>
                </InsertValues>

                

            </Frete>
        </Section>
        <Section title="Informações do frete">
            <Labels>
                <label>MOTORISTA </label>
                <p className='nomeMoto'>{motorista.name}</p>    
                <label>PLACA </label>
                <p className='nomeMoto'>{motorista.placa}</p>    
                <label>TIPO DE VEICULO </label>
                <p className='nomeMoto'>{motorista.tipo_veiculo}</p>    
            </Labels>
            
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