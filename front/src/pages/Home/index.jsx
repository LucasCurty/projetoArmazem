import { useState } from "react";
import { Link } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { Container, Brand,Menu, Content, NewNote} from './styles';

import { Header } from '../../Components/Header';
import { ButtonText } from '../../Components/ButtonText'

import {LancamentoFrete} from './LancamentoFrete'
import {Gerenciamento} from './Gerenciamento'
import {Notas} from './Notas'


export function Home(){
    const [sectionActive, setSectionActive] = useState('Lançamento de Frete')

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
                        title="Lançamento de Frete" 
                        isActive={sectionActive === 'Lançamento de Frete'}
                    />
                        
                </Link>
                <Link>
                    <ButtonText 
                        onClick={(e)=>handleChangeSection(e.target.innerText)} 
                        title="Gerenciamento"
                        isActive={sectionActive === "Gerenciamento"}
                    />
                </Link>
                <Link>
                    <ButtonText 
                        onClick={(e)=>handleChangeSection(e.target.innerText)} 
                        title="Notas"
                        isActive={sectionActive === "Notas"}
                    />
                </Link>
            </Menu>
            <Content>
               
                {sectionActive === "Lançamento de Frete" && <LancamentoFrete />}
                
                {sectionActive === "Gerenciamento" && <Gerenciamento/>}

                {sectionActive === "Notas" && <Notas />}
                
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Cadastrar Notas
            </NewNote>
        </Container>
    );
}