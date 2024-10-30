import { useState } from "react";
import { Header } from '../../Components/Header';
import { Container, Brand,Menu, Content, NewNote} from './styles';



export function Financeiro(){
    const [sectionActive, setSectionActive] = useState('')

    function handleChangeSection(sectionSelected){
        setSectionActive(sectionSelected)
    }
    
    return(
        <Container>
            <Brand>
                <h1>Operação Lucio</h1>
            </Brand>
            <Header />
                
           
        </Container>
    );
}
