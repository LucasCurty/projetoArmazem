import { useState, useEffect } from 'react';

import {api} from '../../../services/api'

import { Section } from '../../../Components/Section';
import {Table} from './styles'
import { FiEdit, FiCheckSquare, FiXSquare} from 'react-icons/fi'

export function Gerenciamento(){
  const [fetchFretes, setFetchFretes] = useState([])
  const [editingFrete, setEditingFrete] = useState([])
  const [hasSaveFrete, setHasSaveFrete] = useState(false)

  // status dos fretes
  const [freteEmpresa, setFreteEmpresa] = useState()
  const [freteSaidaMotorista, setFreteSaidaMotorista] = useState()
  const [kmInicial, setKmInicial] = useState(0)
  const [kmFinal, setKmFinal] = useState(0)


  const THead = ["","N° FRETE", "DATA", "FRETE EMPRESA", "FRETE SAIDA MOTO", "PESO", "QUA. ENTREGAS", "KM INICIAL", "KM FINAL", "KM EXTRA" ]
   
  function handleEditFrete(frete){
    setEditingFrete(frete)
    setFreteEmpresa(frete.frete_empresa)
    setFreteSaidaMotorista(frete.frete_saida_motorista)
    setKmInicial(frete.km_inicial)
    setKmFinal(frete.km_final)
  }

  async function handleSendFreteEdited(frete) {
    await api.put(`fretes/${frete.id}`, 
      {
        frete_empresa: freteEmpresa,
        frete_saida_motorista: freteSaidaMotorista,
        km_inicial: kmInicial,
        km_final: kmFinal,
      }
    )
    .then(res => console.log(res))
    .catch(error => console.log(error))

    setEditingFrete([])
    setFreteEmpresa(0)
    setFreteSaidaMotorista(0)
    setKmInicial(0)
    setKmFinal(0)
    setHasSaveFrete(!hasSaveFrete)
  }

  

  useEffect(()=>{
      async function fetchFretes(){
        const response = await api.get(`/fretes`)
        setFetchFretes(response.data);
      }
  
        fetchFretes()
      },[hasSaveFrete])

    return(
        <Section title="Gerenciamento">
          
          <Table>
            <thead>
              <tr>
              {THead.map(head => <th key={String(head[0])}>{head}</th>)}
              </tr>
            </thead>
            <tbody>
            {
              fetchFretes &&
                fetchFretes.map(frete =>(
                  <tr key={String(frete.id)}>
                    <td className='buttns'>
                        { editingFrete !== frete ?
                          <button onClick={ () => handleEditFrete(frete)}><FiEdit/></button>
                          :
                          <div>
                            <button className='enviar' onClick={ () => handleSendFreteEdited(frete)}><FiCheckSquare /></button>
                            <button className='cancel' onClick={() => handleEditFrete([])}><FiXSquare /></button>
                          </div>
                        
                        }
                        </td>
                    <th>{frete.id}</th>
                    <th>
                      {`${String(frete.data_frete).split('T')[0].split('-')[2]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[1]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[0]}
                      `}
                    </th>
                    <th>
                      {
                          editingFrete !== frete ?
                          frete.frete_empresa
                          :
                          <input type="number" onChange={ e => setFreteEmpresa(e.target.value)} placeholder={freteEmpresa}/>
                        }  
                        <span>R$</span>
                    </th>
                    <th>{
                          editingFrete !== frete ?
                          frete.frete_saida_motorista
                          :
                          <input type="number" onChange={ e => setFreteSaidaMotorista(e.target.value)} placeholder={freteSaidaMotorista}/>
                        }
                        <span>R$</span>
                    </th>
                    <th>{frete.peso_total} kg</th>
                    <th>{frete.quantidade_entregas}</th>
                    <th>{
                        editingFrete !== frete ?
                        frete.km_inicial
                        :
                        <input type="number" onChange={ e => setKmInicial(e.target.value)} placeholder={kmInicial}/>
                      } <span>Km</span></th>
                    <th>{
                        editingFrete !== frete ?
                        frete.km_final
                        :
                        
                        <input type="number" onChange={e => setKmFinal(e.target.value)} placeholder={kmFinal}/>
                      } <span>Km</span></th>
                    <th>{frete.km_final - frete.km_inicial} <span>Km</span></th>

                  </tr>
                  )) 
                }
                </tbody>
            </Table>
        </Section>
    );
}