import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ObserverProvider } from 'react-observer-implementation';
import { AlertProvider } from 'react-styled-alert';
import { LoadingProvider, TokenProvider } from 'contexts';
import { MUIThemeProvider } from 'themes';

export function Providers(props: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ObserverProvider>
        <AlertProvider>
          <TokenProvider>
            <LoadingProvider>
              <MUIThemeProvider>{props.children}</MUIThemeProvider>
            </LoadingProvider>
          </TokenProvider>
        </AlertProvider>
      </ObserverProvider>
    </BrowserRouter>
  );
}
