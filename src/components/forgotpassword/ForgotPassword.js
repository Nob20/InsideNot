import React, { Component } from 'react'
import './ForgotPassword.scss'
import { Col, Alert } from 'react-bootstrap'
import ForgotPasswordForm from '../../forms/ForgotPasswordForm'

class ForgotPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.sendPasswordResetEmailToUser = this.sendPasswordResetEmailToUser.bind(this)
    this.getErrorContent = this.getErrorContent.bind(this)
    this.getForgotPasswordForm = this.getForgotPasswordForm.bind(this)
  }

  sendPasswordResetEmailToUser (values) {
    this.props.sendPasswordResetEmail(values)
  }

  getErrorContent () {
    if (this.props.hasErrored && this.props.error === 'email_not_found') {
      return (
        <Alert bsStyle='danger'>
          No user found with given email address.
        </Alert>
      )
    } else if (this.props.hasErrored && this.props.error === 'link_not_valid') {
      return (
        <Alert bsStyle='danger'>
          The link used to reset password was not valid.
          Please enter your email address and we will send you a new email to reset your password.
        </Alert>
      )
    } else if (this.props.hasErrored && this.props.error === 'error_sending_email') {
      return (
        <Alert bsStyle='danger'>
          There was an error while sending email. Please try again.
        </Alert>
      )
    }
  }

  getForgotPasswordForm () {
    if (this.props.resetPasswordSuccess) {
      return (
        <div className='text-center'>
          <Alert bsStyle='success'>
            We have sent you a mail! Please follow the instructions to reset your password.
          </Alert>
        </div>
      )
    } else {
      return (<div>
        <ForgotPasswordForm onSubmit={this.sendPasswordResetEmailToUser} inProcess={this.props.inProcess} />
      </div>)
    }
  }

  render () {
    return (
      <div className='container'>
        <Col xs={0} sm={0} md={3} lg={3} />
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='top-50 forgot-password-wrapper'>
            <div className='page-title text-center'>Forgot Password</div>
            {this.props.resetPasswordSuccess ? null : (<p className='text-center top-20'>Please enter your email with which you have registered.</p>)}
            <hr className='top-30' />
            {this.getErrorContent()}
            {this.getForgotPasswordForm()}
          </div>
        </Col>
        <Col xs={0} sm={0} md={3} lg={3} />
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  sendPasswordResetEmail: React.PropTypes.func,
  hasErrored: React.PropTypes.bool,
  inProcess: React.PropTypes.bool,
  resetPasswordSuccess: React.PropTypes.bool,
  error: React.PropTypes.string
}

export default ForgotPassword
