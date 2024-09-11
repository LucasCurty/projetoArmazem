import { useState, useEffect } from "react";

import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";

import { Tabela } from '../../Components/Tabela'

import { Container, Brand, Menu, Content, NewNote} from './styles';

import { Header } from '../../Components/Header';
import { ButtonText } from '../../Components/ButtonText'
import { Section } from '../../Components/Section';

export function Home(){
    const [clients, setClients] = useState([]);
    const [notas, setNotas] = useState([])
 

    

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notas`)
            setNotas(response.data);
            
        }

        fetchNotes();
    },[])

    useEffect(()=>{
         notas.map(item => setClients(prevState => [...prevState,item.client]))
            
    },[notas])

    
    return(
        <Container>
            <Brand>
                <h1>Operação Lucio</h1>
            </Brand>
            <Header />
            <Menu>
            <li><ButtonText title="Todos"/></li>
                {
                clients &&
               
                  clients.map((client, index) => (
                    <li key={String(index)}>
                        <ButtonText isActive title={client}/>
                    </li>

                  ))
                }
                <li><ButtonText title="Teste - 3"/></li>
            </Menu>
            <Content>
                <Section title="Minhas Notas">
                    
                  
                    <Tabela  data={notas}/>
                  
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}