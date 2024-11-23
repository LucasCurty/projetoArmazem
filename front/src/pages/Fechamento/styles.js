import styled from "styled-components";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Container = styled.div`
    width: 100%;
    height: 88vh;

    display: flex;

    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};

   
`;

export const ContentMenu = styled.div`
    width: 20%;
    height: 88vh;
    max-width: 300px;

    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};
    display: flex;  
    flex-direction: column;
    justify-content: space-between;
    
`;
export const divIcon = styled.div`
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
    padding: 0 64px;
    overflow-y: auto;
    font-size: .8rem;
`;
