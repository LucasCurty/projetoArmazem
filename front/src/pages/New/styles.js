import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
        "header"
        "content"
        "footer";

        .tags{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
`;

export const ContentTable = styled.section`
    grid-area: content;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 92%;
    height: 70vh;
    ;
    
    margin: 0 auto;
    >section  button{
        color: white;
        margin: 0;
        padding: 0;
        margin-bottom: 12px;
    }
    >div {
        position: relative;
        overflow-y: auto;
       
    }
    > input[type="file"] {
        font-family: sans-serif;
        color: ${({theme})=> theme.COLORS.GRAY_100};
    }
    
`;


export const BtnCadastrarNota = styled.button`
    background-color: ${({theme})=> theme.COLORS.ORANGE};
    color: ${({theme})=> theme.COLORS.WHITE};
    padding: 12px 24px;
    border-radius: 14px;
    border:  none;

    float: right;
    margin: 1rem 0;
    margin-right: 5rem;
`;

export const InputXml = styled.input`
    float: right;
    margin: 1rem 0;
    margin-right: 5rem;
`

export const Footer = styled.footer`
    display: absolute;
    bottom: 0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
`;