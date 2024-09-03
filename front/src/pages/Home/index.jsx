import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";

import { Container, Brand, Menu, Content, NewNote} from './styles';

import { Header } from '../../Components/Header';
import { Section } from '../../Components/Section';

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

            <Menu>
                <li>
                    
                </li>

            </Menu>
            <Content>
                <Section title="Minhas Notas">
                    {                 
                        notas ? 
                        notas.map((nota,index) =>{
                            <li key={index}>{nota}</li>
                        })
                        :
                        <div>CARREGANDO...</div>
                    }
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}