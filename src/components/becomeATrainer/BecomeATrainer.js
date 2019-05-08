import React, { Component } from 'react'
import './BecomeATrainer.scss'
import { Col } from 'react-bootstrap'
import BecomeATrainerForm from '../../forms/BecomeATrainerForm'
import { TERMS } from '../../utils/Terms'

class BecomeATrainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.becomeATrainer = this.becomeATrainer.bind(this)
  }

  becomeATrainer (values) {
    this.props.becomeATrainer(values)
  }

  render () {
    const initialValues = { termsAndConditions: TERMS }
    return (
      <div className='container'>
        <Col xs={0} sm={0} md={2} lg={2} />
        <Col xs={12} sm={12} md={8} lg={8}>
          <div className='top-50 sso-signup-wrapper'>
            <div className='page-title text-center'>Become a Trainer</div>
            <hr className='top-30' />
            <div>
              <BecomeATrainerForm initialValues={initialValues} onSubmit={this.becomeATrainer} />
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} />
      </div>
    )
  }
}

BecomeATrainer.propTypes = {
  becomeATrainer: React.PropTypes.func
}

export default BecomeATrainer
