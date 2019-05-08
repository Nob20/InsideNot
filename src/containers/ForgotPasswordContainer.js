import { connect } from 'react-redux'
import { goToSignupScreen } from './../actions/login'
import { sendPasswordResetEmail } from './../actions/forgotPassword'
import ForgotPassword from '../components/forgotpassword/ForgotPassword'

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignupScreen: () => dispatch(goToSignupScreen()),
    sendPasswordResetEmail:  (passwordResetComand) => dispatch(sendPasswordResetEmail(passwordResetComand))
  }
}

const mapStateToProps = (state) => {
  return {
    inProcess: state.forgotPassword.inProcess,
    hasErrored: state.forgotPassword.hasErrored,
    error: state.forgotPassword.error,
    resetPasswordSuccess: state.forgotPassword.resetPasswordSuccess,
    storeState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
