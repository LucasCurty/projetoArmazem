import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  color: #000;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin: 0;
  }

  .date-inputs {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-size: 0.875rem;
        color: #666;
      }

      input, select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: #4B96FF;
        }
      }
    }
  }
`;

export const ContentDiv = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .frete-info {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }

  .coluna-esquerda,
  .coluna-direita {
    flex: 1;
  }

  .info-grupo {
    h3 {
      background: #000;
      color: #fff;
      padding: 8px;
      margin-bottom: 10px;
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background: #f5f5f5;
    margin-bottom: 4px;
  }

  .tabela-clientes {
    h3 {
      text-align: center;
      margin-bottom: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd;
      }

      th {
        background: #f0f0f0;
      }

      tr:nth-child(even) {
        background: #fafafa;
      }
    }
  }
`; 