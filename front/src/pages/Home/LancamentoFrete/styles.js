import styled from "styled-components";

export const Tbody = styled.tbody`
    display: flex;
    overflow-x: scroll;
    width: 74.5%;
    margin: 0 auto;
    margin-left: 275px;
    margin-top: -25px;

    user-select: none;
    td, th{
        border: 1px solid ${({theme})=> theme.COLORS.BACKGROUND_800};
        padding: 5px;  
    }

    tr:nth-child(even){
        background-color:${({theme})=> theme.COLORS.BACKGROUND_700}
    }

    >div{
        position: absolute;
        display: flex;
        flex-direction: column;
        
        margin-left: -225px;
        margin-top: 12px;
        background-color:${({theme})=> theme.COLORS.ORANGE};
        
        > th{
            text-align: end;
            width: 225px;
            border: 1pt solid ${({theme})=> theme.COLORS.BACKGROUND_900};
        }

    }
    tr{
        display: flex;
        flex-direction: column;
        margin: 12px 0px;
        text-align: center;
        > td{
            border: 1pt solid ${({theme})=> theme.COLORS.BACKGROUND_900};
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;