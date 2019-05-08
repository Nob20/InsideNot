import React, { Component } from 'react'
import SimpleMap from './googlemap/googlemap'
import './location.scss'

class Location extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const location = this.props.location
    // var initialCenter = {lat: 45.304772, lng: -75.891355};
    var initialCenter = { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }
    return (
      <div className='mapcontainer'>
        <div className='map'>
          <SimpleMap center={initialCenter} />
        </div>
      </div>
    )
  }
}

Location.propTypes = {
  location: React.PropTypes.object
}

export default Location
