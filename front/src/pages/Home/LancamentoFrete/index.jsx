import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {LancarFrete, Labels, Frete, InsertValues} from './styles'
import { Button } from '../../../Components/Button';
import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [apiMotorista, setApiMotorista] = useState([])
    const [selectedMotorista, setSelectedMotorista] = useState({})
    const [inputMotorista, setInputMotorista] = useState(null)

    const [notasFrete, setNotasFrete] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')

    const [cidades, setCidades] = useState([])
    const [uniqueAddresses, setUniqueAddresses] = useState([])

    const [mydate, setMyDate] = useState({
      day: (new Date().getDate()).toString().padStart(2,'0'),
      months: (new Date().getMonth() + 1).toString().padStart(2, '0'),
      years: new Date().getFullYear(),
      fullDate: new Date().toISOString()
      
    })

    //lancar data do frete 
    function handleChangeDate(e){
      const data = String(e).split('-')
      setMyDate({
        fullDate: e,
        day: data[2],
        months: data[1],
        years: data[0],
      })
    }


    async function selectMotorista(event){
        setSelectedMotorista(event)
        setInputMotorista(null) // Limpa o input após selecionar
        setApiMotorista([]) // Limpa as opções após selecionar
    }

    async function addFrete(){
      if(!freteEmpresa || !freteSaidaMoto){
        return toast.error("Por favor, preencha o frete empresa e frete saída")
      }

      if(notasFrete.length === 0){
        return toast.error("Não é possível lançar um frete sem notas fiscais")
      }

      await api.post('/fretes',
        { 
          peso_total: notasFrete.reduce((acc, nota) => acc + Number(nota.peso.replace(',', '.')), 0),
          frete_empresa: freteEmpresa,  
          frete_saida_motorista: freteSaidaMoto,
          quantidade_entregas: uniqueAddresses.length,
          km_inicial: 0,
          km_final: 0,
          motorista: {
            id: selectedMotorista.id,
            cpf_cnpj: selectedMotorista.cpf_cnpj,
            gerenciamento_risco: selectedMotorista.gerenciamento_risco ?? null,
            name: selectedMotorista.name,
            placa: selectedMotorista.placa,
            tipo_veiculo: selectedMotorista.tipo_veiculo ?? null
          },
          notas: notasFrete
        })      
      .then(res => toast.success("Frete lançado com sucesso!"))
      .catch(error => toast.error("Erro ao lançar frete"))
        setInputMotorista(null)
        setFreteEmpresa('')
        setFreteSaidaMoto('')
        setSelectedMotorista({})
        setNotasFrete([])
      }
    
      useEffect(()=>{
        async function getMotorista(){
            if (!inputMotorista) return; // Não busca se input estiver vazio
            
            try {
                const response = await api.get(`/motorista/${inputMotorista}`);
                setApiMotorista(response.data); // Atualiza o estado com os resultados
                
                if (response.data.length === 0) {
                    toast.info("Nenhum motorista encontrado");
                }
            } catch (error) {
                toast.error("Erro ao buscar motorista");
                console.error(error);
            }
        }
        
        getMotorista();
      },[inputMotorista])

      useEffect(()=>{
      
      async function getNotas(motorista, data) {
        const response = await api.get(`/notas/${motorista.id}`, {
          params:{
          data_saida: new Date(data.fullDate).toISOString()
        }})
        setNotasFrete(response.data)
      }
      if(selectedMotorista.id && mydate.fullDate){ // verificando se existe os 2 dados antes de executar o fetch
        getNotas(selectedMotorista, mydate) 
      }

    },[selectedMotorista, mydate])

    useEffect(()=>{
      const getCidades = notasFrete.map(notas => (notas.cidade))
      const getEnderecos = notasFrete.map(notas => (notas.endereco_destinatario))
      
      setCidades([...new Set(getCidades)])
      setUniqueAddresses([...new Set(getEnderecos)])
    },[notasFrete])

    const placaInput = inputMotorista ? inputMotorista.placa : ''

    return(
      <main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Section title={"Lançamento de Frete"}>
            <Frete>
              {
                <div className='data'>
                  <label>DATA</label>
                  <br />
                  <input type="date" onChange={e => handleChangeDate(e.target.value)} />
                </div>
              }
              <InsertValues >
                <div className='infPlaca'>
                  <label>PLACA: </label>
                  <input 
                    type="text" 
                    name='placa' 
                    value={placaInput} 
                    placeholder='Pesquisar Placa' 
                    onChange={e => {
                      setInputMotorista(e.target.value)
                      setApiMotorista([]) // Limpa as opções ao começar nova busca
                    }}
                    autoComplete="off"
                  />
                  <div>
                    { inputMotorista && apiMotorista.length > 0 && // Só mostra se tiver resultados
                        apiMotorista.map((motorista,index) => (
                          <option key={String(index)} onClick={()=> selectMotorista(motorista)}>
                            {motorista.placa}
                          </option>
                        ))
                    }
                  </div>
                </div>
                  <div>
                    <label>FRETE EMPRESA</label>
                    <input type="number" placeholder="Insira o valor" value={freteEmpresa} onChange={e => setFreteEmpresa(e.target.value)}/>
                  </div>
                  <div>
                    <label>FRETE MOTORISTA</label>
                    <input type="number" placeholder="Insira o valor" value={freteSaidaMoto} onChange={e => setFreteSaidaMoto(e.target.value)}/>
                  </div>
                </InsertValues>
            </Frete>
        </Section>
        <Section title="Informações do frete">
          <LancarFrete>
            <Labels>
              <label>DATA</label>
              <p>{mydate.day}/{mydate.months}/{mydate.years}</p>
            </Labels>

            <Labels>
                <label>MOTORISTA </label>
                <p>{selectedMotorista.name ? selectedMotorista.name : "#"}</p>    
                <label>PLACA </label>
                <p>{selectedMotorista.placa ? selectedMotorista.placa : "#"}</p>    
                <label>TIPO DE VEICULO </label>
                <p>{selectedMotorista.tipo_veiculo ? selectedMotorista.tipo_veiculo : "#"}</p>    
            </Labels>
            <Labels>
                <label>FRETE EMPRESA</label>
                <p>{freteEmpresa ? freteEmpresa + ' R$' : ' ----- R$'}</p>
                <label>FRETE MOTORISTA</label>
                <p>{freteSaidaMoto ? freteSaidaMoto + ' R$':' ----- R$'}</p>
            </Labels>
            <Labels>
              <label>CIDADES DESTINO</label>
                <p>{cidades.map(cidade => (<p>{cidade}</p>))}</p>
            </Labels>
            <Labels>
              <label>ENTREGAS</label>
              <p>{uniqueAddresses.length}</p>
            </Labels>
            <Labels>
                <label>NOTAS</label>
                <ul>
                  {notasFrete.map((note , index) => ( 
                    <li key={index}>
                      <div className="tooltip">
                        {note.numero_nota}
                        <div className="tooltiptext">
                          <p><span>NFe:</span> {note.numero_nota}</p>
                          <p><span>Cliente:</span> {note.client}</p>
                          <p><span>Destinatário:</span> {note.destinatario}</p>
                          <p><span>Endereço:</span> {note.endereco_destinatario}</p>
                          <p><span>Peso:</span> {note.peso}</p>
                          <p><span>Valor:</span> {note.valor_nota}</p>
                          <p><span>Tipo:</span> {note.tipo_produto}</p>
                          <p><span>Obs:</span> {note.observacoes}</p>
                        </div>
                      </div>
                    </li>
                  ))
                  }
                </ul>
            </Labels>
            <Labels>
              <label>CLIENTE</label>
                {
                  [...new Set(notasFrete.map(nota => nota.client))].map(client => (
                    <p>{client}</p>
                  ))
                }
            </Labels>
          </LancarFrete>
        </Section>
        <Button 
          onClick={addFrete} 
          title="Enviar Frete"
        />
      </main>
    );
}
