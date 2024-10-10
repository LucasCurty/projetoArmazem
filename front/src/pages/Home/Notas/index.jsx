import { useState, useEffect } from 'react';

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { Tabela } from '../../../Components/Tabela';


export function Notas(){
    const [notas, setNotas] = useState([])
    
    const keysHeadTable = ["ID_NF","NUMERO_NF","DATA_EMBARQUE", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO"]

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notas`)
            setNotas(response.data);
        }
    
        fetchNotes();
    },[])
    
    return(
        <Section title="Minhas Notas">
            {console.log(notas)}
            {notas && 
                notas.map(nota => (
                    <div key={String(nota)}>
                        <p >{nota.numero_nota}</p>
                        <p >{nota['motorista'].name}</p>
                    </div>
                ))
            }
        </Section>
    );
}