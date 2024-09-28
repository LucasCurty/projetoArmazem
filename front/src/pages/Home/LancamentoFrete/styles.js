import styled from "styled-components";

export const Frete = styled.main`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;

    > .info{
        display: flex;
        flex-direction: row;
    }

    > .data{
        padding-right: 1rem;
        > label{
            color: ${({theme})=> theme.COLORS.ORANGE};
            margin-bottom: 10px;
        }
    }

`;

export const InsertValues = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    gap: 1rem;

    > .infPlaca{
        display: flex;
        flex-direction: column;

        > div, label{
            color: ${({theme})=> theme.COLORS.ORANGE};
        }

        > ul{
            margin-top: 3px ;
            > li{
                padding: 5px 10px;
                background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
            }
            > li:hover{
                    background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
                    cursor: pointer;
                }    
            
        }
    }

    > .infFrete{
      display: flex;
      flex-direction: column;

      > div{
        display: flex;
        flex-direction: column;
        > label{
          color: ${({theme})=> theme.COLORS.ORANGE};
          flex-direction: column;
        }
      }
    .secondChildren{
        margin-top: 10px;
  }
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
        padding: 3px 8px;
        margin: 5px 0;
        width: fit-content;
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