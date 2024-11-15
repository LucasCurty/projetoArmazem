import styled from "styled-components";

export const MenuStyled = styled.nav`
    grid-area: menu;

    background:  ${({theme}) => theme.COLORS.BACKGROUND_900};
    padding-top: 64px;
    padding-right: 2rem;
    text-align: end;

    display: flex;
    flex-direction: column;

    > a{
        font-size: 1.2rem;
        margin-bottom: 24px;
        color: white;
        
        :hover{
            color: ${({theme}) => theme.COLORS.ORANGE};
        }
    }
`;