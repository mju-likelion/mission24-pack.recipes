import { createGlobalStyle } from 'styled-components';
import '../App.css';
const GlobalStyle = createGlobalStyle`
    *{
        body{
            margin : 0;
            color : #424242;
            overflow-x: hidden;
        }
        font-family: 'locus_sangsang';
        a {
            text-decoration: none;
        }
    }
`;

export default GlobalStyle;
