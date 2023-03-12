import { Global, css } from '@emotion/react';
import reset from 'react-style-reset';

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${reset}

        :root {
          --mouse-x: 0px;
          --mouse-y: 0px;
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        #root {
          position: absolute;
          height: 100vh;
          width: 100vw;
        }
      `}
    />
  );
}
