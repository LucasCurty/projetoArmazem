import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TableContainer = styled.div`
    margin-top: 20px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
      background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
      color: ${({theme})=> theme.COLORS.ORANGE};
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    background-color: ${({theme})=> theme.COLORS.BACKGROUND_800};
    > h2 {
        color: ${({theme})=> theme.COLORS.ORANGE}; 
        padding-bottom: 15px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;

    .error {
        color: #ff0000;
        font-size: 12px;
        margin-top: -8px;
        margin-bottom: 8px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
  color: ${({theme})=> theme.COLORS.WHITE};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #666;
  }
  
  option {
    padding: 10px;
    font-size: 16px;
  }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

export const EditButton = styled.button`
    background: none;
    border: none;
    color: var(--blue-500);
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: var(--red-500);
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
`;
