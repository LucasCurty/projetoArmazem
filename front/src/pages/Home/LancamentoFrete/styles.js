import styled from "styled-components";


export const Frete = styled.main`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    > div, label{
      margin-bottom: 10px;
    }
    > .info{
        display: flex;
        flex-direction: row;
    }

    > .data{
        padding-right: 1rem;
        > label{
          color: ${({theme})=> theme.COLORS.ORANGE};
        }
        input[type=date]{
          margin-top: 10px;
          background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
          color: white;
          border: none;
          padding: 5px 10px;
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
        >div option{
          padding: 6px 10px;
          background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
          color: white;
          cursor: pointer;
        }
        >div option:hover{
          background-color: ${({theme})=> theme.COLORS.ORANGE};

        }
    }



    > div{
        display: flex;
        flex-direction: column;
        > label{
          color: ${({theme})=> theme.COLORS.ORANGE};
          flex-direction: column;
        }
      }

    input {
      background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
      border: none;
      color: white;
      padding: 8px;
      border-radius: 4px;
      
      &::placeholder {
        color: ${({theme})=> theme.COLORS.BACKGROUND_700};
      }
    }
`;

export const LancarFrete = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};

`;

export const Labels = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;

    > label{
      font-size: 1rem;
      color: ${({theme})=> theme.COLORS.ORANGE};
    }
    > p{
        font-size: 1rem;
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_700};
        padding: 3px 8px;
        margin: 5px 0;
        width: fit-content;
    }

    ul{
      display: flex;
      flex-direction: column;

      > li{
        > .tooltip {
          position: relative;
          display: inline-block;
          font-size: 1rem;
          padding: 3px 0;
          cursor: pointer;
        }
       
        > .tooltip .tooltiptext {
          visibility: hidden;
          width: max-content;
          background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
          color: #fff;
          padding: 5px;
          text-align: start;
          border-radius:6px;
          position: absolute;
          z-index: 1;
          left: 100%;
          margin-left: 60px;
          opacity: 0;
          transition: opacity 0.3s;
          > p span{
            color: ${({theme})=> theme.COLORS.ORANGE};
          }
        }
        > .tooltip:hover{
          background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
          
        }
        > .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      }
    }

  
`;
