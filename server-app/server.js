/* eslint-disable max-len */
import Express from 'express'
import ReactDomServer from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import { RouterContext, match } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createStore from '../src/store/createStore'
import { Helmet } from 'react-helmet'

const fs = require('fs')

var indexFileContents = fs.readFileSync('ui-index.html', 'utf8')

const initialState = require('./initial-state')
const app = Express()
const port = 3001

global.navigator = global.navigator || {}
global.navigator.userAgent = 'all'

// Serve static files
app.use(Express.static('.'))

// This is fired every time the server side receives a request
app.use(handleRender)

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', function (err) {
  console.error(err)
  console.log('Node NOT Exiting...')
})

function renderFullPage (html, preloadedState, helmet) {
  return indexFileContents
    .replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
    .replace(`<!--react-helmet-meta-tags-->`, helmet && helmet.meta && helmet.meta.toString())
    .replace(`<!--preloaded-state-place-holder-->`,
      `<script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>`
    )
}

function handleRender (req, res) {
  // Create a new Redux store instance
  const store = createStore(initialState)

  const routes = require('../src/routes/index').default(store)

  let history = createMemoryHistory()

  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    function getReduxPromise () {
      let { query, params, routes } = renderProps

      const childRoute = routes.length > 1 && routes[1]
      const fetchDataPromise = childRoute && childRoute.fetchData ? childRoute.fetchData({ query, params, store, history }) : Promise.resolve()

      return fetchDataPromise
    }

    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.send(500, error.message)
    } else if (renderProps == null) {
      res.send(404, 'Not found')
    } else {
      getReduxPromise().then(() => {
        let reduxState = JSON.stringify(store.getState())
        let html = ReactDomServer.renderToString(
          <Provider store={store}>
            <MuiThemeProvider>
              <div style={{ height: '100%' }}>
                <RouterContext {...renderProps} />
              </div>
            </MuiThemeProvider>
          </Provider>

        )
        const helmet = Helmet.renderStatic()
        res.send(renderFullPage(html, reduxState, helmet))
      })
    }
  })
}

app.listen(port)

