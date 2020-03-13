import React from 'react'
import ReactGA from 'react-ga'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import { getDefaultState, parseQueryParams, isBookmarklet } from './helpers'
import App from './App'
import rootReducer from './store/reducers'

let preloadedState
const params = window.location.search

if (isBookmarklet(params)) {
  preloadedState = parseQueryParams(params)
} else if ('reduxState' in localStorage) {
  preloadedState = JSON.parse(localStorage.getItem('reduxState') || '')
} else {
  preloadedState = getDefaultState()
}

const store = createStore(rootReducer, preloadedState)

localStorage.setItem('reduxState', JSON.stringify(store.getState()))
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'))
ReactGA.initialize('UA-101216558-2')
ReactGA.pageview(window.location.pathname)
serviceWorker.register()
