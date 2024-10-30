import { useState } from 'react';
import {Container, Form, Background} from './styles';
import {FiLock, FiMail} from 'react-icons/fi'
import { Link, useNavigate } from "react-router-dom";

import {Input} from '../../Components/Input';
import {Button} from '../../Components/Button';

import { useAuth } from '../../hooks/auth';

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { signIn } = useAuth();

    async function handleSignIn(){
        try {
            await signIn({email, password});
            navigate("/home");
        } catch (error) {
            alert("Não foi possível fazer o login.");
        }
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
                <Button title="Entrar" onClick={handleSignIn}/>

                <Link to="/register">Criar conta</Link>
            </Form>
            <Background />
        </Container>
    )
}