import { useState, useEffect } from 'react';
import { FiEdit, FiCheckSquare, FiXSquare} from 'react-icons/fi'

import { api } from '../../../services/api';
import { Section } from '../../../Components/Section';
import { THead, TBody, Table, SearchContainer, SearchInput, SearchSelect } from './styles';


export function Notas(){
  // state de consumir api notas
  const [fetchNotas, setfetchNotas] = useState([])
  const [reFetchNotas, setReFethNotas] = useState(false)
  const [fetchMotoristas, setFetchMotoristas] = useState([])

  //state de tipo de produto
  const [changeNota, setChangeNota] = useState([])
  const [valueChange, setValueChange] = useState('')

  //state de data embarque - 
  const [dataEmbarque, setDataEmbarque] = useState()

  //state de motorista
  const [placa, setPlaca] = useState({})
  
  //starte de observação
  const [observacoesNF, setObservacoes] = useState('')

  //state message
  const [msg, setMsg] = useState('')
  const [msgClass, setMsgClass] = useState('')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchNota, setSearchNota] = useState('');
  const [searchCliente, setSearchCliente] = useState('');
  const [clientes, setClientes] = useState([]);

  const keysHeadTable = ["","NUMERO_NF", "CLIENTE","DESTINATARIO", "ENDERECO_DESTINATARIO","CIDADE", "PESO","VALOR_NF", "TIPO_PRODUTO", "DATA_EMBARQUE", "PLACA", "OBSERVAÇÕES "]

  async function handleSelectMotorista(placa){
    const searchMoto = fetchMotoristas.filter(fetchMotoristas => fetchMotoristas.placa == placa)
    setPlaca(searchMoto[0])

  }

  function handleChangeInfomationOfNote(nf){ // funcao para pegar a nota e aditar
    setChangeNota(nf)
  } 

  function handleTypeObservacao(e){
    setObservacoes(e)
  }

  async function changeInfoNote(nf){  
       await api.put(`/notas/${nf.id}`, {
        tipo_produto: valueChange ? valueChange : nf.tipo_produto,
        data_saida: dataEmbarque ? new Date(dataEmbarque) : nf.data_saida,
        motoristaId: placa.id ? placa.id : nf.motoristaId,
        observacoes: observacoesNF ? observacoesNF : nf.observacoes,
    })
    .then(
      setMsg(`A nota ${nf.numero_nota} foi alterada com sucesso!`),
      setMsgClass('sucess'),
      setTimeout(()=>{
        setMsg('')
      },[2500])

    )
    .catch(err => {
      setMsg(`Não foi possivel alterar a nota ${nf.numero_nota}, erro: ${err}`)
      setMsgClass('denid'),
      setTimeout(()=>{
        setMsg('')
      },[2500])
    })
    setReFethNotas(!reFetchNotas)
    setValueChange('')
    setDataEmbarque('')
    setObservacoes('')
    setPlaca({})
    setChangeNota([])
    setFetchMotoristas([])
    
  }

  // Função para buscar notas com filtro
  

  // Função para buscar clientes únicos
  async function fetchClientes() {
    const response = await api.get('/notas');
    const uniqueClientes = [...new Set(response.data.map(nota => nota.client))];
    setClientes(uniqueClientes);
  }
  
  useEffect(() => {
    async function fetchNotes(){      
      const response = await api.get(`/notas?numero_nota=${searchNota}&client=${searchCliente}`);
      setfetchNotas(response.data);
    }
    fetchNotes();
  }, [searchNota, searchCliente]);

  // Effect para carregar clientes ao montar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Effect para buscar notas quando os filtros mudarem
  useEffect(() => {
 
  }, [searchNota, searchCliente]);

  return(
    <Section title="Minhas Notas">
      <SearchContainer>
        <SearchSelect
          value={searchCliente}
          onChange={(e) => setSearchCliente(e.target.value)}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente, index) => (
            <option key={index} value={cliente}>
              {cliente}
            </option>
          ))}
        </SearchSelect>

        <SearchInput 
          type="text"
          placeholder="Buscar por número da nota..."
          value={searchNota}
          onChange={(e) => setSearchNota(e.target.value)}
        />
      </SearchContainer>

      <Table>
        { msg &&  <span className={msgClass}>{msg}</span>}
        <THead>
            <tr>
            {
              keysHeadTable.map((head, index) => (
                <td key={String(index)}>{head}</td> 
              ))
            }
            </tr>
        </THead>
        <TBody>
            {fetchNotas && 
              fetchNotas.map(nota => ( 
                <tr key={String(nota.id)}>
                  <td className='buttns'>
                  { changeNota !== nota ? 
                    <button onClick={ () => handleChangeInfomationOfNote(nota)}><FiEdit/></button>
                    :
                    <div>
                      <button className='enviar' onClick={()=> changeInfoNote(nota)}><FiCheckSquare /></button>
                      <button className='cancel' onClick={() => handleChangeInfomationOfNote()}><FiXSquare /></button>
                    </div>
                  }
                  </td>
                    <td>{nota.numero_nota}</td>
                    <td>{nota.client}</td>
                    <td>{nota.destinatario}</td>
                    <td>{nota.endereco_destinatario}</td>
                    <td>{nota.cidade}</td>
                    <td>{nota.peso}</td>
                    <td>{nota.valor_nota}</td>
                    <td>
                    {
                      changeNota == nota ?
                      <div>
                        <select name="tipoProduto"  onChange={(e)=> setValueChange(e.target.value)}>
                          <option></option>
                          <option>REFRIGERADO</option>
                          <option >SECO</option>
                        </select>
                      </div>
                      :
                      <div>
                        {!nota.tipo_produto ? " - " : nota.tipo_produto }
                      </div>
                      }
                    </td>
                    <td>
                      {
                        changeNota == nota ?
                        <input type="date" onChange={e => setDataEmbarque(e.target.value)} />
                        :
                          nota.data_saida ?
                          `
                            ${String(nota.data_saida).split('T')[0].split('-')[2]}-${String(nota.data_saida).split('T')[0].split('-')[1]}-${String(nota.data_saida).split('T')[0].split('-')[0]}  
                          ` 
                          :
                          '-'

                          
                        
                      }
                    </td>
                    <td>
                      { changeNota == nota ?
                        <div>
                          <select name="placaMotorista" onChange={e => handleSelectMotorista(e.target.value)}>
                            {fetchMotoristas.map(moto => (
                              <option>{moto.placa}</option>
                            ))}
                          </select>
                        </div>
                        :
                        <div>
                          {nota.motorista ?  nota.motorista?.placa :'-'}
                        </div>
                      }
                    </td>
                    <td>
                      { changeNota == nota ?
                          <input type="text"  onChange={e => handleTypeObservacao(e.target.value)}/> 
                        :
                        nota.observacoes ? nota.observacoes : '-'
                    
                      }</td>
                </tr>
            ))
            }
        </TBody>
      </Table>
    </Section>
  );
}
