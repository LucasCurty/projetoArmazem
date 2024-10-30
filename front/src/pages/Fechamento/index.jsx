import { useState } from "react";
import { Header } from '../../Components/Header';
import { Link } from "react-router-dom";
import { ButtonText } from '../../Components/ButtonText';
import { Dashboard } from "./Dashboard";
import { Romaneio } from "./Romaneio";
import { Container, Brand, Menu, Content, } from './styles';

export function Fechamento(){
    const [sectionActive, setSectionActive] = useState('Dashboard')

    function handleChangeSection(sectionSelected){
        setSectionActive(sectionSelected)
    }
    
    return(
        <Container>
            <Brand>
                <h1>Operação Lucio</h1>
            </Brand>
            <Header />
            
            <Menu>
                 
            <Link >
                    <ButtonText  
                        onClick={(e)=>handleChangeSection(e.target.innerText)} 
                        title="Dashboard" 
                        isactive={sectionActive === 'Dashboard'}
                    />
                        
                </Link>
                <Link >
                    <ButtonText  
                        onClick={(e)=>handleChangeSection(e.target.innerText)} 
                        title="Romaneio" 
                        isactive={sectionActive === 'Romaneio'}
                    />
                        
                </Link>

            </Menu>

            <Content>
                {sectionActive === "Dashboard" && <Dashboard />}    
                {sectionActive === "Romaneio" && <Romaneio />}    
            </Content>

           
        </Container>
    );
}
