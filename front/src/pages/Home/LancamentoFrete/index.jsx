
import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';

import {LancarFrete, Labels, Frete, InsertValues} from './styles'

import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [apiMotorista, setApiMotorista] = useState([])
    const [selectedMotorista, setSelectedMotorista] = useState({})
    const [inputMotorista, setInputMotorista] = useState(null)

    const [notasFrete, setNotasFrete] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')

    const [cidades, setCidades] = useState([])

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
        setInputMotorista(event)
    }

    async function addFrete(){
      if(!freteEmpresa || !freteSaidaMoto){
        return alert("nao existe frete empresa ou frete saida")
      }
      await api.post('fretes',
        
          { 
          peso_total: (notasFrete.length * 10),
          frete_empresa: freteEmpresa,
          frete_saida_motorista: freteSaidaMoto,
          quantidade_entregas:notasFrete.length,
          motorista: {
            cpf_cnpj: selectedMotorista.cpf_cnpj,
            gerenciamento_risco: selectedMotorista.gerenciamento_risco ?? null,
            name: selectedMotorista.name,
            placa: selectedMotorista.placa,
            tipo_veiculo: selectedMotorista.tipo_veiculo ?? null
          },
          notas: {notasFrete}  // teste enviando somente os Ids
        }
      )
      .then(res => console.log(res.data))
      .catch(error => console.log(error.data))
      

        setInputMotorista(null)
        setFreteEmpresa('')
        setFreteSaidaMoto('')
        setSelectedMotorista({})
        setNotasFrete([])
      }
    
      useEffect(()=>{
        async function getMotorista(){
            const response = await api.get(`/motorista/${inputMotorista}`)
            setApiMotorista(response.data)
        }
        getMotorista()
        
    },[inputMotorista])

    useEffect(()=>{
      
      async function getNotas(motorista, data) {
        const response = await api.get(`/notas`, {
          params:{
          motoristaId: motorista.id,
          data_saida: new Date(data.fullDate).toISOString()
        }})

        console.log(response.data)
        // setNotasFrete(response.data)
      }

      if(selectedMotorista.id && mydate.fullDate){
        getNotas(selectedMotorista, mydate)
        // console.log(new Date(mydate.fullDate).toISOString(), selectedMotorista)  //Verificando os dados
      }

    },[selectedMotorista, mydate])

    useEffect(()=>{
      const getCidades = notasFrete.map(notas => (notas.cidade))
      setCidades([... new Set(getCidades)])
    },[notasFrete])

    const placaInput = inputMotorista ? inputMotorista.placa : ''

    return(
      <main>
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
                  <input type="text" name='placa' value={placaInput} placeholder='Pesquisar Placa' onChange={e => setInputMotorista(e.target.value)}  />
                  <div>
                    { inputMotorista &&
                        apiMotorista.map((motorista,index) => (
                          <option key={String(index)} onClick={()=> selectMotorista(motorista)}>{motorista.placa} </option>
                        ))
                      }
                  </div>
                </div>
                  <div>
                    <label>FRETE EMPRESA</label>
                    <input type="text" placeholder="Insira o valor" value={freteEmpresa} onChange={e => setFreteEmpresa(e.target.value)}/>
                  </div>
                  <div>
                    <label>FRETE MOTORISTA</label>
                    <input type="text" placeholder="Insira o valor" value={freteSaidaMoto} onChange={e => setFreteSaidaMoto(e.target.value)}/>
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
                {cidades.map(cidade => (<p>{cidade}</p>))}
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
          </LancarFrete>
        </Section>
        <button onClick={addFrete}>Enviar Frete</button>
      </main>
    );
}