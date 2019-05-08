import React, { Component } from 'react'
import './Signup.scss'
import { Row, Col, Alert } from 'react-bootstrap'
import SignupForm from '../../forms/SignupForm'
import GoogleFacebookLogin from '../googlefacebooklogin/GoogleFacebookLogin'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.createNewUserAndLogin = this.createNewUserAndLogin.bind(this)
    this.goToLoginScreen = this.goToLoginScreen.bind(this)
    this.getErrorMessage = this.getErrorMessage.bind(this)
  }

  goToLoginScreen () {
    this.props.goToLoginScreen()
  }

  createNewUserAndLogin (values) {
    this.props.createNewUser(values)
  }

  getErrorMessage () {
    if (this.props.hasErrored && this.props.error === 'user_already_exists_with_email') {
      return (
        <Alert bsStyle='danger'>
        User already exists with same email. Please reset your password!
      </Alert>
      )
    }
  }
  render () {
    return (
      <div className='top-70 container-wrapper signup-page'>
        <div className='page-title text-center'>Signup</div>
        <hr className='top-30' />
        <div className='top-30'>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <GoogleFacebookLogin loginWithFacebook={this.props.loginWithFacebook}
                loginWithGoogle={this.props.loginWithGoogle} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Col xs={0} sm={2} md={2} lg={2} />
              <Col xs={12} sm={8} md={8} lg={8}>
                <div>
                  {this.getErrorMessage()}
                  <SignupForm onSubmit={this.createNewUserAndLogin} inProcess={this.props.inProcess} />
                  <hr />
                  <Row>
                    <a className='forgot-password-link' onClick={this.props.goToForgotPasswordScreen}>Forgot Password?</a>
                    <button className='btn btn-danger btn-lg login-button' onClick={this.goToLoginScreen}>Login
                    </button>
                  </Row>
                </div>
              </Col>
              <Col xs={0} sm={2} md={2} lg={2} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  loginWithFacebook: React.PropTypes.func,
  goToLoginScreen: React.PropTypes.func,
  goToForgotPasswordScreen: React.PropTypes.func,
  loginWithGoogle: React.PropTypes.func,
  inProcess: React.PropTypes.bool,
  hasErrored: React.PropTypes.bool,
  error: React.PropTypes.string,
  createNewUser: React.PropTypes.func
}

export default Signup
