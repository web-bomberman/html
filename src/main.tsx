import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Providers, GlobalStyle } from 'components';
import '@fontsource/roboto';
import '@fontsource/bebas-neue';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <GlobalStyle />
    <App />
  </Providers>
)
