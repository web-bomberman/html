import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ObserverProvider } from 'react-observer-implementation';
import { AlertProvider } from 'react-styled-alert';
import { TokenProvider } from 'contexts';
import { MUIThemeProvider } from 'themes';

export function Providers(props: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ObserverProvider>
          <AlertProvider>
            <TokenProvider>
              <MUIThemeProvider>
                {props.children}
              </MUIThemeProvider>
            </TokenProvider>
          </AlertProvider>
        </ObserverProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}