import styled, { createGlobalStyle } from 'styled-components';

export const CustomSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: black;
`;

export const RomaneioContainer = styled.div`
  padding: 20px;
  background: white;

  @media print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 20px;
    background: white;
  }
`;

export const RomaneioHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  margin-bottom: 20px;
  color: black;

  >  .logo {
    text-align: center;
    color: white;
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > .titulo {
    text-align: center;
    h1 {
      margin-bottom: 8px;
    }
  }

  > .numero-frete {
    text-align: right;
  }

  > .data-hora {
    margin-top: 10px;
    p {
      margin: 5px 0;
    }
  }
`;

export const InfoMotorista = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;

  > .info-item {
    color: black;
    label {
      font-weight: bold;
      margin-right: 8px;
    }
  }
`;

export const NotasTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
  
   thead {
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    color: white;
  }

  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

`;

export const TimeInput = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TotalRow = styled.tr`
  td:first-child {
    text-align: right;
    font-weight: bold;
    background-color: #FFD700;
  }

  td:last-child {
    font-weight: bold;
  }
`;

export const DeclaracaoContainer = styled.div`
  margin: 20px 0;
  text-align: center;
  color: black;
`;

export const DeclaracaoTexto = styled.p`
  margin: 10px 0;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ObservacaoContainer = styled.div`
  color: black;
  border: 1px solid black;
  padding: 10px;
  margin: 20px 0;
`;

export const ObservacaoTitulo = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ObservacaoConteudo = styled.div`
  min-height: 100px;
`;

export const PrintButton = styled.button`
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 0;

    &:hover {
        background: #0056b3;
    }
`;

export const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body * {
      visibility: hidden;
    }
    
    .romaneio-container, 
    .romaneio-container * {
      visibility: visible;
    }
    
    .romaneio-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
    }
    
    .no-print {
      display: none !important;
    }

    /* Remove cabeçalhos e rodapés do navegador */
    html {
      -webkit-print-color-adjust: exact;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;