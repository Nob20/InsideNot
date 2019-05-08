import { connectWithStore } from '../utils/ReduxUtils'
import { createNewUser, goToLoginScreen } from '../actions/signup'
import { loginWithFacebook, loginWithGoogle } from '../actions/login'
import { goToForgotPasswordScreen } from '../actions/forgotPassword'
/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import Signup from '../components/signup/Signup'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  return {
    createNewUser: (user) => dispatch(createNewUser(user)),
    loginWithFacebook: (accessToken) => dispatch(loginWithFacebook(accessToken)),
    goToLoginScreen: () => dispatch(goToLoginScreen()),
    goToForgotPasswordScreen: () => dispatch(goToForgotPasswordScreen()),
    loginWithGoogle: (accessToken) => dispatch(loginWithGoogle(accessToken))
  }
}

const mapStateToProps = (state) => {
  return {
    newUser: state.signup.user,
    hasErrored: state.signup.hasErrored,
    error: state.signup.error,
    inProcess: state.signup.inProcess,
    storeState: state
  }
}
/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connectWithStore(Signup, mapStateToProps, mapDispatchToProps)
