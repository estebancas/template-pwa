import './styles.css';
import { registerSW } from 'virtual:pwa-register';
import { mountApp } from './app';

const root = document.getElementById('app');
if (!root) throw new Error('Missing #app root element');
mountApp(root);
registerSW({ immediate: true });
