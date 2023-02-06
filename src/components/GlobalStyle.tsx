import { Global, css } from '@emotion/react';
import reset from 'react-style-reset';

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${reset}

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        #root {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
        } 
      `}
    />
  );
}