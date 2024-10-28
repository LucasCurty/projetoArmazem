import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    letter-spacing: 1px;
    width: 100%;
    
    > thead {
        background-color: ${({theme})=> theme.COLORS.ORANGE};
    }
    
    th,td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 16px;
        white-space: nowrap;
    }
     
    > th:hover {
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
    }

    span:hover {
        cursor: pointer;
    }

   > .buttns {
        display: flex;
        gap: 12px;
        justify-content: flex-start;
        align-items: center;
        min-width: 80px;
        
       > button {
            background: none;
            border: none;
            padding: 0;
            line-height: 0;
            cursor: pointer;
            
            > svg {
                width: 20px;
                height: 20px;
                color: ${({theme}) => theme.COLORS.WHITE};
                
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;