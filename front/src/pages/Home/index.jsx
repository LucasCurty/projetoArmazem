import { useState, useEffect } from "react";

import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";

import { Tabela } from '../../Components/Tabela'

import { Container, Brand, Content, NewNote} from './styles';

import { Header } from '../../Components/Header';
import { Section } from '../../Components/Section';
import { Menu } from "../../Components/Menu";


export function Home(){
    const [notas, setNotas] = useState([])

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notas`)
            setNotas(response.data);
        }

        fetchNotes();
    },[])
    
    return(
        <Container>
            <Brand>
                <h1>Operação Lucio</h1>
            </Brand>
            <Header />
            {/* <Menu /> */}
                
            <Content>
                <Section title="Minhas Notas">
                    
                  
                    <Tabela  data={notas}/>
                  
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Cadastrar Notas
            </NewNote>
        </Container>
    );
}