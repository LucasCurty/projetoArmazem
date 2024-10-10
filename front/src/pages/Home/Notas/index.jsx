import { useState, useEffect } from 'react';

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';


export function Notas(){
    const [notas, setNotas] = useState([])
    
    const keysHeadTable = ["NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO"]

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notas`)
            setNotas([response.data.id, ... response.data]);
        }

    
        fetchNotes();
    },[])
    
    return(
        <Section title="Minhas Notas">
            {console.log(notas)}
            {/* {notas && <Tabela data={notas} customKeys={keysHeadTable}/>} */}
        </Section>
    );
}