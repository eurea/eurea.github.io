import 'bootstrap/scss/bootstrap.scss';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { App } from './App';
import './index.scss';

createRoot(document.getElementById('root')!).render(<App />);
ReactGA.initialize('G-7TTRZ7GPVQ');
