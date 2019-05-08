import { connect } from 'react-redux'
import { goToSignupScreen, loginUser, loginWithFacebook, loginWithGoogle } from './../actions/login'
import { goToForgotPasswordScreen } from '../actions/forgotPassword'

import Login from '../components/login/Login'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignupScreen: () => dispatch(goToSignupScreen()),
    loginUser:  (credentials) => dispatch(loginUser(credentials)),
    loginWithFacebook: (accessToken) => dispatch(loginWithFacebook(accessToken)),
    loginWithGoogle: (accessToken) => dispatch(loginWithGoogle(accessToken)),
    goToForgotPasswordScreen: () => dispatch(goToForgotPasswordScreen())
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.login.loggedInUser,
    loginUserPasswordError: state.login.loginUserPasswordError,
    storeState: state
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Login)
