import { useState, useEffect } from 'react';
import { FiEdit, FiCheckSquare, FiXSquare} from 'react-icons/fi'

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { THead, TBody, Table } from './styles';


export function Notas(){
    const [fetchNotas, setfetchNotas] = useState([])
    const [changeNota, setChangeNota] = useState([])
    const [valueChange, setValueChange] = useState('FRIO')
    const [reFetchNotas, setReFethNotas] = useState(false)

  const keysHeadTable = ["NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO", "DATA_EMBARQUE", "PLACA", "OBSERVAÇÕES "]

  async function handleChangeInfomationOfNote(nf){ // funcao para pegar a nota e adita
    setChangeNota(nf)
    console.log(changeNota)

  } 
  async function changeInfoNote(nf){
    await api.put(`/notas/${nf.id}`, {
      tipo_produto: String(valueChange).toUpperCase()
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
                          <tr key={String(nota.id)} onDoubleClick={()=> handleChangeInfomationOfNote(nota)}>
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
                                  <>
                                    <select name="test" id="" onChange={(e)=> setValueChange(e.target.value)}>
                                      <option value="frio">FRIO</option>
                                      <option value="seco">SECO</option>
                                    </select>
                                    <div>
                                      <button onClick={()=> changeInfoNote(nota)}> <FiCheckSquare /> </button>
                                      <button onClick={() => handleChangeInfomationOfNote()}> <FiXSquare /> </button>
                                    </div>
                                  </>
                                  :
                                  <>
                                    {nota.tipo_produto}
                                    <button onClick={ () => handleChangeInfomationOfNote(nota)}> <FiEdit/> </button>
                                  </>
                                }
                              </td>
                              <td>{String(nota.data_saida).split('T')[0]}</td>
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