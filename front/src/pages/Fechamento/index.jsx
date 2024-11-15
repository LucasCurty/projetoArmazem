import { useState } from "react";
import { Header } from '../../Components/Header';
import { Link } from "react-router-dom";
import { ButtonText } from '../../Components/ButtonText';
import { Dashboard } from "./Dashboard";
import { Romaneio } from "./Romaneio";
import { Menu } from "../../Components/Menu";
import { Container, Content, IconButtonL, IconButtonR, ContentMenu} from './styles';


export function Fechamento(){
    const [sectionActive, setSectionActive] = useState('Dashboard')
    const [isMenuVisible, setIsMenuVisible] = useState(true);


    function handleChangeSection(sectionSelected){
        setSectionActive(sectionSelected)
    }

    function toggleMenuVisibility() {
        setIsMenuVisible(prev => !prev);
    }
    
    return(
        <>
        <Header />
        <Container>
           
            {isMenuVisible && (
                <ContentMenu>
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
            </ContentMenu>
            )}
            <divIcon>
            {isMenuVisible ?
                <IconButtonL onClick={toggleMenuVisibility} />
                : 
                <IconButtonR onClick={toggleMenuVisibility} />
            }
            </divIcon>

            <Content>
                {sectionActive === "Dashboard" && <Dashboard />}    
                {sectionActive === "Romaneio" && <Romaneio />}    
            </Content>

           
        </Container>
        </>

    );
}
