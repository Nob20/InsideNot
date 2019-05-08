import React, { Component } from 'react'

class EventAddress extends Component {
  render () {
    const location = this.props.event.location
    if (location && location.address) {
      const address = location.address
      return (
        <div>
          <div className='event-address'>
            <div>{address.street_number} {address.route}</div>
            <div>{address.locality + ', ' + address.administrative_area_level_1} {address.postal_code} </div>
            <div>{address.country} </div>
          </div>
          {location.directions ? <div>{location.directions}</div> : ''}
        </div>
      )
    }
    return null
  }

}

EventAddress.propTypes = {
  event: React.PropTypes.object
}

export default EventAddress
