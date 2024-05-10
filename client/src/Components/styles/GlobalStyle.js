import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Montserrat', sans-serif;
  }

  :root {
    --primary-color: #222260;
    --primary-color2: color: rgba(34,34,96, .6);
    --primary-color3: color: rgba(34,34,96, .4);
    --primary-green: #42AD00;
    --primary-green: #aaa;
    --color-accent: #F56692;
    --color-delete: #FF0000;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: rgba(34, 34, 96, .6);
    overflow: hidden;
    font-size: clamp(0.8rem, 1vw, 1rem);
  }
  .error{
    color:red;
    animation: shake 0.5s ease-in-out;
    @keyframes shake{
      0%{
        transform:translateX(0);
      }
      25%{
        transform:translateX(10px);
      }
      50%{
        transform:translateX(-10px);
      }
      75%{
        transform:translateX(10px);
      }
      100%{
        transform:translateX(0);
      }
    }

  }
`;
