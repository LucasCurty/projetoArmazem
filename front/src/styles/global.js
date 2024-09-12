import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        ::-webkit-scrollbar{
            width: 12px;
        }
        ::-webkit-scrollbar-track {
            background: ${({theme}) => theme.COLORS.BACKGROUND_900};        /* color of the tracking area */
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${({theme}) => theme.COLORS.ORANGE};    /* color of the scroll thumb */
            border-radius: 20px;       /* roundness of the scroll thumb */
            border: 3px solid ${({theme}) => theme.COLORS.BACKGROUND_800};  /* creates padding around scroll thumb */
        }
    }
    body{
        background-color:${({theme}) => theme.COLORS.BACKGROUND_800};
        color:${({theme}) => theme.COLORS.WHITE};

        -webkit-font-smoothing:anstialiased;
    }
    body, input, button, textarea {
        font-family: "Roboto Slab", serif;
        font-size: 16px;
        outline: none;
    }
    a {
        text-decoration: none;
    }
    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }
    button:houver, a:houver {   
        filter: brightness(0.9);
    }
    ul, nav{
        list-style: none;
    }



`;