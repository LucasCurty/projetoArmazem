import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Container, ContentMenu, Content, NewNote, IconButtonLeft, IconButtonRight, divIcon} from './styles';
import { Link } from "react-router-dom";

import { Header } from '../../Components/Header';
import { Menu } from "../../Components/Menu";
import { ButtonText } from "../../Components/ButtonText";

import {LancamentoFrete} from './LancamentoFrete'
import {Gerenciamento} from './Gerenciamento'
import {Notas} from './Notas'
import { Motoristas } from './Motoristas'


export function Home(){
    const [sectionActive, setSectionActive] = useState('Lançamento de Frete')
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    function handleChangeSection(sectionSelected){
        setSectionActive(sectionSelected)
    }

    function toggleMenuVisibility() {
        setIsMenuVisible(prev => !prev);
    }
    
    return(
        <main>
        <Header />
        <Container>
                <>
            {isMenuVisible && (
            <ContentMenu>
                <Menu >
                    <Link>
                        <ButtonText  
                            onClick={(e)=>handleChangeSection(e.target.innerText)} 
                            title="Lançamento de Frete" 
                            isactive={sectionActive === 'Lançamento de Frete'}
                            />
                    </Link>
                    <Link>
                        <ButtonText 
                            onClick={(e)=>handleChangeSection(e.target.innerText)} 
                            title="Gerenciamento"
                            isactive={sectionActive === "Gerenciamento"}
                            />
                    </Link>
                    <Link>
                        <ButtonText 
                            onClick={(e)=>handleChangeSection(e.target.innerText)} 
                            title="Notas"
                            isactive={sectionActive === "Notas"}
                            />
                    </Link>
                    <Link>
                        <ButtonText 
                            onClick={(e)=>handleChangeSection(e.target.innerText)} 
                            title="Motoristas"
                            isactive={sectionActive === "Motoristas"}
                            />
                    </Link>
                </Menu>
                <NewNote to="/new"><FiPlus />Cadastrar Notas</NewNote>
            </ContentMenu>
            )}
            <divIcon>
                {isMenuVisible ?
                    <IconButtonLeft setando onClick={toggleMenuVisibility} />
                    : 
                    <IconButtonRight setando onClick={toggleMenuVisibility} />
                }
            </divIcon>
                </>
            <Content>
                {sectionActive === "Lançamento de Frete" && <LancamentoFrete />}
                {sectionActive === "Gerenciamento" && <Gerenciamento/>}
                {sectionActive === "Notas" && <Notas />}
                {sectionActive === "Motoristas" && <Motoristas />}
            </Content>
        </Container>
        </main>
    );
}
