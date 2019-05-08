import { connect } from 'react-redux'
import React from 'react'

export function connectWithStore (WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent)
  return function (props) {
    return (<ConnectedWrappedComponent {...props} />)
  }
}
