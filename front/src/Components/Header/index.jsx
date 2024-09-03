import { RiShutDownLine } from 'react-icons/ri'
import { useAuth} from '../../hooks/auth'
import { api } from '../../services/api';
import avatarPlacehoder from '../../assets/perfil.svg'

import { Container, Profile, Logout } from "./styles";

export function Header(){
    
    const {user, signOut} = useAuth();
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

        <Logout onClick={signOut}>
            <RiShutDownLine />
        </Logout>

    </Container>
)
}