import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 105px 128px auto 64px;
    grid-template-areas: 
    "brand header"
    "menu content"
    "menu content"
    "newnote content";

    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};

`;

export const Menu = styled.nav`
    grid-area: menu;

    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};
    padding-top: 64px;
    padding-right: 2rem;
    text-align: end;

    display: flex;
    flex-direction: column;

    > a{
        margin-bottom: 24px;
        color: white;
        
        :hover{
            color: ${({theme}) => theme.COLORS.ORANGE};
        }
    }
`;

export const Brand = styled.div`
    grid-area: brand;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-width: 0px;
    border-bottom-style: solid;
    border-bottom-color: 1 ${({theme}) => theme.COLORS.BACKGROUND_700};

    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};

    > h1{
        font-size: 24px;
        color:  ${({theme}) => theme.COLORS.ORANGE};
    }
    `;


export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow-y: auto;
    font-size: .8rem;
`;

export const NewNote = styled(Link)`
    grid-area: newnote;
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.BACKGROUND_900};

    display: flex;
    justify-content: center;
    align-items: center;

    svg{
        margin-right: 8px;
    }
`;
