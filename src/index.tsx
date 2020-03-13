import * as React from 'react'
import * as ReactGA from 'react-ga'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import { getDefaultState, parseQueryParams, isBookmarklet } from './helpers'
import App from './App'
import rootReducer from './store/reducers'

const params = window.location.search
let persistedState

if (isBookmarklet(params)) {
  persistedState = parseQueryParams(params)
} else if ('reduxState' in localStorage) {
  persistedState = JSON.parse(localStorage.getItem('reduxState') || '')
} else {
  persistedState = getDefaultState()
}

const store = createStore(rootReducer,
  persistedState
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
