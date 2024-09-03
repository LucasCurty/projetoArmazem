import { useState } from 'react';
import {Container, Form, Background} from './styles';
import {FiLock, FiMail} from 'react-icons/fi'
import { Link } from "react-router-dom";

import {Input} from '../../Components/Input';
import {Button} from '../../Components/Button';

import { useAuth } from '../../hooks/auth';

export function SingIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSingIn(){
        signIn({email, password});
    }

    return(
        <Container>
            <Form>
                <h1>Operação Lucio</h1>
                <p>Aplicação para salvar e gerenciar o fluxo de trabalho.</p>

                <h2>Faça seu login</h2>
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                    />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button title="Entrar" onClick={handleSingIn}/>

                <Link to="/register">Criar conta</Link>
            </Form>
            <Background />
        </Container>
    )
}