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
    > span{
        padding: 1rem;
        border: 1px solid white;
        border-radius: 15px;
        position: absolute;
        top: 0;
        right: 15%;
    }
    > .sucess{
        background-color:  ${({theme})=> theme.COLORS.ORANGE};
        font-size: 1rem;

    }
    > .denid{
        background-color:  ${({theme})=> theme.COLORS.RED};
    }
`;

export const THead = styled.thead `
    background-color:  ${({theme})=> theme.COLORS.ORANGE};
`;

export const TBody = styled.tbody`
    .buttns{
        
        > button{
            font-size: 1rem;
            padding: 1px 3px;
            border: none;
            border-radius: 3px;
            color: ${({theme})=> theme.COLORS.BACKGROUND_800};
        }
        
        > button:hover{
        background-color: ${({theme})=> theme.COLORS.ORANGE};
        color: white;
        
        }
        >div .enviar:hover{
            background-color: ${({theme})=> theme.COLORS.ORANGE};
            color: white;
        }
        >div .cancel:hover{
            background-color: ${({theme})=> theme.COLORS.RED};
            color: white;

        }
    }
   
   > tr:hover{
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};

   }
   > tr td div {
        display: flex;
        justify-content: space-between;
        flex-direction: row;

        >select{
            border: none;
            border-radius: 6px;
            margin-right: 8px;
            background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
            color: white;

        }
        

        
    }

`;
