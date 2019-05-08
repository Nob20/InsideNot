import React, { Component } from 'react'
import './GoogleFacebookLogin.scss'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { Col } from 'react-bootstrap'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../../utils/Constants'

class GoogleFacebookLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.responseFromFacebook = this.responseFromFacebook.bind(this)
    this.responseFromGoogle = this.responseFromGoogle.bind(this)
    this.facebookPermissions = `public_profile,email,user_friends,publish_actions`
  }

  responseFromFacebook (response) {
    if (response && response.accessToken) {
      console.log('Facebook user logged in : ', response.accessToken)
      this.props.loginWithFacebook(response.accessToken)
    }
    console.log(arguments)
  }

  responseFromGoogle (response) {
    if (response && response.tokenId) {
      console.log('Google User logged in ', response.tokenId)
      this.props.loginWithGoogle(response.tokenId)
    }
  }

  render () {
    return (
      <div>
        <Col xs={0} sm={2} md={2} lg={2} />
        <Col xs={12} sm={8} md={8} lg={8}>
          <div>
            <div className='top-30'>
              <GoogleLogin clientId={GOOGLE_CLIENT_ID}
                buttonText='Google'
                onSuccess={this.responseFromGoogle}
                onFailure={this.responseFromGoogle} className='btn btn-lg btn-block login-button-google'
              />
            </div>
            <div className='top-30'>
              <FacebookLogin appId={FACEBOOK_APP_ID} fields={this.facebookPermissions}
                cssClass='btn btn-lg btn-block login-button-facebook' callback={this.responseFromFacebook} textButton='Facebook'
              />
            </div>
          </div>
          <hr className='visible-xs visible-sm top-30' />
        </Col>
        <Col xs={0} sm={2} md={2} lg={2}>
          <div className='visible-md visible-lg vertical-hr' />
        </Col>
      </div>
    )
  }

}

GoogleFacebookLogin.propTypes = {
  loginWithFacebook: React.PropTypes.func,
  loginWithGoogle: React.PropTypes.func
}

export default GoogleFacebookLogin
