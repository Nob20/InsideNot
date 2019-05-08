import { connectWithStore } from '../utils/ReduxUtils'
import { completeSignupOfSSOUser } from '../actions/signup'
import { useAnotherEmail } from '../actions/ssoSignup'
import Signup from '../components/ssosignup/SSOSignup'

const mapDispatchToProps = (dispatch) => {
  return {
    completeSignupOfSSOUser: (user) => completeSignupOfSSOUser(user, dispatch),
    useAnotherEmail: () => useAnotherEmail(dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    ssoUser: state.ssoSignup && state.ssoSignup.ssoUser,
    storeState: state
  }
}

export default connectWithStore(Signup, mapStateToProps, mapDispatchToProps)
