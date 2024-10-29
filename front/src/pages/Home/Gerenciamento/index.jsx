import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {api} from '../../../services/api'

import { Section } from '../../../Components/Section';
import { Modal } from '../../../Components/Modal';
import { Button } from '../../../Components/Button';
import { Table, ButtonContainer, TagContainer, TagButton } from './styles'
import { FiEdit, FiCheckSquare, FiTrash } from 'react-icons/fi'
import { DateInputContainer } from './styles'

export function Gerenciamento(){
  const [fetchFretes, setFetchFretes] = useState([])
  const [editingFrete, setEditingFrete] = useState([])
  const [hasSaveFrete, setHasSaveFrete] = useState(false)
  const [motoristas, setMotoristas] = useState([])
  const [placaEdit, setPlacaEdit] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [freteParaExcluir, setFreteParaExcluir] = useState(null);

  // status dos fretes
  const [freteEmpresa, setFreteEmpresa] = useState()
  const [freteSaidaMotorista, setFreteSaidaMotorista] = useState()
  const [kmInicial, setKmInicial] = useState(0)
  const [kmFinal, setKmFinal] = useState(0)
  const [pesoTotal, setPesoTotal] = useState(0)
  const [quantidadeEntregas, setQuantidadeEntregas] = useState(0)

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('todos');

  // Adicionar novo estado para tags
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  
  // Lista de clientes únicos dos fretes para tags rápidas
  const clientesFixos = [...new Set(fetchFretes.flatMap(frete => 
    frete.notas.map(nota => nota.client)
  ))];

  // Função para alternar tag selecionada
  const toggleTag = (cliente) => {
    if (tagsSelecionadas.includes(cliente)) {
      setTagsSelecionadas([]);
      setClienteSelecionado('todos');
    } else {
      setTagsSelecionadas([cliente]);
      setClienteSelecionado(cliente);
    }
  };

  const THead = ["","N° FRETE", "DATA","CLIENTE", "FRETE EMPRESA", "FRETE SAIDA MOTO", "MARGEM", "PESO", "QUA. ENTREGAS", "KM INICIAL", "KM FINAL", "KM EXTRA","PLACA", "MOTORISTA" ]
   
  // Adicionar função para buscar motoristas
  useEffect(() => {
    async function fetchMotoristas() {
      const response = await api.get('/motorista')
      setMotoristas(response.data)
    }
    fetchMotoristas()
  }, [])

  // Modificar o useEffect para buscar clientes das notas
  useEffect(() => {
    const clientesUnicos = [...new Set(fetchFretes.flatMap(frete => 
      frete.notas.map(nota => nota.cliente || 'Sem cliente')
    ))];
    setClientes(clientesUnicos);
  }, [fetchFretes]);

  // Adicionar estados para controle de datas
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  // Modificar a lógica de filtragem para incluir datas corretamente
  const fretesFiltrados = fetchFretes
    .filter(frete => {
      // Filtro por cliente
      const passouFiltroCliente = clienteSelecionado === 'todos' || 
        frete.notas.some(nota => nota.client === clienteSelecionado);

      // Filtro por data
      const dataFrete = new Date(frete.data_frete);
      const dataInicialObj = dataInicial ? new Date(dataInicial) : null;
      const dataFinalObj = dataFinal ? new Date(dataFinal) : null;

      const passouFiltroDatas = (!dataInicial || !dataFinal) || 
        (dataFrete >= dataInicialObj && dataFrete <= new Date(dataFinal + 'T23:59:59'));

      return passouFiltroCliente && passouFiltroDatas;
    });

  function handleEditFrete(frete){
    setEditingFrete(frete)
    setFreteEmpresa(frete.frete_empresa)
    setFreteSaidaMotorista(frete.frete_saida_motorista)
    setKmInicial(frete.km_inicial)
    setKmFinal(frete.km_final)
    setPlacaEdit(frete.motorista.placa)
    setPesoTotal(frete.peso_total)
    setQuantidadeEntregas(frete.quantidade_entregas)
  }

  async function handleSendFreteEdited(frete) {
    const motoristaSelecionado = motoristas.find(m => m.placa === placaEdit)
    
    await api.put(`fretes/${frete.id}`, 
      {
        frete_empresa: freteEmpresa,
        frete_saida_motorista: freteSaidaMotorista,
        km_inicial: kmInicial,
        peso_total: pesoTotal,
        quantidade_entregas: quantidadeEntregas,
        km_final: kmFinal,
        motorista: motoristaSelecionado // adicionar ID do motorista
      }
    )
    .then(() => {
      toast.success("Frete editado com sucesso!");
    })
    .catch(() => {
      toast.error("Erro ao editar frete");
    })

    setEditingFrete([])
    setFreteEmpresa(0)
    setFreteSaidaMotorista(0)
    setKmInicial(0)
    setKmFinal(0)
    setHasSaveFrete(!hasSaveFrete)
    setPlacaEdit("")
  }

  function handleDeleteFrete(frete) {
    setFreteParaExcluir(frete);
    setIsDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setFreteParaExcluir(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/fretes/${freteParaExcluir.id}`);
      setHasSaveFrete(!hasSaveFrete);
      setEditingFrete([]);
      toast.success("Frete excluído com sucesso!");
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Erro ao excluir frete");
    }
  };

  useEffect(()=>{
      async function fetchFretes(){
        const response = await api.get(`/fretes`)
        setFetchFretes(response.data);
      }
  
        fetchFretes()
      },[hasSaveFrete])

    return(
        <Section title="Gerenciamento">
          <DateInputContainer>
            <div>
              <label htmlFor="dataInicial">Data Inicial: </label>
              <input
                type="date"
                id="dataInicial"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dataFinal">Data Final: </label>
              <input
                type="date"
                id="dataFinal"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
              />
            </div>
          </DateInputContainer>

          <TagContainer>
            {clientesFixos.map(cliente => (
              <TagButton
                key={String(cliente)}
                onClick={() => toggleTag(cliente)}
                selected={tagsSelecionadas.includes(cliente)}
              >
                {cliente}
              </TagButton>
            ))}
          </TagContainer>

          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Table>
            <thead>
              <tr>
              {THead.map((head, index) => <th key={`header-${index}`}>{head}</th>)}
              </tr>
            </thead>
            <tbody>
            {
              fretesFiltrados &&
                fretesFiltrados.map(frete =>(
                  <tr key={String(frete.id)}>
                    <td className='buttns'>
                        { editingFrete !== frete ?
                          <button onClick={ () => handleEditFrete(frete)}>
                            <FiEdit/>
                          </button>
                          :
                          <div>
                            <button className='enviar' onClick={ () => handleSendFreteEdited(frete)}>
                              <FiCheckSquare />
                            </button>
                          <button className='excluir' onClick={() =>      handleDeleteFrete(frete)}>
                              <FiTrash />
                            </button>
                          </div>
                        
                        }
                        {
                          isDeleteModalOpen && (
                            <Modal
                              isOpen={isDeleteModalOpen}
                            title="Confirmar Exclusão" 
                            onClose={handleCloseDeleteModal}
                          >
                            <p>Tem certeza que deseja excluir este frete?</p>
                            <ButtonContainer>
                              <Button
                                title="Cancelar"
                                type="button"
                                onClick={handleCloseDeleteModal}
                              />
                              <Button
                                title="Excluir"
                                type="button"
                                onClick={handleConfirmDelete}
                              />
                            </ButtonContainer>
                          </Modal>
                        )}
                        </td>
                    <th>{frete.id}</th>
                    <th>
                      {`${String(frete.data_frete).split('T')[0].split('-')[2]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[1]} /
                        ${String(frete.data_frete).split('T')[0].split('-')[0]}
                      `}
                    </th>
                    <th>
                      {[...new Set(frete.notas.map(nota => nota.client))]}
                    </th>
                    <th>
                      {
                          editingFrete !== frete ?
                          frete.frete_empresa
                          :
                          <input type="number" onChange={ e => setFreteEmpresa(e.target.value)} placeholder={freteEmpresa}/>
                        }  
                        <span>R$</span>
                    </th>
                    
                    <th>{
                          editingFrete !== frete ?
                          frete.frete_saida_motorista
                          :
                          <input type="number" onChange={ e => setFreteSaidaMotorista(e.target.value)} placeholder={freteSaidaMotorista}/>
                        }
                    <span>R$</span>
                    </th>
                    <th>
                      <span title={`Margem: R$${(frete.frete_empresa - frete.frete_saida_motorista).toFixed(2)}
                        Cálculo: (${frete.frete_empresa} - ${frete.frete_saida_motorista}) ÷ ${frete.frete_empresa} × 100`}>
                        {(() => {
                          const margem = frete.frete_empresa - frete.frete_saida_motorista;
                          const porcentagem = ((margem / frete.frete_empresa) * 100).toFixed(2);
                          return `${porcentagem}%`;
                        })()}
                      </span>
                    </th>
                    <th>{frete.peso_total} kg</th>
                    <th>{frete.quantidade_entregas}</th>
                    <th>{
                        editingFrete !== frete ?
                        frete.km_inicial
                        :
                        <input type="number" onChange={ e => setKmInicial(e.target.value)} placeholder={kmInicial}/>
                      } <span>Km</span></th>
                    <th>{
                        editingFrete !== frete ?
                        frete.km_final
                        :
                        
                        <input type="number" onChange={e => setKmFinal(e.target.value)} placeholder={kmFinal}/>
                      } <span>Km</span></th>
                    <th>{frete.km_final - frete.km_inicial} <span>Km</span></th>
                    <th>{
                        editingFrete !== frete ?
                        (frete.motorista?.placa || "Sem placa") :
                        <select 
                          value={placaEdit}
                          onChange={e => setPlacaEdit(e.target.value)}
                        >
                          <option value="">Selecione uma placa</option>
                          {motoristas.map(motorista => (
                            <option key={motorista.id} value={motorista.placa}>
                              {motorista.placa}
                            </option>
                          ))}
                        </select>
                      }</th>
                    <th>{
                        editingFrete !== frete ?
                        (frete.motorista?.name || "Sem nome") :
                        motoristas.find(m => m.placa === placaEdit)?.name || "Selecione uma placa"
                      }</th>
                  </tr>
                  )) 
                }
                </tbody>
            </Table>
        </Section>
    );
}

