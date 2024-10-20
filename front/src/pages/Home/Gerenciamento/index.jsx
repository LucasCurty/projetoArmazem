import { useState, useEffect } from 'react';

import {api} from '../../../services/api'

import { Section } from '../../../Components/Section';
import {Table} from './styles'

export function Gerenciamento(){
  const [fetchFretes, setFetchFretes] = useState([])

  const THead = ["N° FRETE", "DATA", "FRETE EMPRESA", "FRETE SAIDA MOTO", "PESO", "QUA. ENTREGAS", "KM INICIAL", "KM FINAL", "KM TOTAL" ]

  useEffect(()=>{
      async function fetchFretes(){
        const response = await api.get(`/fretes`)
        setFetchFretes(response.data);
      }
  
        fetchFretes()
      },[])

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
                    <th>{frete.id}</th>
                    <th>
                      {`${String(frete.data_frete).split('T')[0].split('-')[2]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[1]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[0]}
                      `}
                    </th>
                    <th>{frete.frete_empresa} R$</th>
                    <th>{frete.frete_saida_motorista} R$</th>
                    <th>{frete.peso_total} kg</th>
                    <th>{frete.quantidade_entregas}</th>
                    <th>{frete.km_inicial} kms</th>
                    <th>{frete.km_final} kms</th>
                    <th>{frete.km_inicial - frete.km_final}</th>

                  </tr>
                  )) 
                }
                </tbody>
            </Table>
        </Section>
    );
}