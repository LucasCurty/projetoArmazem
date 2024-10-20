import { useState, useEffect } from 'react';

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { THead, TBody, Table } from './styles';


export function Notas(){
    const [fetchNotas, setfetchNotas] = useState([])

    const [changeNota, setChangeNota] = useState()


  const keysHeadTable = ["NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO", "DATA_EMBARQUE", "PLACA", "OBSERVAÇÕES "]

  function handleChangeInfomationOfNote(nf){
    setChangeNota(nf)
    console.log(changeNota)
  }

  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notas`)
      setfetchNotas(response.data);
    }
    
      fetchNotes();
    },[])
    
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
                              <td>{nota.tipo_produto}</td>
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