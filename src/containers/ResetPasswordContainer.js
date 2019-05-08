import { connect } from 'react-redux'
import { validateResetPasswordLink, resetPassword } from './../actions/resetPassword'
import { goToForgotPasswordScreen } from './../actions/forgotPassword'

import ResetPassword from '../components/resetpassword/ResetPassword'

const mapDispatchToProps = (dispatch) => {
  return {
    validateResetPasswordLink: (validateLinkCommand) => dispatch(validateResetPasswordLink(validateLinkCommand)),
    resetPassword: (resetPasswordCommand) => dispatch(resetPassword(resetPasswordCommand)),
    goToForgotPasswordScreen: () => dispatch(goToForgotPasswordScreen())
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.resetPassword.loggedInUser,
    inProcess: state.resetPassword.inProcess,
    hasErrored: state.resetPassword.hasErrored,
    error: state.resetPassword.error,
    storeState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
