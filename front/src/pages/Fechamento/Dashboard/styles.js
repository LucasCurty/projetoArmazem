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
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: black;

  transition: all 0.3s ease;
  overflow: hidden;

  max-height: 2000px;
  opacity: 1;
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;

  &.minimized {
    max-height: 0;
    opacity: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  .info-mensal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .info-item {
      padding: 1rem;
      background: #f8f9fa;
      color: black;
      border-radius: 6px;
      text-align: center;

      h3 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
      }
    }
  }

  .analytic-results {
    .metrics-summary {
      margin-bottom: 2rem;

      h3 {
        margin-bottom: 1rem;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        color: black;

        .metric-item {
          h4 {
            margin-bottom: 1rem;
          }

          ul {
            list-style: none;
            padding: 0;

            li {
              display: flex;
              justify-content: space-between;
              margin-bottom: 0.5rem;
              padding: 0.5rem;
              color: white;
              background: ${({ theme }) => theme.COLORS.BACKGROUND_700} ;
              border-radius: 4px;

              span {
                font-weight: 500;
              }
            }
          }
        }
      }
    }

    .vehicle-types {
      h3 {
        margin-bottom: 1rem;
      }

      .vehicle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;

        h4 {
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            border-radius: 4px;
            color: white;
            background: ${({ theme }) => theme.COLORS.BACKGROUND_700} ;
            > span {
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .toggle-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 10px;
    
    &:hover {
      opacity: 0.7;
    }
  }

  .grafico-container {
    width: 100%;
  }
`;

export const HeaderDiv = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    color: #333;
    margin: 0;
  }
  
  button {
      padding: 0.5rem 1rem;
      background: ${({ theme }) => theme.COLORS.ORANGE};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
      }
    }

  .date-inputs {
    display: flex;
    gap: 1rem;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      label {
        font-weight: 500;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  min-width: 100px;
  background-color: #FF9000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

