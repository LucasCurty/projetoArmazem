import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Section } from '../../../Components/Section';
import { useState, useEffect } from 'react'
import { Container, TableContainer, Table, Form, ButtonContainer, Select, ActionButtons, EditButton, DeleteButton } from './styles';
import { Input } from '../../../Components/Input'
import { Button } from '../../../Components/Button'
import { Modal } from '../../../Components/Modal'
import { api } from '../../../services/api';  
import { FiEdit, FiTrash2 } from 'react-icons/fi';


export function Motoristas() {
    const [motoristas, setMotoristas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState("")
    const [cpf_cnpj, setCpf_cnpj] = useState("")
    const [placa, setPlaca] = useState("")
    const [tipo_veiculo, setTipo_veiculo] = useState("")
    const [errors, setErrors] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [motoristaEditando, setMotoristaEditando] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [motoristaParaExcluir, setMotoristaParaExcluir] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => { 
      async function getAllMotoristas(){
        const response = await api.get("/motorista")
        setMotoristas(response.data)
      }
      getAllMotoristas()
    }, [isModalOpen, isEditModalOpen, isDeleteModalOpen])

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setFormSubmitted(false); // Reset do estado de submissão
        setNome("");
        setCpf_cnpj("");
        setPlaca("");
        setTipo_veiculo("");
        setErrors({});
    }

    function validarFormulario() {
        const novosErros = {};

        // Validação do nome
        if (!nome.trim()) {
            novosErros.nome = "Nome é obrigatório";
        } else if (nome.length < 3) {
            novosErros.nome = "Nome deve ter no mínimo 3 caracteres";
        }

        // Validação do CPF/CNPJ
        const cpfCnpjNumeros = cpf_cnpj.replace(/\D/g, '');
        if (!cpf_cnpj.trim()) {
            novosErros.cpf_cnpj = "CPF/CNPJ é obrigatório";
        } else if (cpfCnpjNumeros.length !== 11 && cpfCnpjNumeros.length !== 14) {
            novosErros.cpf_cnpj = "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos";
        }

        // Validação da placa
        const placaSemEspacos = placa.trim().toUpperCase();
        if (!placa.trim()) {
            novosErros.placa = "Placa é obrigatória";
        } else if (
            !/^[A-Z]{3}[0-9]{4}$/.test(placaSemEspacos) && // Formato antigo
            !/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placaSemEspacos) // Formato Mercosul
        ) {
            novosErros.placa = "Placa deve estar no formato ABC1234 ou ABC1D23";
        }

        // Validação do tipo de veículo
        if (!tipo_veiculo) {
            novosErros.tipo_veiculo = "Selecione um tipo de veículo";
        }

        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const handleNomeChange = (e) => {
        setNome(e.target.value);
        if (errors.nome) {
            setErrors(prev => ({ ...prev, nome: '' }));
        }
    };

    const handleCpfCnpjChange = (e) => {
        // Remove tudo que não é número
        let valor = e.target.value.replace(/\D/g, '');
        
        // Aplica máscara conforme quantidade de números
        if (valor.length <= 11) { // CPF
            valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
        } else { // CNPJ
            valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
        }
        
        setCpf_cnpj(valor);
        if (errors.cpf_cnpj) {
            setErrors(prev => ({ ...prev, cpf_cnpj: '' }));
        }
    };

    const handlePlacaChange = (e) => {
        // Converte para maiúsculo e remove espaços
        let valor = e.target.value.toUpperCase().replace(/\s/g, '');
        
        // Limita o tamanho máximo
        valor = valor.slice(0, 7);
        
        setPlaca(valor);
        if (errors.placa) {
            setErrors(prev => ({ ...prev, placa: '' }));
        }
    };

    const handleTipoVeiculoChange = (e) => {
        setTipo_veiculo(e.target.value);
        if (errors.tipo_veiculo) {
            setErrors(prev => ({ ...prev, tipo_veiculo: '' }));
        }
    };

    async function handleCreateMotorista(e) {
        e.preventDefault();
        setFormSubmitted(true); // Marca que houve tentativa de submissão
        
        if (!validarFormulario()) {
            return;
        }

        const cpfCnpjLimpo = cpf_cnpj.replace(/\D/g, '');

        const dadosMotorista = {
            name: nome,
            cpf_cnpj: cpfCnpjLimpo,
            placa: placa.toUpperCase(),
            tipo_veiculo: tipo_veiculo
        };

        try {
            await api.post("/motorista", dadosMotorista);
            toast.success("Motorista cadastrado com sucesso!");
            handleCloseModal();
        } catch (error) {
            // Verifica se existe uma mensagem de erro na resposta da API
            const mensagemErro = error.response?.data?.message || error.response?.data || "Erro ao cadastrar motorista. Tente novamente.";
            toast.error(mensagemErro);
        }
    }

    // Na exibição da tabela, formatar o CPF/CNPJ
    function formatarCpfCnpj(valor) {
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length === 11) {
            return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
        } else if (numeros.length === 14) {
            return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
        }
        return valor;
    }

    function handleOpenEditModal(motorista) {
        setMotoristaEditando(motorista);
        setNome(motorista.name);
        setCpf_cnpj(formatarCpfCnpj(motorista.cpf_cnpj));
        setPlaca(motorista.placa);
        setTipo_veiculo(motorista.tipo_veiculo);
        setIsEditModalOpen(true);
    }

    function handleCloseEditModal() {
        setIsEditModalOpen(false);
        setMotoristaEditando(null);
        // Limpar os campos
        setNome("");
        setCpf_cnpj("");
        setPlaca("");
        setTipo_veiculo("");
    }

    async function handleUpdateMotorista(e) {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }

        const cpfCnpjLimpo = cpf_cnpj.replace(/\D/g, '');

        const dadosMotorista = {
            name: nome,
            cpf_cnpj: cpfCnpjLimpo,
            placa: placa.toUpperCase(),
            tipo_veiculo: tipo_veiculo
        };

        try {
            await api.put(`/motorista/${motoristaEditando.id}`, dadosMotorista);
            toast.success("Motorista atualizado com sucesso!");
            handleCloseEditModal();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao atualizar motorista. Tente novamente.";
            toast.error(mensagemErro);
        }
    }

    function handleOpenDeleteModal(motorista) {
        setMotoristaParaExcluir(motorista);
        setIsDeleteModalOpen(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
        setMotoristaParaExcluir(null);
    }

    async function handleDeleteMotorista() {
        try {
            await api.delete(`/motorista/${motoristaParaExcluir.id}`);
            toast.success("Motorista excluído com sucesso!");
            handleCloseDeleteModal();
            // Remover esta linha que estava causando o erro
            // await loadMotoristas(); 
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao excluir motorista. Tente novamente.";
            toast.error(mensagemErro);
        }
    }

    return (
      <Section title={"Cadastro de Motoristas"}>
        <Container>
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
          <Button 
            title="Novo Motorista" 
            onClick={handleOpenModal}
          />
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF/CNPJ</th>
                  <th>PLACA</th>
                  <th>TIPO VEÍCULO</th>
                  <th>GERÊNCIA DE RISCO</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {motoristas.map(motorista => (
                  <tr key={motorista.id}>
                    <td>{motorista.name}</td>
                    <td>{formatarCpfCnpj(motorista.cpf_cnpj)}</td>
                    <td>{motorista.placa}</td>
                    <td>{motorista.tipo_veiculo}</td>
                    <td>{motorista.gerenciamento_risco}</td>
                    <td>
                      <ActionButtons>
                        <EditButton onClick={() => handleOpenEditModal(motorista)}>
                          <FiEdit />
                        </EditButton>
                        <DeleteButton onClick={() => handleOpenDeleteModal(motorista)}>
                          <FiTrash2 />
                        </DeleteButton>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          {isModalOpen && (
            <Modal 
              isOpen={isModalOpen} // Adicionar esta prop
              title="Cadastro de Motorista"
              onClose={handleCloseModal}
            >
              <Form onSubmit={handleCreateMotorista}>
                <Input 
                  placeholder="Nome completo"
                  type="text"
                  value={nome}
                  onChange={handleNomeChange}
                />
                {formSubmitted && errors.nome && <span className="error">{errors.nome}</span>}

                <Input 
                  placeholder="CPF/CNPJ"
                  type="text"
                  value={cpf_cnpj}
                  onChange={handleCpfCnpjChange}
                />
                {formSubmitted && errors.cpf_cnpj && <span className="error">{errors.cpf_cnpj}</span>}

                <Input 
                  placeholder="Placa"
                  type="text"
                  value={placa}
                  onChange={handlePlacaChange}
                />
                {formSubmitted && errors.placa && <span className="error">{errors.placa}</span>}

                <Select 
                  value={tipo_veiculo}
                  onChange={handleTipoVeiculoChange}
                >
                  <option value="">SELECIONE O TIPO DE VEÍCULO</option>
                  <option value="van refrigerada">VAN REFRIGERADA</option>
                  <option value="van seca">VAN SECA</option>
                  <option value="3/4 refrigerada">3/4 REFRIGERADA</option>
                  <option value="3/4 seca">3/4 SECA</option>
                </Select>
                {formSubmitted && errors.tipo_veiculo && <span className="error">{errors.tipo_veiculo}</span>}

                <ButtonContainer>
                  <Button 
                    title="Cancelar" 
                    type="button" 
                    onClick={handleCloseModal}
                  />
                  <Button 
                    title="Cadastrar" 
                    type="submit"
                  />
                </ButtonContainer>
              </Form>
            </Modal>
          )}

          {isEditModalOpen && (
            <Modal 
              isOpen={isEditModalOpen} // Correção aqui - estava usando isOpen indefinido
              onClose={handleCloseEditModal}
              title="Editar Motorista"
            >
              <Form onSubmit={handleUpdateMotorista}>
                <Input 
                  placeholder="Nome completo"
                  type="text"
                  value={nome}
                  onChange={handleNomeChange}
                />
                {errors.nome && <span className="error">{errors.nome}</span>}

                <Input 
                  placeholder="CPF/CNPJ"
                  type="text"
                  value={cpf_cnpj}
                  onChange={handleCpfCnpjChange}
                />
                {errors.cpf_cnpj && <span className="error">{errors.cpf_cnpj}</span>}

                <Input 
                  placeholder="Placa"
                  type="text"
                  value={placa}
                  onChange={handlePlacaChange}
                />
                {errors.placa && <span className="error">{errors.placa}</span>}

                <Select 
                  value={tipo_veiculo}
                  onChange={handleTipoVeiculoChange}
                >
                  <option value="">SELECIONE O TIPO DE VEÍCULO</option>
                  <option value="van refrigerada">VAN REFRIGERADA</option>
                  <option value="van seca">VAN SECA</option>
                  <option value="3/4 refrigerada">3/4 REFRIGERADA</option>
                  <option value="3/4 seca">3/4 SECA</option>
                </Select>
                {errors.tipo_veiculo && <span className="error">{errors.tipo_veiculo}</span>}

                <ButtonContainer>
                  <Button 
                    title="Cancelar" 
                    type="button" 
                    onClick={handleCloseEditModal}
                  />
                  <Button 
                    title="Salvar" 
                    type="submit"
                  />
                </ButtonContainer>
              </Form>
            </Modal>
          )}

          {isDeleteModalOpen && (
            <Modal 
              isOpen={isDeleteModalOpen} // Adicionar esta prop
              title="Confirmar Exclusão"
              onClose={handleCloseDeleteModal}
            >
              <p>Tem certeza que deseja excluir o motorista {motoristaParaExcluir?.name}?</p>
              <ButtonContainer>
                <Button 
                  title="Cancelar" 
                  type="button" 
                  onClick={handleCloseDeleteModal} 
                />
                <Button 
                  title="Excluir" 
                  type="button" 
                  onClick={handleDeleteMotorista}
                />
              </ButtonContainer>
            </Modal>
          )}
        </Container>
      </Section>
    )
}
