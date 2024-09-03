import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Header } from '../../Components/Header'
import { Input } from '../../Components/Input'
import { Textarea } from '../../Components/Textarea'
import { Section } from '../../Components/Section'
import { NoteItem } from '../../Components/NoteItem'
import { Button } from '../../Components/Button'

import { api } from "../../services/api"

import { Container, Form } from "./styles"
import { CreateNotas } from "../../Components/CreateNotas"

export function New(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");
    
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag("")
    }
    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNota() {
        if(newTag || newLink){
            alert("Ainda faltar salvar para poder salvar")
        }
        if(!title || !description){
            alert("Ainda faltar dizer o titulo ou a descrição")
        }

        await api.post("notes", {
            title,
            description,
            links,
            tags
        })     
        alert("Notas criada com sucesso!")
        navigate("/")
        
    }

    return(
        <Container>
            <Header/>
            <CreateNotas />
            {/* <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                        
                    />
                    <Textarea 
                        placeholder="Observações" 
                        onChange={e => setDescription(e.target.value)}

                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                /> 
                            ))
                        }
                        <NoteItem 
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                            
                            />
                    </Section>
                    <Section title="Clientes">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={()=>handleRemoveTag(tag)}

                                    />

                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder="Novo cliente"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag} 
                                onClick={handleAddTag}

                            />
                        </div>
                    </Section>
                    <Button 
                        title="Salvar"
                        onClick={handleNewNota}
                    />
                </Form>
            </main> */}
        </Container>
    )
}