import { Section } from '../../../Components/Section';
import { useState, useEffect } from 'react'
import { 
    Container,
    TableContainer, 
    Table, 
    Modal, 
    ModalContent, 
    Form, 
    ButtonContainer,
    Select 
} from './styles';
import { Input } from '../../../Components/Input'
import { Button } from '../../../Components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../../../services/api';  

export function Motoristas() {
    const [motoristas, setMotoristas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [nome, setNome] = useState("")
    const [cpf_cnpj, setCpf_cnpj] = useState("")
    const [placa, setPlaca] = useState("")
    const [tipo_veiculo, setTipo_veiculo] = useState("")
    const [errors, setErrors] = useState({});

    useEffect(() => { 
      async function getAllMotoristas(){
        const response = await api.get("/motorista")
        setMotoristas(response.data)
      }
      getAllMotoristas()
    }, [isModalOpen])

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        // Limpar os campos do formulário
        setNome("")
        setCpf_cnpj("")
        setPlaca("")
        setTipo_veiculo("")
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
          <button onClick={handleOpenModal}>Novo Motorista</button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF/CNPJ</th>
                  <th>PLACA</th>
                  <th>TIPO VEÍCULO</th>
                  <th>GERÊNCIA DE RISCO</th>
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          {isModalOpen && (
            <Modal>
              <ModalContent>
                <h2>Cadastro de Motorista</h2>
                <Form onSubmit={handleCreateMotorista}>
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
                  {errors.api && <span className="error">{errors.api}</span>}

                  <ButtonContainer>
                    <Button title="Cancelar" type="button" onClick={handleCloseModal} />
                    <Button title="Cadastrar" type="submit" />
                  </ButtonContainer>
                </Form>
              </ModalContent>
            </Modal>
          )}
        </Container>
      </Section>
    )
}
