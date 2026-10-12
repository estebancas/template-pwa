import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './App';

const root = document.getElementById('app');
if (!root) throw new Error('Missing #app root element');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
registerSW({ immediate: true });
