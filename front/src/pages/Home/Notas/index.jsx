import { useState, useEffect } from 'react';
import { FiEdit, FiCheckSquare, FiXSquare} from 'react-icons/fi'

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { THead, TBody, Table} from './styles';


export function Notas(){
  // state de consumir api notas
    const [fetchNotas, setfetchNotas] = useState([])
    const [reFetchNotas, setReFethNotas] = useState(false)

    // teste
    const [isTrue, setIsTrue] = useState(false)

    //state de tipo de produto
    const [changeNota, setChangeNota] = useState([])
    const [valueChange, setValueChange] = useState('FRIO')

    //state de data embarque - 
    const [dataEmbarque, setDataEmbarque] = useState()

  const keysHeadTable = ["","NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO", "DATA_EMBARQUE", "PLACA", "OBSERVAÇÕES "]

  async function handleChangeInfomationOfNote(nf){ // funcao para pegar a nota e adita
    setChangeNota(nf)
    setIsTrue(!isTrue)
    console.log(changeNota)

  } 
  async function changeInfoNote(nf){  
    await api.put(`/notas/${nf.id}`, {
      tipo_produto: String(valueChange).toUpperCase(),
      data_saida: new Date(dataEmbarque),
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    .finally(console.log(`O stats ${valueChange} foi adicionado a nota ${nf.numero_nota}`))
    setReFethNotas(!reFetchNotas)
  }

  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notas`)
      setfetchNotas(response.data);
    }
    
      fetchNotes();
    },[reFetchNotas])
    
    return(
        <Section title="Minhas Notas">
            <Table>
              <THead>
                  <tr>
                  {
                    keysHeadTable.map((head, index) => (
                      <td key={String(index)}>{head}</td> 
                    ))
                  }
                  </tr>
              </THead>
              <TBody>

                  {fetchNotas && 
                    fetchNotas.map(nota => ( 
                      <tr key={String(nota.id)}>
                        <td className='buttns'>
                        { changeNota !== nota ? 
                          <button onClick={ () => handleChangeInfomationOfNote(nota)}><FiEdit/></button>
                          :
                          <div>
                            <button className='enviar' onClick={()=> changeInfoNote(nota)}><FiCheckSquare /></button>
                            <button className='cancel' onClick={() => handleChangeInfomationOfNote()}><FiXSquare /></button>
                          </div>
                        }
                        </td>
                          <td>{nota.numero_nota}</td>
                          <td>{nota.client}</td>
                          <td>{nota.destinatario}</td>
                          <td>{nota.endereco_destinatario}</td>
                          <td>{nota.cidade}</td>
                          <td>{nota.peso}</td>
                          <td>{nota.valor_nota}</td>
                          <td>
                          {
                            changeNota == nota ?
                            <div>
                              <select name="test" id="" onChange={(e)=> setValueChange(e.target.value)}>
                                <option value="frio">FRIO</option>
                                <option value="seco">SECO</option>
                              </select>
                            </div>
                            :
                            <div>
                              {!nota.tipo_produto ? " - " : nota.tipo_produto }
                            </div>
                            }
                          </td>
                          <td>
                            {
                              changeNota == nota ?
                              <input type="date" onChange={e => setDataEmbarque(e.target.value)} />
                              :
                                nota.data_saida ?
                                `
                                  ${String(nota.data_saida).split('T')[0].split('-')[2]}-${String(nota.data_saida).split('T')[0].split('-')[1]}-${String(nota.data_saida).split('T')[0].split('-')[0]}  
                                ` 
                                :
                                '-'

                                
                              
                            }
                          </td>
                          <td>{nota.motorista?.placa}</td>
                          <td>{nota.obeservacoes}</td>
                      </tr>
                  ))
                  }
              </TBody>
            </Table>
          </Section>
    );
}