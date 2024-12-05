import styled from "styled-components";

import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";




export const Container = styled.div`
    width: 100%;
    height: 88vh;

    display: flex;
    
`;

export const ContentMenu = styled.div`
    width: 20%;
    height: 88vh;
    max-width: 300px;
    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};
    display: flex;  
    flex-direction: column;
    justify-content: space-between;
    display: ${props => props.isOpen ? 'flex' : 'none'};   
    animation: showMenu 800ms ease;    
    
    @keyframes showMenu {
    from {
        opacity: 0;
        width: 0%;
    }
    to {
        opacity: 1;
        width: 30%;;
    }
}
`;
export const DivIcon = styled.div`
    position: relative;
`;

export const IconButtonLeft = styled(FiArrowLeft)`
    cursor: pointer;
    font-size: 1.6rem;
    position: absolute;
    top: 50%;
    background-color: ${({theme}) => theme.COLORS.ORANGE};
    border-radius: 50%;
`;

export const IconButtonRight = styled(FiArrowRight)`
    cursor: pointer;
    font-size: 1.6rem;
    position: absolute;
    top: 50%;
    background-color: ${({theme}) => theme.COLORS.ORANGE};
    border-radius: 50%;
`;

export const Content = styled.div`
    width: 100%;
    padding: 0 2rem;
    overflow-y: auto;
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

