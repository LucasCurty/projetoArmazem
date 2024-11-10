import { useState, useEffect } from 'react';
import { Section } from '../../../Components/Section';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,ArcElement,} from 'chart.js';
import { DashboardFrete } from './DashboardFrete';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import { api } from '../../../services/api'
import {  ContentDiv, GridContainer, DashboardHeader } from './styles'
import { formatarDadosFretes, calcularDadosMensais, formatarMoeda } from './controle.dashboard';

export function Dashboard(){
  const [data, setData] = useState([]);
  const [dadosMes, setDadosMes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Adicionar novos estados para as informações mensais
  const [infoMensal, setInfoMensal] = useState({
    quantidadeVeiculos: 0,
    pesoTotal: 0,
    fatTotal: 0,
    encargos: 0,
    custoTotal: 0,
    margemPeriodo: 0,
    margemPeriodoEmPorcentagem: 0,
    pesoMedioVeiculo: 0,
    fatMedioVeiculo: 0,
    custoMedioVeiculo: 0,
  });
  // Adicione estes estados no início do componente
  const [periodoInicial, setPeriodoInicial] = useState(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0]);
  const [periodoFinal, setPeriodoFinal] = useState(new Date().toISOString().split('T')[0]);
  // Adicionar novo estado para mês selecionado
  const [dadosAnaliticos, setDadosAnaliticos] = useState({
    veiculosSecos: {
      fiorino: 0,
      van: 0,
      tresQuartos: 0,
      toco: 0,
      truck: 0
    },
    veiculosRefrigerados: {
      fiorino: 0,
      van: 0,
      tresQuartos: 0,
      toco: 0,
      truck: 0
    },
    resumo: {
      quantVeiculos: 0,
      pesoTotal: 0,
      fatTotal: 0,
    }
  });
  // Adicionar novo estado para cliente selecionado
  const [clienteSelecionado, setClienteSelecionado] = useState('todos');

  // Adicionar novo estado para controlar seções minimizadas
  const [secoesMinimizadas, setSecoesMinimizadas] = useState({
    gridContainer: true
  });

  // Simplificar para apenas controlar o grid
  const toggleGrid = () => {
    setSecoesMinimizadas(prev => ({
      ...prev,
      gridContainer: !prev.gridContainer
    }));
  };

  // useEffect atualizado - simplificado
  useEffect(() => {
    async function buscarDados() {
      try {
        const response = await api.get('fretes');
        setData(response.data);
        
        const dadosFormatadosFretes = await formatarDadosFretes(response.data, periodoInicial, periodoFinal);
        setDadosMes(dadosFormatadosFretes);
        
        const infoCalculada = await calcularDadosMensais(response.data, periodoInicial, periodoFinal);
        setInfoMensal(infoCalculada);
        
        // Atualizar diretamente o estado dadosAnaliticos com os dados do response
        const fretesFiltrados = response.data.filter(frete => {
          const dataFrete = new Date(frete.data_frete);
          return dataFrete >= new Date(periodoInicial) && dataFrete <= new Date(periodoFinal);
        });

        setDadosAnaliticos(prev => {
          const novosDados = { ...prev };
          fretesFiltrados.forEach(frete => {
            const tipo = frete.refrigerado ? 'veiculosRefrigerados' : 'veiculosSecos';
            const tipoVeiculo = frete.tipo_veiculo;
            
            if (novosDados[tipo][tipoVeiculo] !== undefined) {
              novosDados[tipo][tipoVeiculo]++;
            }
            
            novosDados.resumo.quantVeiculos++;
            novosDados.resumo.pesoTotal += Number(frete.peso || 0);
            novosDados.resumo.fatTotal += Number(frete.valor || 0);
          });
          return novosDados;
        });
        
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    }

    buscarDados();
  }, [loading, periodoInicial, periodoFinal]);

  // Configurações do gráfico
  const lineChartData = {
    labels: dadosMes.map(d => `Dia ${d.dia}`),
    datasets: [
      {
        label: 'Valor do Frete Empresa',
        data: dadosMes.map(d => d.valorFrete),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true
      },
      {
        label: 'Valor do Frete Motorista',
        data: dadosMes.map(d => d.valorMotorista),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.1,
        fill: true
      }
    ]
  };

  // Atualizar opções do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Fretes - ${periodoInicial} a ${periodoFinal}`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatarMoeda(value);
          }
        }
      }
    }
  };

  return (
    <Section title="Dashboard de Fretes">
      <GridContainer>
        <DashboardHeader>
          <h2>Resumo Mensal</h2>
          <div className="date-inputs">
            <div>
              <label>Cliente:</label>
              <select 
                value={clienteSelecionado} 
                onChange={(e) => setClienteSelecionado(e.target.value)}
              >
                <option value="todos">Todos os Clientes</option>
                <option value="tirol">Tirol</option>
                <option value="cooperaliança">Cooperaliança</option>
                <option value="danone">Danone</option>
              </select>
            </div>
            <div>
              <label>Data Inicial:</label>
              <input
                type="date"
                value={periodoInicial}
                onChange={(e) => setPeriodoInicial(e.target.value)}
              />
            </div>
            <div>
              <label>Data Final:</label>
              <input
                type="date"
                value={periodoFinal}
                onChange={(e) => setPeriodoFinal(e.target.value)}
              />
            </div>
          </div>
          <button onClick={toggleGrid} className="toggle-button">
            {secoesMinimizadas.gridContainer ? '▼' : '▲'}
          </button>
        </DashboardHeader>
     
        <ContentDiv className={secoesMinimizadas.gridContainer ? 'minimized' : ''}>
          <div className="grafico-container">
            <h2>Gráfico de Fretes</h2>
            <div style={{ height: '250px' }}>
              <Line data={lineChartData} options={options} />
            </div>
          </div>
          <br />
          <h2>Consulta Analítica Geral</h2>
          <div className="analytic-results">
            <div className="metrics-summary">
              <h3>MÉTRICAS DO PERÍODO</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <h4>Métricas Gerais</h4>
                  <ul>
                      <li>Quantidade de Veículos: <span>{infoMensal.quantidadeVeiculos}</span></li>
                      <li>Peso Total: <span>{infoMensal.pesoTotal.toFixed(2)} kg</span></li>
                      <li>Faturamento Total: <span>{formatarMoeda(infoMensal.fatTotal)}</span></li>
                      <li>Custo Total: <span>{formatarMoeda(infoMensal.custoTotal)}</span></li>
                      <li>Encargos: <span>{formatarMoeda(infoMensal.encargos)}</span></li>
                  </ul>
                </div>
                <div className="metric-item">
                  <h4>Métricas de Performance</h4>
                  <ul>
                    <li>Margem do Período: <span>{formatarMoeda(infoMensal.margemPeriodo)}</span></li>
                    <li>Margem (%): <span>{infoMensal.margemPeriodoEmPorcentagem.toFixed(2)}%</span></li>
                    <li>Peso Médio por Veículo: <span>{infoMensal.pesoMedioVeiculo.toFixed(2)} kg</span></li>
                    <li>Faturamento Médio por Veículo: <span>{formatarMoeda(infoMensal.fatMedioVeiculo)}</span></li>
                    <li>Custo Médio por Veículo: <span>{formatarMoeda(infoMensal.custoMedioVeiculo)}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="vehicle-types">
              <h3>TIPOS VEÍCULOS EMBARCADOS - {clienteSelecionado.toUpperCase()}</h3>
              <div className="vehicle-grid">
                <div>
                  <h4>Veículos Secos</h4>
                  <ul>
                    <li>FIORINO SECA: {dadosAnaliticos.veiculosSecos.fiorino}</li>
                    <li>VAN SECA: {dadosAnaliticos.veiculosSecos.van}</li>
                    <li>3/4 SECO: {dadosAnaliticos.veiculosSecos.tresQuartos}</li>
                    <li>TOCO SECO: {dadosAnaliticos.veiculosSecos.toco}</li>
                    <li>TRUCK SECO: {dadosAnaliticos.veiculosSecos.truck}</li>
                  </ul>
                </div>
                <div>
                  <h4>Veículos Refrigerados</h4>
                  <ul>
                    <li>FIORINO REFRIGERADO: {dadosAnaliticos.veiculosRefrigerados.fiorino}</li>
                    <li>VAN REFRIGERADA: {dadosAnaliticos.veiculosRefrigerados.van}</li>
                    <li>3/4 REFRIGERADO: {dadosAnaliticos.veiculosRefrigerados.tresQuartos}</li>
                    <li>TOCO REFRIGERADO: {dadosAnaliticos.veiculosRefrigerados.toco}</li>
                    <li>TRUCK REFRIGERADO: {dadosAnaliticos.veiculosRefrigerados.truck}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ContentDiv>
      </GridContainer>

      <DashboardFrete />
    </Section>
  );
};
