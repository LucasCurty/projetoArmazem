import { useState, useEffect } from 'react'

import {Container,Links ,Content} from './styles'
import { useParams, useNavigate } from 'react-router-dom'

import { Header } from "../../Components/Header"
import { Button } from "../../Components/Button"
import { Section } from "../../Components/Section"
import { Tag } from "../../Components/Tag"
import { ButtonText } from "../../Components/ButtonText"
import { api } from '../../services/api'

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  
  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      handleBack();
    }
  }

  useEffect(()=>{
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    } 

    fetchNote();    
  },[])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText 
              onClick={handleRemove}
              title="Excluir nota" />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {
              data.links &&
              <Section  title="Links úteis">
              <Links>
              {
                data.links.map(link => (
                  <li key={String(link.id)}>
                    <a target="_blank" href={link.url}>
                      {link.url}
                    </a>
                  </li>
                ))
              }
              </Links>
              </Section>
            }

            {
              data.tags &&
              <Section  title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)}
                      title={tag.name}/>
                  ))
                }
              </Section>
            }
            <Button title="Voltar" onClick={handleBack}/>
          </Content>
        </main>
      }
    </Container>
)
}