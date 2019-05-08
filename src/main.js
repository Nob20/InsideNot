/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import { initializeApp } from './actions/initialize'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__PRELOADED_STATE__ || {}

delete window.__PRELOADED_STATE__

export const store = createStore(initialState)

window.reduxStore = store

// ========================================================
// Fix for "Unknown props onTouchTap"
// https://github.com/callemall/material-ui/issues/4670
// ========================================================
injectTapEventPlugin()

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

// Google Analytics
var host = window.location.hostname
if (host === 'www.insidenot.com') {
  ReactGA.initialize('UA-109818475-1')
} else {
  // set random id
  ReactGA.initialize('UA-107816475-1')
}

// Chat settings https://www.freshworks.com/live-chat-software/
_slaask.init('872ba035900b339124f406655814a340')

ReactGA.pageview(window.location.pathname + window.location.search)

let render = () => {
  const routes = require('./routes/index').default(store)

  const history = syncHistoryWithStore(browserHistory, store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} history={history} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

initializeApp()

// ========================================================
// Go!
// ========================================================
render()

