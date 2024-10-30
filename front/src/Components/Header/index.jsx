import { RiShutDownLine, RiMoneyDollarCircleLine, RiHome2Line } from 'react-icons/ri'
import { useAuth} from '../../hooks/auth'
import { api } from '../../services/api';
import avatarPlacehoder from '../../assets/perfil.svg'
import { useLocation } from 'react-router-dom'

import { Container, Profile, Logout, Navigation } from "./styles";

export function Header(){
    
    const {user, signOut} = useAuth();
    const location = useLocation();
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlacehoder;
    return(
    <Container>
        <Profile to="/profile">
            <img 
                src={avatarUrl}
                alt={user.name}
            />
            <div>
                <span>Bem-Vindo</span>
                <strong>{user.name}</strong>
            </div>
        </Profile>

        <div>
            <Navigation to={location.pathname === '/analise' ? '/' : '/analise'}>
                {location.pathname === '/analise' ? <RiHome2Line /> : <RiMoneyDollarCircleLine />}
            </Navigation>

        </div>
            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>

    </Container>
)
}