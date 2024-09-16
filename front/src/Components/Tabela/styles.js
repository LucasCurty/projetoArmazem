import styled from 'styled-components';

export const MyTabela = styled.table`
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow-x: none;

    td, th{
        border: 1px solid ${({theme})=> theme.COLORS.BACKGROUND_800};
        padding: 5px;  
    }

    tr:nth-child(even){
        background-color:${({theme})=> theme.COLORS.BACKGROUND_700}
    }

    tr:hover {
        background-color: #ddd;
        color: black;
    }

    th {
        padding: 8px;
        text-align: left;
        background-color: ${({theme})=> theme.COLORS.ORANGE};
        color: white;
    }

`