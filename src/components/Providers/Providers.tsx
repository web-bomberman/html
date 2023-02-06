import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from 'react-styled-alert';
import { TokenProvider } from 'contexts';
import { MUIThemeProvider } from 'themes';

export function Providers(props: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AlertProvider>
          <TokenProvider>
            <MUIThemeProvider>
              {props.children}
            </MUIThemeProvider>
          </TokenProvider>
        </AlertProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}