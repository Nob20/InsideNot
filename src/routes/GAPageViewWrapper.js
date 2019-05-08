import React, { Component } from 'react'
import ReactGA from 'react-ga'

export default function withTracker (WrappedComponent, options = {}) {
  const trackPage = (location) => {
    let trackLocation = location
    let isString = typeof trackLocation === 'string' || trackLocation instanceof String
    if (!isString) {
      if (window) {
        trackLocation = window.location.pathname + window.location.search
      } else {
        trackLocation = location.pathname || ''
      }
    }

    ReactGA.pageview(trackLocation)
  }

  const HOC = class extends Component {
    componentDidMount () {
      const page = this.props.location.pathname
      trackPage(page)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextProps.location)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }

  }
  HOC.propTypes = {
    location: React.PropTypes.object
  }

  return HOC
}
