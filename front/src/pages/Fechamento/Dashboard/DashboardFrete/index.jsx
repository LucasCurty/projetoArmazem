import { useState, useEffect } from 'react';
import { ContentDiv, GridContainer, DashboardHeader } from './styles'
import { api } from '../../../../services/api'

export function DashboardFrete() {
  const [clienteSelecionado, setClienteSelecionado] = useState('todos');
  const [numeroFrete, setNumeroFrete] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [dadosFrete, setDadosFrete] = useState({
    cidades: [],
    quantEntregas: 0,
    quantNotas: 0,
    vlrMotorista: 0,
    descarga: 0,
    pesoTotal: 0,
    margem: 0,
    motorista: '',
    placa: '',
    tipoVeiculo: '',
    kmExtra: 0,
    valorKmExtra: 0,
    fatTotal: 0,
    custoTotal: 0,
    clientesInfo: []
  });
  
  async function handleApi(dados){
    setDadosFrete({
      cidade:  new Set(dados.notas.map(item => item.cidade)),
      quantEntregas: new Set(dados.notas.map(item => item.cidade)).size,
      quantNotas: dados.notas.map(item => item.length),
      vlrMotorista:dados.frete_saida_motorista,
      descarga: 0, // ainda sem descarga
      pesoTotal: dados.peso_total,
      margem: dados.frete_empresa - dados.frete_saida_motorista ,
      motorista: dados.motorista.name,
      placa: dados.motorista.placa,
      tipoVeiculo: dados.motorista.tipo_veiculo,
      kmExtra: dados.km_inicial - dados.km_final,
      valorKmExtra: 50,
      fatTotal: 0,
      custoTotal: 0,
      clientesInfo: dados.notas.map(nota => nota.client)

    })

    console.log(dadosFrete)
  }


  useEffect(() => {
    async function buscarDadosFrete() {

      try {
        if(numeroFrete){
          const response = await api.get(`fretes/${numeroFrete}`);
          handleApi(response.data);
          console.log("----------")
          console.log(response.data)
        }
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    buscarDadosFrete();
  }, [numeroFrete]);

  return (

      <GridContainer>
        <DashboardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2>Resumo Frete</h2>
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              {isMinimized ? '▼' : '▲'}
            </button>
          </div>
          
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
                <label>Número:</label>
                <input
                  type="number"
                  onChange={(e) => setNumeroFrete(e.target.value)}
                  placeholder="Digite um número"
                />
              </div>
            
            </div>
      
        
        </DashboardHeader>
     
        {!isMinimized && (
          <ContentDiv>
            {dadosFrete &&
            <>
            <div className="frete-info">
              <div className="coluna-esquerda">
                <div className="info-grupo">
                  <h3>FRETE</h3>
                  <div className="info-item">
                    <span>CIDADES</span>
                    <span>{dadosFrete.cidade}</span>
                  </div>
                  <div className="info-item">
                    <span>QUANT ENTREGAS</span>
                    <span>{dadosFrete.quantEntregas}</span>
                  </div>
                  <div className="info-item">
                    <span>QUANT NOTAS</span>
                    <span>{dadosFrete.quantNotas}</span>
                  </div>
                  <div className="info-item">
                    <span>VLR MOTORISTA</span>
                    <span>R$ {dadosFrete.vlrMotorista}</span>
                  </div>
                  <div className="info-item">
                    <span>DESCARGA</span>
                    <span>R$ {dadosFrete.descarga}</span>
                  </div>
                  <div className="info-item">
                    <span>PESO TOTAL (KG)</span>
                    <span>{dadosFrete.pesoTotal}</span>
                  </div>
                  <div className="info-item">
                    <span>MARGEM</span>
                  </div>
                </div>
              </div>

              <div className="coluna-direita">
                <div className="info-grupo">
                  <h3>DATA</h3>
                  <div className="info-item">
                    <span>MOTORISTA</span>
                    <span>{dadosFrete.motorista}</span>
                  </div>
                  <div className="info-item">
                    <span>PLACA</span>
                    <span>{dadosFrete.placa}</span>

                  </div>
                  <div className="info-item">
                    <span>TIPO VEICULO</span>
                    <span>{dadosFrete.tipoVeiculo}</span>

                  </div>
                  <div className="info-item">
                    <span>KM EXTRA</span>
                    <span>R$ {dadosFrete.kmExtra}</span>
                  </div>
                  <div className="info-item">
                    <span>VALOR KM EXTRA</span>
                    <span>R$ {dadosFrete.valorKmExtra}</span>
                  </div>
                  <div className="info-item">
                    <span>FAT TOTAL</span>
                  </div>
                  <div className="info-item">
                    <span>CUSTO TOTAL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tabela-clientes">
              <h3>PESO X FATURAMENTO POR CLIENTE</h3>
              <table>
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>PESO</th>
                    <th>VALOR FATURADO</th>
                    <th>VALOR NF</th>
                    <th>CUSTO CLIENTE</th>
                    <th>MARGEM</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
            </div>
            </>
            }
          </ContentDiv>
        )}
      </GridContainer>
 
  );
}
