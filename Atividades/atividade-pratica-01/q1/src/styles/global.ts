import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html{
        height: 100%;
    }
    body{
        height: 100%;
        background-color: #fafafa;
        #root{
            height: 100%;
        }
    }
`;

export default GlobalStyle;
