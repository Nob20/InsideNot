import React, { Component } from 'react'
import './ResetPassword.scss'
import { Col } from 'react-bootstrap'
import ResetPasswordForm from '../../forms/ResetPasswordForm'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.resetUserPassword = this.resetUserPassword.bind(this)
    this.validateAllMandatoryQueryParams = this.validateAllMandatoryQueryParams.bind(this)
  }

  componentDidMount () {
    this.validateAllMandatoryQueryParams()
    let query = this.props.location.query
    this.props.validateResetPasswordLink(query)
  }

  resetUserPassword (values) {
    this.validateAllMandatoryQueryParams()
    const queryParams = this.props.location.query
    let resetPasswordCommand = values
    resetPasswordCommand.email = queryParams.email
    resetPasswordCommand.token = queryParams.token
    resetPasswordCommand.vailTill = queryParams.vailTill
    this.props.resetPassword(resetPasswordCommand)
  }

  validateAllMandatoryQueryParams () {
    const queryParams = this.props.location.query
    if (queryParams.email && queryParams.token && queryParams.vailTill) {
      return
    } else {
      this.props.goToForgotPasswordScreen()
    }
  }

  render () {
    return (
      <div className='container'>
        <Col xs={0} sm={0} md={3} lg={3} />
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='top-50 reset-password-wrapper'>
            <div className='page-title text-center'>Reset Password</div>
            <hr className='top-30' />
            <div>
              <ResetPasswordForm onSubmit={this.resetUserPassword} />
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} />
      </div>
    )
  }
}

ResetPassword.propTypes = {
  validateResetPasswordLink: React.PropTypes.func,
  resetPassword: React.PropTypes.func,
  goToForgotPasswordScreen: React.PropTypes.func,
  location: React.PropTypes.object
}

export default ResetPassword
