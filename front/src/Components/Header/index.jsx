import { RiShutDownLine, RiMoneyDollarCircleLine, RiHome2Line } from 'react-icons/ri'
import { useAuth} from '../../hooks/auth'
import { api } from '../../services/api';
import avatarPlacehoder from '../../assets/perfil.svg'
import { useLocation, useNavigate } from 'react-router-dom'

import { Container, Profile, Logout, Navigation} from "./styles";

export function Header(){
    
    const {user, signOut} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlacehoder;

    const handleSignOut = () => {
        navigate('/');
        signOut();
    }

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
            <Navigation to={location.pathname === '/fechamento' ? '/home' : '/fechamento'}>
                {location.pathname === '/fechamento' ? <RiHome2Line /> : <RiMoneyDollarCircleLine />}
            </Navigation>

        </div>
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>

    </Container>
)
}