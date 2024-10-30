import { useState, useEffect } from "react";
import { Section } from "../../../Components/Section";
import { FiPrinter } from 'react-icons/fi'
import { api } from "../../../services/api";
import { GlobalStyle } from '../../../styles/global';

import { CustomSelect, RomaneioContainer, RomaneioHeader, InfoMotorista, NotasTable, TimeInput, TotalRow, DeclaracaoContainer, DeclaracaoTexto, ObservacaoContainer, ObservacaoTitulo, ObservacaoConteudo, PrintButton } from "./styles";

export function Romaneio() {
    const [numeroFrete, setNumeroFrete] = useState('');
    const [fretes, setFretes] = useState([]);
    const [freteSelecionado, setFreteSelecionado] = useState(null);

    // Simula busca de fretes - substitua por sua chamada API real
    useEffect(() => {
        const buscarFretes = async () => {
            try {
                // Substitua por sua URL da API
                await api.get('fretes')
                .then(response => setFretes(response.data))
            } catch (error) {
                console.error('Erro ao buscar fretes:', error);
            }
        };

        buscarFretes();
    }, []);

    // Função para buscar detalhes do frete selecionado
    const buscarDetalhesFrete = async (id) => {
        try {
            // Substitua por sua URL da API
            await api.get(`fretes/${id}`)
            .then(response => setFreteSelecionado(response.data))            
        } catch (error) {
            console.error('Erro ao buscar detalhes do frete:', error);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <GlobalStyle />
            <Section title="Romaneio">
                <CustomSelect 
                    className="no-print"
                    value={numeroFrete}
                        onChange={(e) => {
                            setNumeroFrete(e.target.value);
                            buscarDetalhesFrete(e.target.value);
                        }}
                    >
                        <option value="">Selecione um frete</option>
                        {fretes.map((frete) => (
                            <option key={frete.id} value={frete.id}>
                                {`Frete ${frete.id} - ${[...new Set(frete.notas.map(nota => nota.client))].join(', ')}`}
                            </option>
                        ))}
                </CustomSelect>

                {freteSelecionado && (
                    <>
                        <PrintButton onClick={handlePrint} className="no-print">
                            <FiPrinter />
                        </PrintButton>
                        <RomaneioContainer className="romaneio-container">
                            <RomaneioHeader>
                                <div className="logo">
                                   <h1>AgnusLog</h1>
                                </div>
                                <div className="titulo">
                                    <h1>ROMANEIO DE CARGAS</h1>
                                    <p>Rua do Braz, 320 - Cambé - Paraná</p>
                                </div>
                                <div className="numero-frete">
                                    <h2>{`Frete ${[...new Set(freteSelecionado.notas.map(nota => nota.client))].join(', ')} ${freteSelecionado.id}`}</h2>
                                <div className="data-hora">
                                    <p>Data Roterização: {new Date().toLocaleDateString()}</p>
                                    <p>Data Frete: {freteSelecionado.data_frete.toString().split('T')[0]}</p>
                                    <p>Hora Embarque: {
                                      <TimeInput 
                                        type="time" 
                                        defaultValue="05:00"
                                      />}</p>
                                </div>
                                </div>
                            </RomaneioHeader>

                            <InfoMotorista>
                                <div className="info-item">
                                    <label>MOTORISTA:</label>
                                    <span>{freteSelecionado.motorista?.name}</span>
                                </div>
                                <div className="info-item">
                                    <label>PLACA:</label>
                                    <span>{freteSelecionado.motorista?.placa}</span>
                                </div>
                                <div className="info-item">
                                    <label>CPF:</label>
                                    <span>{freteSelecionado.motorista?.cpf_cnpj}</span>
                                </div>
                                <div className="info-item">
                                    <label>ENTREGAS:</label>
                                    <span>{[...new Set(freteSelecionado.notas?.map(nota => nota.endereco_destinatario))].length || 0}</span>
                                </div>
                            </InfoMotorista>

                            <NotasTable>
                                <thead>
                                    <tr>
                                        <th>NOTA FISCAL</th>
                                        <th>DESTINATÁRIO</th>
                                        <th>ENDEREÇO</th>
                                        <th>CIDADE</th>
                                        <th>PESO</th>
                                        <th>SIM</th>
                                        <th>NÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {freteSelecionado.notas?.map((nota) => (
                                        <tr key={String(nota.numero_nota)}>
                                            <td>{nota.numero_nota}</td>
                                            <td>{nota.destinatario}</td>
                                            <td>{nota.endereco_destinatario}</td>
                                            <td>{nota.cidade}</td>
                                            <td>{nota.peso}</td>
                                            <td>{nota.confirmado === 'sim' ? '✓' : ''}</td>
                                            <td>{nota.confirmado === 'nao' ? '✓' : ''}</td>
                                        </tr>
                                    ))}
                                    {freteSelecionado.notas?.length < 10 && (
                                        <>
                                            {[...Array(17)].map((_, index) => (
                                                <tr key={index}>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                    <TotalRow>
                                        <td colSpan="4">
                                            PESO TOTAL
                                        </td>
                                        <td colSpan="3">
                                            {freteSelecionado.notas?.reduce((total, nota) => total + Number(nota.peso), 0).toFixed(2)} KG
                                        </td>
                                    </TotalRow>
                                </tbody>
                            </NotasTable>

                            <DeclaracaoContainer>
                                <DeclaracaoTexto>
                                    Estou ciente que todos produtos relacionado as notas fiscais<br />
                                    mencionadas acima estão sobre minha total responsabilidade, sendo que<br />
                                    eu mesmo realizei a conferencia e estou certo que os produtos estão sob<br />
                                    perfeitas condições e sem divergencias<br />
                                    (faltas, sobras, avarias ou fora de temperatura padrão)
                                </DeclaracaoTexto>
                            </DeclaracaoContainer>

                            <ObservacaoContainer>
                                <ObservacaoTitulo>Observação:</ObservacaoTitulo>
                                <ObservacaoConteudo />
                            </ObservacaoContainer>
                        </RomaneioContainer>
                    </>
                )}
            </Section>
        </>
    );
}  