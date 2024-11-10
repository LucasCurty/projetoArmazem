// Função para formatar dados dos fretes
export function formatarDadosFretes(data, periodoInicial, periodoFinal) {
  return data
    .filter(frete => {
      if (!frete.data_frete || !(frete.frete_empresa || frete.frete_saida_motorista)) {
        return false;
      }
      const dataFrete = new Date(frete.data_frete);
      return dataFrete >= new Date(periodoInicial) && dataFrete <= new Date(periodoFinal);
    })
    .reduce((acc, frete) => {
      const dataFrete = new Date(frete.data_frete);
      const dia = dataFrete.getDate();
      const valorEmpresa = parseFloat(frete.frete_empresa) || 0;
      const valorMotorista = parseFloat(frete.frete_saida_motorista) || 0;

      const existingDia = acc.find(item => item.dia === dia);
      if (existingDia) {
        existingDia.valorFrete += valorEmpresa;
        existingDia.valorMotorista += valorMotorista;
        existingDia.quantidade += 1;
      } else {
        acc.push({ 
          dia, 
          valorFrete: valorEmpresa, 
          valorMotorista: valorMotorista,
          quantidade: 1 
        });
      }
      return acc;
    }, [])
    .sort((a, b) => a.dia - b.dia);
}

// Função para calcular dados mensais
export function calcularDadosMensais(fretes, periodoInicial, periodoFinal) {
  return fretes.reduce((acc, frete) => {
    const dataFrete = new Date(frete.data_frete);
    if (dataFrete >= new Date(periodoInicial) && dataFrete <= new Date(periodoFinal)) {
      const quantidadeVeiculos = acc.quantidadeVeiculos + 1;
      const pesoTotal = acc.pesoTotal + (parseFloat(frete.peso_total) || 0);
      const fatTotal = acc.fatTotal + (parseFloat(frete.frete_empresa) || 0);
      const custoTotal = acc.custoTotal + (parseFloat(frete.frete_saida_motorista) || 0);

      return {
        quantidadeVeiculos, 
        pesoTotal,
        fatTotal,
        encargos: acc.encargos + (parseFloat(frete.encargos) || 0),
        custoTotal,
        margemPeriodo: fatTotal - custoTotal,
        margemPeriodoEmPorcentagem: ((fatTotal - custoTotal) / fatTotal) * 100,
        pesoMedioVeiculo: pesoTotal / quantidadeVeiculos,
        fatMedioVeiculo: fatTotal / quantidadeVeiculos,
        custoMedioVeiculo: custoTotal / quantidadeVeiculos
      };
    }
    return acc;
  }, {
    quantidadeVeiculos: 0,
    pesoTotal: 0,
    fatTotal: 0,
    encargos: 0,
    custoTotal: 0,
    margemPeriodo: 0,
    margemPeriodoEmPorcentagem: 0,
    pesoMedioVeiculo: 0,
    fatMedioVeiculo: 0,
    custoMedioVeiculo: 0
  });
}

// Função para formatar valores monetários
export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}; 