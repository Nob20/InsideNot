import React, { Component } from 'react'
import './SSOSignup.scss'
import { Col } from 'react-bootstrap'
import SSOSignupForm from '../../forms/SSOSignupForm'

class SSOSignup extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.completeSignupOfSSOUser = this.completeSignupOfSSOUser.bind(this)
  }

  completeSignupOfSSOUser (values) {
    this.props.completeSignupOfSSOUser(values)
  }

  render () {
    return (
      <div className='container'>
        <Col xs={0} sm={0} md={3} lg={3} />
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='top-50 sso-signup-wrapper'>
            <div className='page-title text-center'>Complete Signup</div>
            <hr className='top-30' />

            <div className='top-10'>
              <SSOSignupForm initialValues={this.props.ssoUser}
                onSubmit={this.completeSignupOfSSOUser} useAnotherEmail={this.props.useAnotherEmail} />
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} />
      </div>
    )
  }
}

SSOSignup.propTypes = {
  completeSignupOfSSOUser: React.PropTypes.func,
  useAnotherEmail: React.PropTypes.func,
  ssoUser: React.PropTypes.object
}

export default SSOSignup
