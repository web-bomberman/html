import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from 'react-styled-alert';
import { TokenProvider } from 'contexts';

export function Providers(props: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AlertProvider>
          <TokenProvider>
            {props.children}
          </TokenProvider>
        </AlertProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}