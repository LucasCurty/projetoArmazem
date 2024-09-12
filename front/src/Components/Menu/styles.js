import styled from "styled-components";

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