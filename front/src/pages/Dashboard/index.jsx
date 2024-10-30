import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { api } from '../../../services/api';
import { Container, ContentDiv, GridContainer } from './styles'
import { Header } from '../../../Components/Header'; 

export function Dashboard(){
  const [data, setData] = useState([]);
  const [dadosMes, setDadosMes] = useState([]);

  // Função para formatar dados dos fretes
  function formatarDadosFretes(data) {
    return data
      .filter(frete => frete.data_frete && (frete.frete_empresa || frete.frete_saida_motorista))
      .reduce((acc, frete) => {
        const dataFrete = new Date(frete.data_frete);
        const mes = dataFrete.toLocaleString('pt-BR', { month: 'long' });
        const valorEmpresa = parseFloat(frete.frete_empresa) || 0;
        const valorMotorista = parseFloat(frete.frete_saida_motorista) || 0;

        const existingMes = acc.find(item => item.mes === mes);
        if (existingMes) {
          existingMes.valorFrete += valorEmpresa;
          existingMes.valorMotorista += valorMotorista;
          existingMes.quantidade += 1;
        } else {
          acc.push({ 
            mes, 
            valorFrete: valorEmpresa, 
            valorMotorista: valorMotorista,
            quantidade: 1 
          });
        }
        return acc;
      }, []);
  };

  // useEffect atualizado
  useEffect(() => {
    async function buscarDados() {
      await api.get('fretes')
        .then(response =>{ setData(response.data)})
        .then(async () => {
          const dadosFormatadosFretes = await formatarDadosFretes(data);
          setDadosMes(dadosFormatadosFretes);
        })
        .catch(erro => {
          console.error('Erro ao buscar dados:', erro);
        })
    }

    buscarDados();
  }, []);

  // Configurações do gráfico
  const lineChartData = {
    labels: dadosMes.map(d => d.mes),
    datasets: [
      {
        label: 'Valor do Frete Empresa',
        data: dadosMes.map(d => d.valorFrete),
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Valor do Frete Motorista', 
        data: dadosMes.map(d => d.valorMotorista),
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Dashboard de Fretes</h1>
        <GridContainer>
          <ContentDiv >
            <h2>Fretes por Mês</h2>
            <div style={{ height: '250px' }}>
              <Line 
                data={lineChartData} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </ContentDiv>
        </GridContainer>
      </Container>
    </>
  );
};
