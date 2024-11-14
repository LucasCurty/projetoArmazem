import { MenuStyled} from './styles'

export function Menu({children}){
    return(
        <MenuStyled>
          {children}
        </MenuStyled>
    )
}