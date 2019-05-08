import React, { Component } from 'react'
import './Login.scss'
import { Row, Col, Alert } from 'react-bootstrap'
import LoginForm from '../../forms/LoginForm'
import GoogleFacebookLogin from '../googlefacebooklogin/GoogleFacebookLogin'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.goToSignupScreen = this.goToSignupScreen.bind(this)
    this.doLogin = this.doLogin.bind(this)
  }

  goToSignupScreen () {
    this.props.goToSignupScreen()
  }

  doLogin (values) {
    values.rememberMe = true
    this.props.loginUser(values)
  }

  getUserNamePasswordError () {
    return (
      <Alert bsStyle='danger'>
        Username and Password don't match
      </Alert>
    )
  }

  render () {
    return (
      <div className='top-70 container-wrapper login-page'>
        <div className='page-title text-center'>Login</div>
        <hr className='top-30' />
        <div className='top-50'>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <GoogleFacebookLogin loginWithFacebook={this.props.loginWithFacebook}
                loginWithGoogle={this.props.loginWithGoogle} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Col xs={0} sm={2} md={2} lg={2} />
              <Col xs={12} sm={8} md={8} lg={8}>
                <div>
                  {this.props.loginUserPasswordError ? this.getUserNamePasswordError() : null}
                  <LoginForm onSubmit={this.doLogin} />
                  <hr />
                  <Row>
                    <a className='forgot-password-link' onClick={this.props.goToForgotPasswordScreen}>Forgot Password?</a>
                    <button className='btn btn-danger btn-lg signup-button' onClick={this.goToSignupScreen}>Signup</button>
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

Login.propTypes = {
  loginUserPasswordError: React.PropTypes.bool,
  loginUser: React.PropTypes.func,
  goToSignupScreen: React.PropTypes.func,
  goToForgotPasswordScreen: React.PropTypes.func,
  loginWithFacebook: React.PropTypes.func,
  loginWithGoogle: React.PropTypes.func
}

export default Login
