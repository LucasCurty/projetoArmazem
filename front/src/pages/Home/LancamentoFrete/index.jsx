
import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';

import {LancarFrete, Labels, Frete, InsertValues} from './styles'

import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [moto, setMoto] = useState([])
    const [motorista, setMotorista] = useState({})
    const [notasFrete, setNotasFrete] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')




    const [searchMotorista, setSearchMotorista] = useState(null)
    const [cidades, setCidades] = useState([])

    const [mydate, setMyDate] = useState({
      day: new Date().getDate(),
      months: (new Date().getMonth() + 1).toString().padStart(2, '0'),
      years: new Date().getFullYear(),
    })

    function handleChangeDate(e){
      const data = String(e).split('-')
      setMyDate({
        day: data[2],
        months: data[1],
        years: data[0],
      })
    }


    function selectMotorista(event){
        setMotorista(event)
        setSearchMotorista(event)


    }

    async function addFrete(){
      if(!freteEmpresa || !freteSaidaMoto){
        return alert("nao existe frete empresa ou frete saida")
      }

      await api.post('fretes',
        { 
          data: Date.now(),
          pesoTotal: (notasFrete.length * 10),
          freteEmpresa,
          freteSaidaMoto,
          quantidadeEntregas:notasFrete.length,
          motorista: motorista.name,
          placa: motorista.placa,
          notasFrete 
        }
      )
      .then(res => console.log(res))
      .catch(error => console.log(error))
      

        setMoto([''])
        setFreteEmpresa('')
        setFreteSaidaMoto('')
        setMotorista({})
      }
    
    useEffect(()=>{
        async function getMotorista(){
            const response = await api.get(`/motorista/${searchMotorista}`)
            setMoto(response.data)
        }
        getMotorista()
    },[searchMotorista])

    useEffect(()=>{
        async function getNotas() {
            const response = await api.get(`/notas`)
            setNotasFrete(response.data)

        }
        getNotas()

    },[moto])

    useEffect(()=>{
      const getCidades = notasFrete.map(notas => (notas.cidade))
      setCidades([... new Set(getCidades)])

    },[motorista, notasFrete])

    const placaInput = searchMotorista ? searchMotorista.placa : ''
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
                  <input type="text" name='placa' value={placaInput} placeholder='Pesquisar Placa' onChange={e => setSearchMotorista(e.target.value)}  />
                    { searchMotorista &&
                        moto.map((motorista,index) => (
                          <option key={String(index)} onClick={()=> selectMotorista(motorista)}>{motorista.placa} </option>
                        ))
                    }
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
                <p>{motorista.name}</p>    
                <label>PLACA </label>
                <p>{motorista.placa}</p>    
                <label>TIPO DE VEICULO </label>
                <p>{motorista.tipo_veiculo}</p>    
            </Labels>
            <Labels>
                <label>FRETE EMPRESA</label>
                <p>{freteEmpresa}</p>
                <label>FRETE MOTORISTA</label>
                <p>{freteSaidaMoto}</p>
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
                          <p><span>Tipo:</span> {note.tipo}</p>
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