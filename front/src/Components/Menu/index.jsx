import { useState } from "react"
import { Link } from "react-router-dom"

import { ButtonText } from '../../Components/ButtonText'


export function Menu(){
    const [menu, setMenu] = useState([])

    function handleChangeMenu(myMenu){
        const search = menu.includes(myMenu)
        search ? setMenu('') : setMenu(myMenu)
    }

    return(
        <h1>Hello MENU</h1>
        // <Menu>
        //     <Link to={"/lancamentoFrete"}>
        //         <ButtonText 
        //             isActive={menu.includes('Lançamento de Frete')} 
        //             onClick={() => handleChangeMenu('Lançamento de Frete')} 
        //             title="Lançamento de Frete" />
        //     </Link>
        //     <Link>
        //         <ButtonText 
        //             isActive={menu.includes('Gerenciamento')} 
        //             onClick={() => handleChangeMenu('Gerenciamento')} 
        //             title="Gerenciamento" />
        //     </Link>
        //     <Link>
        //         <ButtonText 
        //         isActive={menu.includes('Notas')} 
        //         onClick={() => handleChangeMenu('Notas')} 
        //         title="Notas" />
        //     </Link>
        
        // </Menu>
    )
}