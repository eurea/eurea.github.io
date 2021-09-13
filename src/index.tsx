import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { isBookmarklet, parseQueryParams } from './helpers';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers';
import { RootState } from './store/types';

let preloadedState;
const params = window.location.search;

if (isBookmarklet(params)) {
  preloadedState = parseQueryParams(params) as RootState;
} else if ('reduxState' in localStorage) {
  preloadedState = JSON.parse(localStorage.getItem('reduxState') || '') as RootState;
}

const store = createStore(rootReducer, preloadedState);

localStorage.setItem('reduxState', JSON.stringify(store.getState()));
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
ReactGA.initialize('UA-101216558-2');
ReactGA.pageview(window.location.pathname);
serviceWorker.register();
