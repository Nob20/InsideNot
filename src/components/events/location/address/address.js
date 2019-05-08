import React, { Component } from 'react'

class Address extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const address = this.props.address
    return (
      <div className=''>
        <div className=''>{address.address1}</div>
        <div className=''>{address.address2}</div>
        <div className=''>{address.unitNo}</div>
        <div className=''>{address.city}</div>
        <div className=''>{address.postalCode}</div>
        <div className=''>{address.country}</div>
      </div>
    )
  }
}

Address.propTypes = {
  address: React.PropTypes.object
}

export default Address
