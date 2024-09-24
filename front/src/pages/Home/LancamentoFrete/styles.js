import styled from "styled-components";

export const Frete = styled.main`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    > .info{
        display: flex;
        flex-direction: row;
    }
    > ul{
        width: 100%;
        max-height: 50px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
    }
`;
export const Labels = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    > label{
        color: ${({theme})=> theme.COLORS.ORANGE};
    }
    > p{
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
        padding-left: 1.2rem;
        margin: 5px 0;
    }
    > input {
        border: none;
        margin: 5px;
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
        color: white;
        padding-left: 1rem;
    }
    input[type=text]:focus {
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
    }
    > select{
        border: none;
        background-color: white;
        padding:2px 3px;
        font-weight: 600;
        border-radius: 3px;
        margin: 5px 0;

        > option{
        font-weight: 600;
            
        }
    }
    .nomeMoto{
        font-size: 1rem;
    }
`;

export const Tbody = styled.tbody`
    display: none;
    overflow-x: scroll;
    position: relative;


    td, th{
        border: 1px solid ${({theme})=> theme.COLORS.WHITE};
        padding: 5px;
    }
    tr{
        display: flex;
        flex-direction: row;
        margin-left: 180px;
        border: 1px solid black;

    }


`;
export const TheadBody = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({theme})=> theme.COLORS.ORANGE};
    width: 180px;
    position:absolute;
    
`;

export const DivTr = styled.div`
    display: flex;
    flex-direction: column;
    > td{
        white-space:nowrap;
        text-overflow: ellipsis;

    }
`