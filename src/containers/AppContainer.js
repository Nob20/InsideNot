import React, { Component } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class AppContainer extends Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    let { routes, store, history } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{ height: '100%' }}>
            <Router history={history} >
              {routes}
            </Router>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  routes: React.PropTypes.object,
  store: React.PropTypes.object,
  history: React.PropTypes.object
}

export default AppContainer
