import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import {New} from '../pages/New'
import {Home} from '../pages/Home'
import {Profile} from '../pages/Profile'
import {Fechamento} from '../pages/Fechamento'

export function AppRoutes(){
    const { user } = useAuth();

    // Redireciona para login se não houver usuário
    if (!user) {
        return <Navigate to="/" />;
    }

    return(
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/new" element={<New/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/fechamento" element={<Fechamento/>} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}