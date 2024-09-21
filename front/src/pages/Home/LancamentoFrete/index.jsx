
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
        async function getNotas() {
            const response = await api.get('/notas')
            setNotasFrete(response.data)
        }

        getNotas()
    },[])

    return(
        <>
        <Section title={"Lançamento de Frete"}>
            <Frete>
                <div className='info'>
                    <Labels>
                        <label>PLACA: </label>
                        <input type="text" placeholder='Pesquisar Placa' onChange={e => setFetchMotorista(e.target.value)}  />
                            {
                                moto.map((placa,index)=>(
                                    <div>
                                        <span key={String(index)}>{placa.placa} </span>
                                        <span key={String(index)}> {placa.name}</span>
                                    </div>
                                ))
                            }
                        {/* <select name="placa" onChange={e=>selectMotorista(e.target.value)}>
                            {motoristas.map(placa =>(
                                <option value={placa.placa}>{placa.placa}</option>
                            ))}
                        </select> */}
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
                            {notasFrete.map(nota =>(
                                <option value={nota.numero_nota}>{nota.numero_nota}</option>
                            ))}
                        </select>
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