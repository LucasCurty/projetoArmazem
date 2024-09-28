
import { useEffect, useState } from 'react';
import { Section } from '../../../Components/Section';

import {Labels, Frete, InsertValues} from './styles'

import { api } from '../../../services/api'

export function LancamentoFrete(){
    const [moto, setMoto] = useState([])
    const [motorista, setMotorista] = useState({})
    const [notasFrete, setNotasFrete] = useState([])
    const [freteEmpresa, setFreteEmpresa] = useState('')
    const [freteSaidaMoto, setFreteSaidaMoto] = useState('')
    const [frete, SetFrete] = useState({})



    const [searchMotorista, setSearchMotorista] = useState(null)

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
        setSearchMotorista(null)

        event.target.value = '' 
    }

    function addFrete(){
        SetFrete( { 
            data: String(Date.now()),
            frete: (frete.length + 1),
            pesoTotal: (nota.length * 10),
            freteEmpresa,
            freteSaidaMoto,
            quantidadeEntregas:nota.length,
            motorista: motorista.name,
            placa: moto.placa,
            nota 

        })

        setMoto('')
        setFreteSaidaMoto('')
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

    return(
        <>
        <Section title={"Lançamento de Frete"}>
            <Frete>
              {
                <div className='data'>
                  <label>DATA </label>
                  <br />
                  <input type="date" onChange={e => handleChangeDate(e.target.value)} />
                </div>
              }
                 
              <InsertValues >
                <div className='infPlaca'>
                  <label>PLACA: </label>
                  <input type="text" name='placa' placeholder='Pesquisar Placa' onChange={e => setSearchMotorista(e.target.value)}  />
                  <ul>
                    { searchMotorista &&
                        moto.map((motorista,index) => (
                          <li key={String(index)} onClick={()=> selectMotorista(motorista)}>{motorista.placa} </li>
                        ))
                    }
                  </ul>
                </div>
                <div className='infFrete'>
                  <div>
                    <label>FRETE EMPRESA</label>
                    <input type="text" placeholder="Insira o valor" on onChange={e => setFreteEmpresa(e.target.value)}/>
                  </div>
                  <div className='secondChildren'>
                    <label>FRETE MOTORISTA</label>
                    <input type="text" placeholder="Insira o valor" onChange={e => setFreteSaidaMoto(e.target.value)}/>
                  </div>
                </div>
                </InsertValues>
            </Frete>
        </Section>
        <Section title="Informações do frete">
          <Labels>
            <label>DATA </label>
            <p>{mydate.day}/{mydate.months}/{mydate.years}</p>
          </Labels>

          <Labels>
              <label>MOTORISTA </label>
              <p className='nomeMoto'>{motorista.name}</p>    
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
              <label>NOTAS</label>
              <ul>
                  {notasFrete.map(note => ( 
                      <li>{note.numero_nota}</li>
                  ))
                  }
              </ul>
          </Labels>
          
        </Section>
        <button onClick={addFrete}>Enviar Frete</button>
        </>
    );
}