import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";


export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    
`;

export const ContentMenu = styled.div`
    width: 100%;
    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};
    
`;
export const divIcon = styled.div`
    width: 100%;
    height: 100%;
`;
export const IconButton = styled(FiPlus)`
    cursor: pointer;
`;

export const Brand = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-width: 0px;
    border-bottom-style: solid;
    border-bottom-color: 1 ${({theme}) => theme.COLORS.BACKGROUND_700};


    > h1{
        font-size: 24px;
        color:  ${({theme}) => theme.COLORS.ORANGE};
    }
    `;


export const Content = styled.div`
    padding: 0 64px;
    overflow-y: auto;
    font-size: .8rem;
`;

export const NewNote = styled(Link)`
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.WHITE};

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;

    svg{
        margin-right: 8px;
    }
`;

