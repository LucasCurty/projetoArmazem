import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    letter-spacing: 1px;
    width: 100%;
    overflow-y: scroll;
    
    th,td {
         border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
    }
`;

export const THead = styled.thead `
    background-color:  ${({theme})=> theme.COLORS.ORANGE};
`;

export const TBody = styled.tbody`
   
   > tr:hover{
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};

   }

`;