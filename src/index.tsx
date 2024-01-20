import 'bootstrap/scss/bootstrap.scss';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.scss';
import { store } from './store';

localStorage.setItem('reduxState', JSON.stringify(store.getState()));
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
ReactGA.initialize('UA-101216558-2');
