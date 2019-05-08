import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import React, { Component } from 'react'
import _ from 'lodash'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

function VisibleOnlyFor (WrappedComponent, predicate) {
  let ProxyComponent = class Any extends Component {
    render () {
      const state = this.props.storeState
      const loggedInUser = state.login && state.login.loggedInUser
      if (predicate(loggedInUser)) {
        return <WrappedComponent {...this.props} />
      } else {
        return null
      }
    }
  }

  ProxyComponent.propTypes = {
    storeState: React.PropTypes.object
  }

  return ProxyComponent
}

export const VisibleOnlyToCreator = UserAuthWrapper({
  authSelector: (state) => {
    return state.loggedInUser
  },
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: (user) => {
    return true
  },
  FailureComponent: null
})

export const VisibleOnlyToRole = (WrappedComponent, role) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return loggedInUser && loggedInUser.user && loggedInUser.user.roles.indexOf(role) > -1
  })
}

export const VisibleOnlyToRoles = (WrappedComponent, roles) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return loggedInUser && loggedInUser.user && _.intersection(loggedInUser.user.roles, roles).length > 0
  })
}

export const VisibleToNotRole = (WrappedComponent, role) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return loggedInUser && loggedInUser.user && loggedInUser.user.roles.indexOf(role) < 0
  })
}

export const VisibleOnlyToUser = (WrappedComponent, userId) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return loggedInUser && loggedInUser.user && loggedInUser.user.id === userId
  })
}

export const VisibleOnlyToLoggedInUser = (WrappedComponent) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return loggedInUser && loggedInUser.user && loggedInUser.user.id
  })
}

export const VisibleOnlyToNonLoggedInUsers = (WrappedComponent) => {
  return VisibleOnlyFor(WrappedComponent, (loggedInUser) => {
    return !loggedInUser
  })
}
