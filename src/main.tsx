import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Providers } from 'components';
import '@fontsource/roboto';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <App />
  </Providers>
)
