import styled from 'styled-components';

export const CreateNota = styled.div`
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
    

    #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 92%;
        margin: 0 auto;
        margin-bottom: 1rem;
    }

    #customers td, #customers th {
    border: 1px solid ${({theme})=> theme.COLORS.BACKGROUND_800};
    padding: 7px;
    }

    #customers tr:nth-child(even){
        background-color:${({theme})=> theme.COLORS.BACKGROUND_700}
    }

    #customers tr:hover {
        background-color: #ddd;
        color: black;
    }

    #customers th {
    padding: 8px;
    text-align: left;
    background-color: ${({theme})=> theme.COLORS.ORANGE};
    color: white;
    }
`

export const InputXml = styled.input`
    float: right;
    margin: 1rem 0;
    margin-right: 5rem;
`
export const BtnCadastrarNota = styled.button`
    background-color: ${({theme})=> theme.COLORS.ORANGE};
    color: ${({theme})=> theme.COLORS.WHITE};
    padding: 12px 24px;
    border-radius: 14px;
    border:  none;

    float: right;
    margin: 1rem 0;
    margin-right: 5rem;
`