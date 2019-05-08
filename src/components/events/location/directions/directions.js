import React, { Component } from 'react'

class Directions extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const directions = this.props.directions
    return (
      <div className=''>
        <div className=''>{directions}</div>
      </div>
    )
  }
}

Directions.propTypes = {
  directions: React.PropTypes.string
}

export default Directions
