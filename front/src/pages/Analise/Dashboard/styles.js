import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  min-height: 100vh;

  > div{
    h2{
      color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }

    label{
      color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }
    
    input{
      border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_800};
    } 
  }
  

`;

export const ContentDiv = styled.div`
  background-color: #FFFFFF;
  border-radius: 8px;
  margin: 10px 0;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderDiv = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;