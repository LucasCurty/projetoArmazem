import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    letter-spacing: 1px;
    width: 100%;
    
    thead {
        background-color: ${({theme})=> theme.COLORS.ORANGE};
    }
    
    th, td {
        border: 1px solid rgb(160 160 160);
        padding: 6px 12px;
        white-space: nowrap;
    }
    th input{
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
        border: 1px solid ${({theme})=> theme.COLORS.ORANGE};
        color: ${({theme})=> theme.COLORS.WHITE};

        &::placeholder {
            color: ${({theme})=> theme.COLORS.WHITE};
            font-size: 14px;
            opacity: 0.7;
            padding-left: 10px;
        }
    }

    th select {
        background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
        color: ${({theme})=> theme.COLORS.WHITE};
        padding-left: 10px;
    }

    tbody {
        tr:hover {
            background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
        }

        span:hover {
            cursor: pointer;
        }

        .buttns {
            display: flex;
            gap: 12px;
            justify-content: flex-start;
            align-items: center;
            min-width: 80px;
            >div {
                > button {
                background: transparent;
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
           > button {
                background: transparent;
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
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    
`;