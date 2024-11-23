import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  color: #000;
`;

export const DashboardHeader = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 3fr 1fr 4%;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  border-radius: 8px;

  h2 {
    color: white;
    margin: 0;
  }
  button{
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    color: white;
  }
  button:hover{
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }
  .date-inputs {
    display: flex;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.8rem;
      flex-grow: 1;

      label {
        font-size: 0.875rem;
        color: white;
      }

      input, select {
        padding: 0.5rem;
        border: none;
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
      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
      color: #fff;
      padding: 8px;
      margin-bottom: 10px;
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
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