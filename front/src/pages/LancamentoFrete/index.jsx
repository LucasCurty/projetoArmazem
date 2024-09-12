export function LancamentoFrete(){
    

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`/notas`)
            setNotas(response.data);
            
        }

        fetchNotes();
    },[])
    
    return(
        <Container>
            <Brand>
                <h1>Operação Lucio</h1>
            </Brand>
            <Header />
            <Menu>
                <Link to={"/lancamentoFrete"}>
                    <ButtonText 
                        isActive={menu.includes('Lançamento de Frete')} 
                        onClick={() => handleChangeMenu('Lançamento de Frete')} 
                        title="Lançamento de Frete" />
                </Link>
                <Link>
                    <ButtonText 
                        isActive={menu.includes('Gerenciamento')} 
                        onClick={() => handleChangeMenu('Gerenciamento')} 
                        title="Gerenciamento" />
                </Link>
                <Link>
                    <ButtonText 
                    isActive={menu.includes('Notas')} 
                    onClick={() => handleChangeMenu('Notas')} 
                    title="Notas" />
                </Link>
                
            </Menu>
            <Content>
                <Section title="Minhas Notas">
                    
                  
                    <Tabela  data={notas}/>
                  
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Cadastrar Notas
            </NewNote>
        </Container>
    );
}