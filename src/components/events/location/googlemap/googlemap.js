import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import './googlemap.scss'

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
  >
    {props.markers.map(marker => (
      <Marker {...marker} />
    ))}
  </GoogleMap>
))

export default class SimpleMap extends React.Component {

  state = {
    markers: [{
      position: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      key: `insideNot`,
      defaultAnimation: 2
    }]
  };

  render () {
    return (
      <div className='fullHeight'>
        <GettingStartedGoogleMap
          containerElement={<div className='fullHeight' />}
          mapElement={<div className='fullHeight' />}
          markers={this.state.markers}
          center={this.props.center}
        />
      </div>
    )
  }
}

SimpleMap.propTypes = {
  center: React.PropTypes.object
}
