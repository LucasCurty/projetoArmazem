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
            </Menu>
            <Content>
                <Section title="Minhas Notas">
                    {console.log(notas)}
                    <table id="customers">
                    <thead>
                        <tr>
                            <th scope="col">Numero NF </th>
                            <th scope="col">Cliente origem</th>
                            <th scope="col">Cliente destino</th>
                            <th scope="col">Endereço cliente</th>
                            <th scope="col">Cidade cliente</th>
                            <th scope="col">Peso total da NF</th>
                            <th scope="col">Valor total da NF</th>
                        </tr>
                    </thead>                    
                    <tbody>
                    {notas.map((nota,index)=>(
                        <tr key={index}>
                            <td><strong>{nota.numero_nota}</strong></td>
                            <td>{nota.cliente}</td>
                            <td>{nota.cidade}</td>
                            <td>{nota.destinatario}</td>
                            <td>{nota.endereco_destinatario}</td>
                            <td>{nota.peso}</td>
                            <td>{nota.valor_nota}</td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}