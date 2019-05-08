import React, { Component } from 'react'
import './AddressStep.scss'
import Autocomplete from 'react-google-autocomplete'
import _ from 'lodash'

class AddressStep extends Component {

  constructor (props) {
    super(props)
    this.gotToStep4 = this.gotToStep4.bind(this)
    this.getAddressDetails = this.getAddressDetails.bind(this)
    this.state = {
      location: props.location
    }
  }

  gotToStep4 () {
    const { location } = this.state
    this.props.updateEvent({ location })
    this.props.handleNext()
  }

  getAddressDetails () {
    const { location } = this.state
    const address = location && location.address
    if (address && address.googled) {
      return (<div className='event-address'>
        <div>{address.street_number} {address.route}</div>
        <div>{address.locality + ', ' + address.administrative_area_level_1} {address.postal_code} </div>
        <div>{address.country} </div>
      </div>)
    }
  }

  render () {
    let { location } = this.state
    let address = this.state.location && this.state.location.address
    const directions = this.state.location && this.state.location.directions
    let enableNext = address && address.googled === true
    return (<div className='form-horizontal address-form'>
      <div className='form-group'>
        <div className='custom-form-input-wrapper'>
          <div className='row'>
            <div className='form-group'>
              <label className='control-label col-md-3 col-lg-3'>Address</label>
              <div className='col-md-9 col-lg-9'>
                <Autocomplete
                  className='form-control address-control'
                  onPlaceSelected={(results) => {
                    var addressComponents = (results && results.address_components) || []
                    let components = {}
                    _.each(addressComponents, function (k, v1) {
                      _.each(addressComponents[v1].types, function (k2, v2) {
                        components[addressComponents[v1].types[v2]] = addressComponents[v1].long_name
                      })
                    })

                    location.address = components
                    location.address.googled = true
                    location.latitude = results.geometry.location.lat()
                    location.longitude = results.geometry.location.lng()
                    this.setState({ location })
                  }}
                  types={['address']}
                  componentRestrictions={{ country: ['us', 'ca', 'au', 'sg'] }}
                  placeholder='Add a new location'
                />
                {this.getAddressDetails()}
              </div>
            </div>
            <div className='form-group'>
              <div className='custom-form-input-wrapper'>
                <div className='row'>
                  <div className='form-group'>
                    <label htmlFor='terms' className='control-label col-md-3 col-lg-3'>Directions</label>
                    <div className='col-md-9 col-lg-9'>
                      <textarea className='form-control' name='terms' rows='3' value={directions}
                        onChange={(event) => {
                          location.directions = event.target.value
                          this.setState({ location })
                        }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <button className='btn btn-danger btn-lg next-button' type='submit' onClick={this.gotToStep4}
          disabled={!enableNext}>Next
        </button>
        <button className='btn btn-danger btn-lg prev-button' onClick={this.props.handlePrev}>Previous</button>
      </div>
    </div>)
  }
}

AddressStep.propTypes = {
  location: React.PropTypes.object,
  handleNext: React.PropTypes.func,
  updateEvent: React.PropTypes.func,
  handlePrev: React.PropTypes.func
}

export default AddressStep
