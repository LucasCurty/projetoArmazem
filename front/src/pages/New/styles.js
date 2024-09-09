import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
        "header"
        "content";

        > main {
            grid-area: content;
            overflow-y: auto;
        }

        .tags{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        > .divInput{
        display: flex;
        align-items: center;
        width: 92%;

        margin: 0 auto;

        > input[type="file"] {
            font-family: sans-serif;
            color: ${({theme})=> theme.COLORS.GRAY_100};
        }
    }
`;

export const Form = styled.form`
    max-width: 550px;
    margin: 38px auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 36px;

        a{
            font-size: 20px;
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }
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